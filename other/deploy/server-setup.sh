#!/bin/bash
# GoView 大屏 - 服务器一键部署（在 OrcaTerm 终端执行）
# 用法: cd ~/big-screen-deploy && bash server-setup.sh

set -e

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
MYSQL_PWD="${MYSQL_PWD:-root}"
WAR_NAME="goview_admin-0.0.1-SNAPSHOT.war"

# ubuntu 用户默认无 docker 权限，统一用 sudo
docker_cmd() { sudo docker "$@"; }

echo "========== 1. 复制文件 =========="
cp -f "$DEPLOY_DIR/$WAR_NAME" /opt/big-screen-service/
rm -rf /var/www/big-screen/dist/*
cp -rf "$DEPLOY_DIR/dist/"* /var/www/big-screen/dist/
sudo chown -R ubuntu:ubuntu /var/www/big-screen /opt/big-screen-service

echo "========== 2. MySQL 建库 =========="
MYSQL_CONTAINER=$(docker_cmd ps --format '{{.Names}}' 2>/dev/null | grep -iE 'mysql|mariadb' | head -1)
if [ -z "$MYSQL_CONTAINER" ]; then
  echo "[警告] 未找到 MySQL 容器，请手动导入 init-mysql.sql"
else
  echo "使用容器: $MYSQL_CONTAINER"
  if docker_cmd exec -i "$MYSQL_CONTAINER" mysql -uroot -p"$MYSQL_PWD" < "$DEPLOY_DIR/init-mysql.sql"; then
    echo "数据库初始化成功"
  else
    echo "[警告] 数据库导入失败，请检查密码: export MYSQL_PWD=你的密码 && bash server-setup.sh"
  fi
fi

echo "========== 3. 启动后端 Java =========="
cd /opt/big-screen-service
pkill -f 'goview_admin' 2>/dev/null || true
sleep 2
# JDK 17+ 需开放模块，否则 MyBatis-Plus Lambda 查询报 500
JAVA_OPTS="--add-opens java.base/java.lang.invoke=ALL-UNNAMED"
EXTRA_CONFIG=""
if [ -f /opt/big-screen-service/application-override.yml ]; then
  EXTRA_CONFIG="--spring.config.additional-location=file:/opt/big-screen-service/application-override.yml"
fi
nohup java $JAVA_OPTS -jar "$WAR_NAME" --spring.profiles.active=prod $EXTRA_CONFIG > app.log 2>&1 &
echo "等待后端启动（最多 60 秒）..."
STARTED=0
for i in $(seq 1 30); do
  if ss -tlnp 2>/dev/null | grep -q ':8083' || sudo ss -tlnp | grep -q ':8083'; then
    echo "后端已监听 8083"
    STARTED=1
    break
  fi
  sleep 2
done
if [ "$STARTED" -eq 0 ]; then
  echo "[警告] 8083 未启动，请查看日志:"
fi
tail -30 app.log

echo "========== 4. 配置 Nginx =========="
sudo cp -f "$DEPLOY_DIR/nginx-big-screen.conf" /etc/nginx/sites-available/big-screen
sudo ln -sf /etc/nginx/sites-available/big-screen /etc/nginx/sites-enabled/big-screen
sudo nginx -t
sudo systemctl reload nginx

echo "========== 5. 检查 =========="
sudo ss -tlnp | grep -E '8090|8083' || true

echo ""
echo "============================================"
echo " 部署完成！请访问: http://82.156.253.71:8090"
echo " 账号: admin  密码: 123456"
echo " 若 MySQL 密码不是 root:"
echo "   export MYSQL_PWD=你的密码 && bash server-setup.sh"
echo "============================================"

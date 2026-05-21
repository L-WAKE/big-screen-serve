#!/bin/bash
# GoView 大屏 - 服务器一键部署（在 OrcaTerm 终端执行）
# 用法: cd ~/big-screen-deploy && bash server-setup.sh

set -e

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
MYSQL_PWD="${MYSQL_PWD:-root}"

echo "========== 1. 复制文件 =========="
cp -f "$DEPLOY_DIR/goview_admin-0.0.1-SNAPSHOT.war" /opt/big-screen-service/
rm -rf /var/www/big-screen/dist/*
cp -rf "$DEPLOY_DIR/dist/"* /var/www/big-screen/dist/
sudo chown -R ubuntu:ubuntu /var/www/big-screen /opt/big-screen-service

echo "========== 2. MySQL 建库 =========="
MYSQL_CONTAINER=$(docker ps --format '{{.Names}}' | grep -iE 'mysql|mariadb' | head -1)
if [ -z "$MYSQL_CONTAINER" ]; then
  echo "[警告] 未找到 MySQL 容器，请手动导入 init-mysql.sql"
else
  echo "使用容器: $MYSQL_CONTAINER"
  docker exec -i "$MYSQL_CONTAINER" mysql -uroot -p"$MYSQL_PWD" < "$DEPLOY_DIR/init-mysql.sql" \
    && echo "数据库初始化成功" \
    || echo "[警告] 数据库导入失败，请检查 MYSQL_PWD（当前默认 root）: export MYSQL_PWD=你的密码 && bash server-setup.sh"
fi

echo "========== 3. 启动后端 Java =========="
cd /opt/big-screen-service
# 停掉旧进程
pkill -f 'goview_admin-0.0.1-SNAPSHOT.war' 2>/dev/null || true
sleep 2
nohup java -jar goview_admin-0.0.1-SNAPSHOT.war --spring.profiles.active=prod > app.log 2>&1 &
echo "等待后端启动..."
for i in $(seq 1 30); do
  if curl -sf http://127.0.0.1:8083/ >/dev/null 2>&1 || ss -tlnp | grep -q ':8083'; then
    echo "后端已监听 8083"
    break
  fi
  sleep 2
done
tail -20 app.log

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
echo " 若 MySQL 密码不是 root，请执行:"
echo "   export MYSQL_PWD=你的密码 && bash server-setup.sh"
echo "============================================"

#!/bin/bash
# 在服务器 ~/big-screen-deploy 目录执行: bash fix-now.sh
set -e
cd "$(dirname "$0")"

echo "========== 1. 查 MySQL 真实密码 =========="
MYSQL_CONTAINER=$(sudo docker ps --format '{{.Names}}' | grep -iE 'mysql|mariadb' | head -1)
echo "容器: $MYSQL_CONTAINER"

MYSQL_PWD=$(sudo docker inspect "$MYSQL_CONTAINER" --format '{{range .Config.Env}}{{println .}}{{end}}' \
  | grep -E '^MYSQL_ROOT_PASSWORD=' | cut -d= -f2-)

if [ -z "$MYSQL_PWD" ]; then
  MYSQL_PWD=$(sudo docker inspect "$MYSQL_CONTAINER" --format '{{range .Config.Env}}{{println .}}{{end}}' \
    | grep -E '^MYSQL_PASSWORD=' | head -1 | cut -d= -f2-)
fi

if [ -z "$MYSQL_PWD" ]; then
  echo "未能自动读取密码，请手动: export MYSQL_PWD=你的密码"
  exit 1
fi
echo "已读取 MySQL 密码（长度 ${#MYSQL_PWD}）"

echo "========== 2. 建库 =========="
sudo docker exec -i "$MYSQL_CONTAINER" mysql -uroot -p"$MYSQL_PWD" < init-mysql.sql
echo "建库成功"

echo "========== 3. 写后端数据库配置 =========="
cat > /opt/big-screen-service/application-override.yml <<EOF
spring:
  datasource:
    password: ${MYSQL_PWD}
EOF

echo "========== 4. 启动 Java =========="
cd /opt/big-screen-service
pkill -f goview_admin || true
sleep 2
# JDK 17+ 需开放模块，否则 MyBatis-Plus Lambda 查询报 500
nohup java --add-opens java.base/java.lang.invoke=ALL-UNNAMED \
  -jar goview_admin-0.0.1-SNAPSHOT.war \
  --spring.profiles.active=prod \
  --spring.config.additional-location=file:/opt/big-screen-service/application-override.yml \
  > app.log 2>&1 &

echo "等待启动..."
for i in $(seq 1 30); do
  if sudo ss -tlnp | grep -q ':8083'; then
    echo "后端 8083 已启动"
    break
  fi
  sleep 2
done
tail -15 app.log

echo "========== 5. 修复 Nginx（去掉未配置的 ssl）=========="
sudo cp -f nginx-big-screen.conf /etc/nginx/sites-available/big-screen
sudo ln -sf /etc/nginx/sites-available/big-screen /etc/nginx/sites-enabled/big-screen
sudo nginx -t
sudo systemctl reload nginx

echo "========== 6. 检查 =========="
sudo ss -tlnp | grep -E '8090|8083'

echo ""
echo "完成！访问 http://82.156.253.71:8090"
echo "账号 admin / 密码 123456"

#!/bin/bash
# 服务器启动 GoView 后端（/opt/big-screen-service）
set -e
cd /opt/big-screen-service

WAR_NAME="goview_admin-0.0.1-SNAPSHOT.war"
EXTRA_CONFIG=""
if [ -f application-override.yml ]; then
  EXTRA_CONFIG="--spring.config.additional-location=file:/opt/big-screen-service/application-override.yml"
fi

pkill -f goview_admin || true
sleep 2

# JDK 17+ 必须加此参数，MyBatis-Plus 3.4.x 才能正常查库
nohup java --add-opens java.base/java.lang.invoke=ALL-UNNAMED \
  -jar "$WAR_NAME" \
  --spring.profiles.active=prod \
  $EXTRA_CONFIG \
  > app.log 2>&1 &

echo "等待启动..."
for i in $(seq 1 20); do
  if ss -tlnp 2>/dev/null | grep -q ':8083' || sudo ss -tlnp 2>/dev/null | grep -q ':8083'; then
    echo "后端 8083 已启动"
    curl -s -X POST 'http://127.0.0.1:8083/api/goview/sys/login' \
      -H 'Content-Type: application/json' \
      -d '{"username":"admin","password":"123456"}' | head -c 200
    echo ""
    exit 0
  fi
  sleep 2
done

echo "启动失败，查看日志:"
tail -30 app.log

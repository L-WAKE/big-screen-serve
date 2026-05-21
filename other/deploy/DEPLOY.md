# GoView 大屏 - 腾讯云部署指南

与现有项目对齐：

| 项目 | 域名 | IP 端口 |
|------|------|---------|
| 房源管理系统 | https://liulaoban.online | http://82.156.253.71:8088 |
| AI 知识库 | https://kb.liulaoban.online | http://82.156.253.71:8089 |
| **GoView 大屏** | https://screen.liulaoban.online | http://82.156.253.71:8090 |

后端 API 端口：`8083`（本机 Java，由 Nginx 反代 `/api`）

---

## 第一步：服务器创建目录

你服务器现有习惯（从目录结构看出）：
- **前端静态文件** → `/var/www/`（已有 `house-admin`、`kb-web`）
- **后端服务** → `/opt/`（已有 `house-service`、`kb-service`）

大屏项目按同样方式放：

| 用途 | 路径 |
|------|------|
| 前端 dist | `/var/www/big-screen/dist` |
| 后端 jar + 上传 | `/opt/big-screen-service/` |

在 OrcaTerm **右侧终端** 复制执行：

```bash
# 建目录
sudo mkdir -p /var/www/big-screen/dist
sudo mkdir -p /opt/big-screen-service/upload

# 把权限给 ubuntu 用户（方便上传文件）
sudo chown -R ubuntu:ubuntu /var/www/big-screen /opt/big-screen-service

# 确认创建成功
ls -la /var/www/
ls -la /opt/ | grep big-screen
```

左侧文件管理器：地址栏输入 `/var/www` 回车，应能看到新建的 `big-screen` 文件夹。

---

## 第二步：MySQL 建库

服务器已有 Docker MySQL（3306），执行：

```bash
# 进入 MySQL（按你实际密码修改）
docker ps | grep mysql
docker exec -it <mysql容器名> mysql -uroot -p

# 在 MySQL 里执行 init-mysql.sql 内容，或：
CREATE DATABASE IF NOT EXISTS goview DEFAULT CHARACTER SET utf8mb4;
# 然后导入 go-view-serve/doc/init-mysql.sql
```

也可把 `init-mysql.sql` 拷到服务器后：

```bash
docker exec -i <mysql容器名> mysql -uroot -p你的密码 < init-mysql.sql
```

默认账号：`admin` / `123456`（密码 MD5 存储）

---

## 第三步：本地打包后端

在 Mac 本地 `go-view-serve` 目录：

1. 复制 `deploy/application-prod.yml` 为 `src/main/resources/application-prod.yml`
2. 修改其中的 **MySQL 密码**
3. 修改 `application.yml` 中 `spring.profiles.active: prod`

```bash
cd go-view-serve
mvn clean package -DskipTests
# 产物: target/goview_admin-0.0.1-SNAPSHOT.war
```

上传到服务器：

```bash
scp target/goview_admin-0.0.1-SNAPSHOT.war ubuntu@82.156.253.71:/opt/big-screen-service/
```

---

## 第四步：服务器启动后端

```bash
cd /opt/big-screen-service
# 需已安装 Java 8+
java -version

nohup java -jar goview_admin-0.0.1-SNAPSHOT.war \
  --spring.profiles.active=prod \
  > app.log 2>&1 &

# 检查
sleep 5
curl http://127.0.0.1:8083/api/goview/sys/login
tail -f app.log
```

可选：用 systemd 守护进程（见文末）。

---

## 第五步：本地打包前端

```bash
cd go-view
pnpm install   # 或 npm install
pnpm build     # 生成 dist/
```

`.env.production` 已配置 API 为 `https://screen.liulaoban.online`。

上传 dist：

```bash
scp -r dist/* ubuntu@82.156.253.71:/var/www/big-screen/dist/
```

---

## 第六步：配置 Nginx

```bash
# 上传配置
scp deploy/nginx-big-screen.conf ubuntu@82.156.253.71:/tmp/

# 服务器上
sudo cp /tmp/nginx-big-screen.conf /etc/nginx/sites-available/big-screen
sudo ln -sf /etc/nginx/sites-available/big-screen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

腾讯云安全组放行：**8090**（与 8088、8089 一样）。

浏览器访问：http://82.156.253.71:8090

---

## 第七步：域名 + HTTPS

1. 域名控制台添加解析：`screen` → `A` → `82.156.253.71`
2. 等待生效后申请证书：

```bash
sudo certbot --nginx -d screen.liulaoban.online
```

3. 访问：https://screen.liulaoban.online

---

## 防火墙与安全组检查

```bash
sudo ufw status
sudo ss -tlnp | grep -E '8090|8083'
```

---

## systemd 示例（可选）

`/etc/systemd/system/goview-bigscreen.service`：

```ini
[Unit]
Description=GoView Big Screen Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/opt/big-screen-service
ExecStart=/usr/bin/java -jar /opt/big-screen-service/goview_admin-0.0.1-SNAPSHOT.war --spring.profiles.active=prod
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable goview-bigscreen
sudo systemctl start goview-bigscreen
```

# 横向柱状图：SQL 动态请求配置说明

本文档说明如何为 **横向柱状图（BarCrossrange）** 配置 **POST + SQL 请求**，从 MySQL 数据库读取数据并渲染图表。

---

## 前置条件

### 1. 启动项目

```bash
./scripts/dev-start.sh
```

| 服务 | 地址 |
|------|------|
| 前端 | http://localhost:3020 |
| 后端 | http://localhost:8083 |
| 登录账号 | admin / 123456 |

### 2. 初始化演示数据表

首次使用需导入 SQL 演示表（若已导入可跳过）：

```bash
mysql -uroot -proot < go-view-serve/doc/chart-bar-crossrange.sql
```

或执行完整初始化：

```bash
mysql -uroot -proot < go-view-serve/doc/init-mysql.sql
```

### 3. 横向柱状图数据映射字段

| 映射项 | 字段名 | 说明 |
|--------|--------|------|
| 通用标识（Y 轴类目） | `product` | 区域名称，如华东、华南 |
| 数据项-1 | `data1` | 第一组柱形数据 |
| 数据项-2 | `data2` | 第二组柱形数据 |

---

## 一、接口信息

| 配置项 | 值 |
|--------|-----|
| 完整地址 | `http://localhost:8083/api/chart/sql` |
| 请求方式 | `POST` |
| 请求类型 | `SQL 请求` |
| 请求体 | `{ "sql": "SELECT ..." }` |
| 鉴权 Header | `token: goview-bar-demo-token` |
| 后端 Controller | `ChartDataApiController#executeSql` |
| 演示数据表 | `t_chart_bar_crossrange` |

**接口返回示例：**

```json
{
  "code": 0,
  "msg": "操作成功",
  "data": {
    "source": [
      { "product": "华东", "data1": 320, "data2": 280 },
      { "product": "华南", "data1": 250, "data2": 210 },
      { "product": "华北", "data1": 180, "data2": 160 }
    ]
  }
}
```

**curl 测试：**

```bash
curl -X POST http://localhost:8083/api/chart/sql \
  -H "Content-Type: application/json" \
  -H "token: goview-bar-demo-token" \
  -d '{"sql":"SELECT product, data1, data2 FROM t_chart_bar_crossrange ORDER BY sort_order"}'
```

---

## 二、界面操作步骤

### 步骤 1：选中横向柱状图

1. 打开 GoView 编辑器（http://localhost:3020）
2. 在画布中点击 **横向柱状图** 组件
3. 右侧切换到 **「数据」** 面板

### 步骤 2：切换请求方式

| 配置项 | 值 |
|--------|-----|
| 请求方式 | **动态请求** |

### 步骤 3：编辑请求配置

1. 点击 **「编辑配置」**
2. 在弹窗中按下方参数填写

**全局公共配置：**

| 配置项 | 值 | 说明 |
|--------|-----|------|
| 前置 URL | `http://localhost:8083` | 全局服务地址 |
| 更新间隔 | `0` | 0 表示仅初始化时请求一次 |
| 更新间隔单位 | `秒` | 默认即可 |

> **Header 配置（重要）**  
> 展开全局公共配置下方箭头，在 **Header** 表格中添加：

| Key | Value |
|-----|-------|
| `token` | `goview-bar-demo-token` |

**组件请求配置：**

| 配置项 | 值 |
|--------|-----|
| 请求方式 | `POST` |
| URL 地址 | `/api/chart/sql` |
| 选择方式 | **SQL 请求** |

**SQL 键值（直接复制粘贴）：**

```sql
SELECT product, data1, data2 FROM t_chart_bar_crossrange ORDER BY sort_order
```

3. 点击 **「保存 & 发送请求」**

### 步骤 4：配置数据过滤器

在 **数据过滤** 区域点击 **「新增过滤器」**，填入：

```javascript
return {
  dimensions: ['product', 'data1', 'data2'],
  source: data?.source || []
}
```

| 说明 | 内容 |
|------|------|
| 过滤器入参 `data` | 接口返回的 `data` 字段（含 `source` 数组） |
| 过滤器入参 `res` | 接口完整响应 `{ code, msg, data }` |
| 转换目标 | ECharts dataset 格式 |

点击 **「保存」**。

### 步骤 5：验证

1. 点击 **「发送请求」**
2. 确认 **数据映射** 显示：

| 映射项 | 字段 | 状态 |
|--------|------|------|
| 通用标识 | `product` | 匹配成功 |
| 数据项-1 | `data1` | 匹配成功 |
| 数据项-2 | `data2` | 匹配成功 |

3. 横向柱状图应显示 **华东、华南、华北…** 共 7 条区域数据

---

## 三、配置参数汇总

| 分类 | 参数 | 值 |
|------|------|-----|
| 全局 | 前置 URL | `http://localhost:8083` |
| 全局 | 更新间隔 | `0` |
| 全局 | Header.token | `goview-bar-demo-token` |
| 组件 | 请求方式 | 动态请求 |
| 组件 | HTTP 方法 | `POST` |
| 组件 | URL | `/api/chart/sql` |
| 组件 | 请求类型 | SQL 请求 |
| 组件 | SQL | `SELECT product, data1, data2 FROM t_chart_bar_crossrange ORDER BY sort_order` |
| 过滤器 | dimensions | `['product', 'data1', 'data2']` |
| 过滤器 | source | `data.source` |

---

## 四、数据库表结构

**表名：** `t_chart_bar_crossrange`

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| product | VARCHAR(64) | 类目/区域 |
| data1 | INT | 数据项 1 |
| data2 | INT | 数据项 2 |
| sort_order | INT | 排序 |
| create_time | DATETIME | 创建时间 |

**演示数据：**

| product | data1 | data2 |
|---------|-------|-------|
| 华东 | 320 | 280 |
| 华南 | 250 | 210 |
| 华北 | 180 | 160 |
| 西南 | 140 | 120 |
| 西北 | 110 | 95 |
| 东北 | 85 | 70 |
| 华中 | 200 | 175 |

---

## 五、安全说明

后端 SQL 接口做了以下限制（演示环境）：

| 限制项 | 说明 |
|--------|------|
| 仅 SELECT | 不允许 INSERT / UPDATE / DELETE 等 |
| 表白名单 | 仅允许查询 `t_chart_bar_crossrange` |
| 禁止多语句 | SQL 中不能包含 `;` |
| 行数限制 | 最多返回 500 行 |
| Token 鉴权 | Header 需携带 `token: goview-bar-demo-token` |

---

## 六、常见问题

| 现象 | 原因 | 处理方式 |
|------|------|----------|
| 401 / token 无效 | 全局 Header 未配置 token | 展开全局配置，添加 `token: goview-bar-demo-token` |
| SQL 执行失败 / 表不存在 | 未导入演示表 | 执行 `mysql -uroot -proot < go-view-serve/doc/chart-bar-crossrange.sql` |
| 数据映射匹配失败 | 未配置过滤器 | 按文档配置过滤器，确保含 product/data1/data2 |
| SQL 类型不支持 GET | 请求方式选成了 GET | 改为 **POST** |
| 修改后端代码后不生效 | 后端未重启 | 执行 `./scripts/dev-start.sh` 重启后端 |
| 过滤器报错 undefined | 接口未返回数据 | 先用 curl 测试接口，再点「发送请求」 |

---

## 七、相关文件

| 文件 | 说明 |
|------|------|
| `go-view-serve/src/main/java/cn/com/v2/controller/ChartDataApiController.java` | SQL 接口 `/api/chart/sql` |
| `go-view-serve/src/main/java/cn/com/v2/service/ChartSqlExecuteService.java` | SQL 执行与安全校验 |
| `go-view-serve/doc/chart-bar-crossrange.sql` | 演示表及数据 |
| `go-view/src/packages/components/Charts/Bars/BarCrossrange/data.json` | 横向柱状图默认数据结构 |
| `go-view/src/api/http.ts` | 前端 SQL 请求发送逻辑 |

---

*文档更新时间：2026-05-21*

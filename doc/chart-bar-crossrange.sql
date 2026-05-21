-- 横向柱状图 SQL 动态请求演示表
USE goview;

CREATE TABLE IF NOT EXISTS t_chart_bar_crossrange (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product VARCHAR(64) NOT NULL COMMENT '类目/区域',
  data1 INT NOT NULL DEFAULT 0 COMMENT '数据项1',
  data2 INT NOT NULL DEFAULT 0 COMMENT '数据项2',
  sort_order INT NOT NULL DEFAULT 0 COMMENT '排序',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='横向柱状图演示数据';

DELETE FROM t_chart_bar_crossrange;

INSERT INTO t_chart_bar_crossrange (product, data1, data2, sort_order) VALUES
('华东', 320, 280, 1),
('华南', 250, 210, 2),
('华北', 180, 160, 3),
('西南', 140, 120, 4),
('西北', 110, 95, 5),
('东北', 85, 70, 6),
('华中', 200, 175, 7);

package cn.com.v2.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import cn.hutool.core.util.StrUtil;

/**
 * 图表 SQL 查询执行服务（仅允许安全的 SELECT 查询）
 */
@Service
public class ChartSqlExecuteService {

    private static final Pattern SELECT_PATTERN = Pattern.compile("^\\s*SELECT\\s+", Pattern.CASE_INSENSITIVE);

    private static final List<String> FORBIDDEN_KEYWORDS = Arrays.asList(
        "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "TRUNCATE",
        "GRANT", "REVOKE", "EXEC", "EXECUTE", "CALL", "MERGE", "REPLACE",
        "INTO OUTFILE", "LOAD_FILE", "LOAD DATA", "INFORMATION_SCHEMA"
    );

    private static final List<String> ALLOWED_TABLES = Arrays.asList(
        "t_chart_bar_crossrange"
    );

    private static final int MAX_ROWS = 500;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> execute(String sql) {
        validateSql(sql);

        jdbcTemplate.setMaxRows(MAX_ROWS);
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql.trim());

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            Map<String, Object> normalized = new LinkedHashMap<>();
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                normalized.put(entry.getKey(), entry.getValue());
            }
            result.add(normalized);
        }
        return result;
    }

    private void validateSql(String sql) {
        if (StrUtil.isBlank(sql)) {
            throw new IllegalArgumentException("SQL 不能为空");
        }

        String normalized = sql.trim();
        if (!SELECT_PATTERN.matcher(normalized).find()) {
            throw new IllegalArgumentException("仅支持 SELECT 查询");
        }

        String upperSql = normalized.toUpperCase(Locale.ROOT);
        for (String keyword : FORBIDDEN_KEYWORDS) {
            if (upperSql.contains(keyword)) {
                throw new IllegalArgumentException("SQL 包含不允许的关键字: " + keyword);
            }
        }

        if (upperSql.contains(";")) {
            throw new IllegalArgumentException("不允许执行多条 SQL");
        }

        boolean tableMatched = false;
        for (String table : ALLOWED_TABLES) {
            if (upperSql.contains(table.toUpperCase(Locale.ROOT))) {
                tableMatched = true;
                break;
            }
        }
        if (!tableMatched) {
            throw new IllegalArgumentException("仅允许查询演示表: " + String.join(", ", ALLOWED_TABLES));
        }
    }
}

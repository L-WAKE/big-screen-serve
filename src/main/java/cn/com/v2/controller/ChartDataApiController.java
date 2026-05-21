package cn.com.v2.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cn.com.v2.common.base.BaseController;
import cn.com.v2.common.domain.AjaxResult;
import cn.com.v2.service.ChartSqlExecuteService;
import cn.hutool.core.util.StrUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * 大屏图表数据接口（公共接口 / 动态请求示例）
 */
@Api(tags = "图表数据接口")
@RestController
@RequestMapping("/api/chart")
@CrossOrigin
public class ChartDataApiController extends BaseController {

    /** 请求头 token 名称，与 GoView 公共接口 Header 配置保持一致 */
    private static final String TOKEN_HEADER = "token";

    /** 演示用 token，可在 application.yml 中覆盖 */
    @Value("${goview.chart-demo-token:goview-bar-demo-token}")
    private String chartDemoToken;

    private final ChartSqlExecuteService chartSqlExecuteService;

    public ChartDataApiController(ChartSqlExecuteService chartSqlExecuteService) {
        this.chartSqlExecuteService = chartSqlExecuteService;
    }

    private AjaxResult validateToken(HttpServletRequest request) {
        String token = request.getHeader(TOKEN_HEADER);
        if (StrUtil.isBlank(token)) {
            return error(401, "缺少 token，请在请求头 Header 中配置 token");
        }
        if (!chartDemoToken.equals(token)) {
            return error(403, "token 无效");
        }
        return null;
    }

    @ApiOperation(value = "图表 SQL 查询", notes = "POST 请求，Body: {\"sql\":\"SELECT ...\"}，请求头携带 token")
    @PostMapping("/sql")
    public AjaxResult executeSql(@RequestBody Map<String, String> body, HttpServletRequest request) {
        AjaxResult tokenError = validateToken(request);
        if (tokenError != null) {
            return tokenError;
        }

        String sql = body != null ? body.get("sql") : null;
        if (StrUtil.isBlank(sql)) {
            return error(400, "缺少 sql 参数");
        }

        try {
            List<Map<String, Object>> source = chartSqlExecuteService.execute(sql);
            Map<String, Object> data = new HashMap<>();
            data.put("source", source);
            return success().put("data", data);
        } catch (IllegalArgumentException ex) {
            return error(400, ex.getMessage());
        } catch (Exception ex) {
            return error(500, "SQL 执行失败: " + ex.getMessage());
        }
    }

    @ApiOperation(value = "柱状图示例数据", notes = "请求头携带 token 即可获取柱状图数据")
    @GetMapping("/bar-common")
    public AjaxResult barCommon(HttpServletRequest request) {
        AjaxResult tokenError = validateToken(request);
        if (tokenError != null) {
            return tokenError;
        }

        List<Map<String, Object>> list = new ArrayList<>();
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        int[][] values = {
            {120, 130}, {200, 130}, {150, 312}, {80, 268},
            {70, 155}, {110, 117}, {130, 160}
        };

        for (int i = 0; i < days.length; i++) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("product", days[i]);
            row.put("data1", values[i][0]);
            row.put("data2", values[i][1]);
            list.add(row);
        }

        // 横向柱状图数据
        List<Map<String, Object>> crossrangeList = new ArrayList<>();
        String[] regions = {"华东", "华南", "华北", "西南", "西北", "东北", "华中"};
        int[][] crossValues = {
            {320, 280}, {250, 210}, {180, 160}, {140, 120},
            {110, 95}, {85, 70}, {200, 175}
        };

        for (int i = 0; i < regions.length; i++) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("product", regions[i]);
            row.put("data1", crossValues[i][0]);
            row.put("data2", crossValues[i][1]);
            crossrangeList.add(row);
        }

        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("crossrangeList", crossrangeList);

        return success().put("data", data);
    }

    @ApiOperation(value = "柱状图动态请求示例数据", notes = "供组件「动态请求」使用，请求头携带 token")
    @GetMapping("/bar-ajax")
    public AjaxResult barAjax(HttpServletRequest request) {
        AjaxResult tokenError = validateToken(request);
        if (tokenError != null) {
            return tokenError;
        }

        List<Map<String, Object>> rows = new ArrayList<>();
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        int[][] values = {
            {180, 90}, {260, 150}, {190, 280}, {120, 220},
            {95, 175}, {140, 130}, {210, 190}
        };

        for (int i = 0; i < days.length; i++) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("product", days[i]);
            row.put("data1", values[i][0]);
            row.put("data2", values[i][1]);
            rows.add(row);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("updateTime", System.currentTimeMillis());

        Map<String, Object> data = new HashMap<>();
        data.put("result", result);

        return success().put("data", data);
    }
}

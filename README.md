# Clash 覆写文件生成器

用于管理 Clash/Mihomo 直连域名列表，自动生成 JavaScript 和 YAML 格式的覆写文件，并通过 GitHub Actions 自动发布。

## 快速开始

### 1. 编辑配置文件

编辑 `config.json` 文件：

```json
{
  "ruleType": "DOMAIN-SUFFIX",
  "policy": "DIRECT",
  "domains": [
    "vitejs.dev",
    "microsoft.com",
    "npmjs.com",
    "baidu.com"
  ]
}
```

### 2. 生成覆写文件

```bash
node generate.js
```

### 3. 推送到 GitHub

```bash
git add config.json
git commit -m "更新直连域名列表"
git push
```

GitHub Actions 会自动生成 Release。

## 配置说明

### config.json

| 字段 | 说明 | 默认值 | 示例 |
|------|------|--------|------|
| `ruleType` | 规则类型 | `DOMAIN-SUFFIX` | `DOMAIN`, `DOMAIN-SUFFIX`, `DOMAIN-KEYWORD` |
| `policy` | 策略名称 | `DIRECT` | `DIRECT`, `PROXY`, `REJECT` |
| `domains` | 域名列表 | 必填 | `["google.com", "github.com"]` |

### 规则类型说明

| 规则类型 | 说明 | 示例 |
|---------|------|------|
| `DOMAIN` | 精确匹配完整域名 | `DOMAIN,www.google.com` |
| `DOMAIN-SUFFIX` | 匹配域名后缀（推荐） | `DOMAIN-SUFFIX,google.com` 匹配 `www.google.com`、`mail.google.com` |
| `DOMAIN-KEYWORD` | 域名包含关键词 | `DOMAIN-KEYWORD,google` |

## 输出文件

### override.js

```javascript
// https://mihomo.party/docs/guide/override/javascript
function main(config) {
  config.rules.unshift("DOMAIN-SUFFIX,vitejs.dev,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,microsoft.com,DIRECT");
  return config
}
```

### override.yaml

```yaml
# 将规则插入到原规则前面
+rules:
  - DOMAIN-SUFFIX,vitejs.dev,DIRECT
  - DOMAIN-SUFFIX,microsoft.com,DIRECT
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `config.json` | 配置文件（手动编辑） |
| `generate.js` | 生成脚本 |
| `override.js` | 生成的 JavaScript 覆写文件 |
| `override.yaml` | 生成的 YAML 覆写文件 |

## 许可证

MIT

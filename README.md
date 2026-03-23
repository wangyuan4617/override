# Clash 覆写文件生成器

用于管理 Clash/Mihomo 直连域名列表，自动生成 JavaScript 和 YAML 格式的覆写文件，并通过 GitHub Actions 自动发布。

## 快速开始

### 1. 编辑配置文件

编辑 `config.json` 文件，在对应的规则类型数组中添加域名：

```json
{
  "policy": "DIRECT",
  "rules": {
    "DOMAIN": [],
    "DOMAIN-SUFFIX": [
      "vitejs.dev",
      "microsoft.com",
      "npmjs.com",
      "baidu.com"
    ],
    "DOMAIN-KEYWORD": [],
    "IP-CIDR": [],
    "GEOIP": [],
    "PROCESS-NAME": []
  }
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

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `policy` | 默认策略名称 | `DIRECT` |
| `rules` | 规则对象，包含各种规则类型的数组 | 必填 |

### 规则类型说明

| 规则类型 | 说明 | 示例 |
|---------|------|------|
| `DOMAIN` | 精确匹配完整域名 | `www.google.com` |
| `DOMAIN-SUFFIX` | 匹配域名后缀（推荐） | `google.com` 匹配 `www.google.com`、`mail.google.com` |
| `DOMAIN-KEYWORD` | 域名包含关键词 | `google` |
| `IP-CIDR` | IP 段 | `8.8.8.0/24` |
| `GEOIP` | GeoIP 国家代码 | `CN`、`US` |
| `PROCESS-NAME` | 进程名 | `chrome`、`WeChat` |

### 示例配置

```json
{
  "policy": "DIRECT",
  "rules": {
    "DOMAIN": [
      "www.baidu.com"
    ],
    "DOMAIN-SUFFIX": [
      "vitejs.dev",
      "microsoft.com",
      "npmjs.com",
      "baidu.com"
    ],
    "DOMAIN-KEYWORD": [
      "google",
      "github"
    ],
    "IP-CIDR": [
      "8.8.8.0/24",
      "1.1.1.1/32"
    ],
    "GEOIP": [
      "CN",
      "LAN"
    ],
    "PROCESS-NAME": [
      "WeChat",
      "qq.exe"
    ]
  }
}
```

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

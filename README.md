# Clash 覆写文件生成器

用于管理 Clash/Mihomo 直连域名列表，自动生成 JavaScript 和 YAML 格式的覆写文件，并通过 GitHub Actions 自动发布。

## 使用方法

### 本地生成

```bash
# 安装依赖（可选，本项目无外部依赖）
npm install

# 生成覆写文件
npm run generate
# 或
node generate.js
```

### 添加直连域名

编辑 `direct_urls.txt` 文件，每行一个域名：

```text
# 这是注释
vitejs.dev.com
edge.microsoft.com
npmjs.com
```

### 自动发布

推送 `direct_urls.txt` 的更改到 `main` 分支后，GitHub Actions 会自动：
1. 生成最新的 `override.js` 和 `override.yaml`
2. 创建新的 Release 并附上生成的文件

## 输出文件

### override.js

```javascript
// https://mihomo.party/docs/guide/override/javascript
function main(config) {
  config.rules.unshift("DOMAIN,vitejs.dev.com,DIRECT");
  config.rules.unshift("DOMAIN,edge.microsoft.com,DIRECT");
  return config
}
```

### override.yaml

```yaml
# 直接覆盖整个规则
rules:
  - DOMAIN,baidu.com,DIRECT
# 将规则插入到原规则前面
+rules:
  - DOMAIN,baidu.com,DIRECT
# 在原规则后面追加规则
rules+:
  - DOMAIN,baidu.com,DIRECT
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `direct_urls.txt` | 直连域名列表（手动编辑） |
| `generate.js` | 生成脚本 |
| `override.js` | 生成的 JavaScript 覆写文件 |
| `override.yaml` | 生成的 YAML 覆写文件 |

## 许可证

MIT

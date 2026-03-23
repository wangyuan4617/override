// https://mihomo.party/docs/guide/override/javascript
function main(config) {
  config.rules.unshift("DOMAIN-SUFFIX,vitejs.dev,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,microsoft.com,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,npmjs.com,DIRECT");
  config.rules.unshift("DOMAIN-SUFFIX,baidu.com,DIRECT");
  return config
}
// https://mihomo.party/docs/guide/override/javascript
function main(config) {
  config.rules.unshift("DOMAIN,vitejs.dev.com,DIRECT");
  config.rules.unshift("DOMAIN,edge.microsoft.com,DIRECT");
  config.rules.unshift("DOMAIN,npmjs.com,DIRECT");
  config.rules.unshift("DOMAIN,baidu.com,DIRECT");
  return config
}
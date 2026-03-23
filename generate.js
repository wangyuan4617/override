const fs = require('fs');
const path = require('path');

// 读取配置文件
function readConfig(configFile) {
  const content = fs.readFileSync(configFile, 'utf-8');
  return JSON.parse(content);
}

// 生成 JavaScript 覆写文件
function generateJS(domains, ruleType, policy) {
  const lines = [
    '// https://mihomo.party/docs/guide/override/javascript',
    'function main(config) {',
  ];

  domains.forEach(domain => {
    lines.push(`  config.rules.unshift("${ruleType},${domain},${policy}");`);
  });

  lines.push('  return config');
  lines.push('}');

  return lines.join('\n');
}

// 生成 YAML 覆写文件
function generateYAML(domains, ruleType, policy) {
  const lines = [
    '# 将规则插入到原规则前面',
    '+rules:',
  ];

  domains.forEach(domain => {
    lines.push(`  - ${ruleType},${domain},${policy}`);
  });

  return lines.join('\n');
}

// 主函数
function main() {
  const projectRoot = __dirname;
  const configFile = path.join(projectRoot, 'config.json');
  const jsOutputFile = path.join(projectRoot, 'override.js');
  const yamlOutputFile = path.join(projectRoot, 'override.yaml');

  // 读取配置
  const config = readConfig(configFile);
  const { domains, ruleType = 'DOMAIN-SUFFIX', policy = 'DIRECT' } = config;

  console.log(`配置：ruleType=${ruleType}, policy=${policy}`);
  console.log(`读取到 ${domains.length} 个域名:`);
  domains.forEach(d => console.log(`  - ${d}`));

  // 生成 JS 文件
  const jsContent = generateJS(domains, ruleType, policy);
  fs.writeFileSync(jsOutputFile, jsContent, 'utf-8');
  console.log(`\n已生成 JavaScript 覆写文件：${jsOutputFile}`);

  // 生成 YAML 文件
  const yamlContent = generateYAML(domains, ruleType, policy);
  fs.writeFileSync(yamlOutputFile, yamlContent, 'utf-8');
  console.log(`已生成 YAML 覆写文件：${yamlOutputFile}`);
}

main();

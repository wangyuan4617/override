const fs = require('fs');
const path = require('path');

// 读取配置文件
function readConfig(configFile) {
  const content = fs.readFileSync(configFile, 'utf-8');
  return JSON.parse(content);
}

// 生成规则列表
function generateRules(config) {
  const { policy = 'DIRECT', rules = {} } = config;
  const allRules = [];

  for (const [ruleType, domains] of Object.entries(rules)) {
    if (Array.isArray(domains)) {
      domains.forEach(domain => {
        allRules.push({ ruleType, domain, policy });
      });
    }
  }

  return allRules;
}

// 生成 JavaScript 覆写文件
function generateJS(rules) {
  const lines = [
    '// https://mihomo.party/docs/guide/override/javascript',
    'function main(config) {',
  ];

  rules.forEach(({ ruleType, domain, policy }) => {
    lines.push(`  config.rules.unshift("${ruleType},${domain},${policy}");`);
  });

  lines.push('  return config');
  lines.push('}');

  return lines.join('\n');
}

// 生成 YAML 覆写文件
function generateYAML(rules) {
  const lines = [
    '# 将规则插入到原规则前面',
    '+rules:',
  ];

  rules.forEach(({ ruleType, domain, policy }) => {
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
  const rules = generateRules(config);

  console.log(`读取到 ${rules.length} 条规则:`);
  rules.forEach(r => console.log(`  - ${r.ruleType},${r.domain},${r.policy}`));

  // 生成 JS 文件
  const jsContent = generateJS(rules);
  fs.writeFileSync(jsOutputFile, jsContent, 'utf-8');
  console.log(`\n已生成 JavaScript 覆写文件：${jsOutputFile}`);

  // 生成 YAML 文件
  const yamlContent = generateYAML(rules);
  fs.writeFileSync(yamlOutputFile, yamlContent, 'utf-8');
  console.log(`已生成 YAML 覆写文件：${yamlOutputFile}`);
}

main();

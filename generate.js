const fs = require('fs');
const path = require('path');

// 读取直连域名列表
function readDirectUrls(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

// 生成 JavaScript 覆写文件
function generateJS(domains) {
  const lines = [
    '// https://mihomo.party/docs/guide/override/javascript',
    'function main(config) {',
  ];
  
  domains.forEach(domain => {
    lines.push(`  config.rules.unshift("DOMAIN,${domain},DIRECT");`);
  });
  
  lines.push('  return config');
  lines.push('}');
  
  return lines.join('\n');
}

// 生成 YAML 覆写文件
function generateYAML(domains) {
  const lines = [
    '# 将规则插入到原规则前面',
    '+rules:',
  ];
  
  domains.forEach(domain => {
    lines.push(`  - DOMAIN,${domain},DIRECT`);
  });
  
  return lines.join('\n');
}

// 主函数
function main() {
  const projectRoot = __dirname;
  const directUrlsFile = path.join(projectRoot, 'direct_urls.txt');
  const jsOutputFile = path.join(projectRoot, 'override.js');
  const yamlOutputFile = path.join(projectRoot, 'override.yaml');
  
  // 读取域名列表
  const domains = readDirectUrls(directUrlsFile);
  console.log(`读取到 ${domains.length} 个直连域名:`);
  domains.forEach(d => console.log(`  - ${d}`));
  
  // 生成 JS 文件
  const jsContent = generateJS(domains);
  fs.writeFileSync(jsOutputFile, jsContent, 'utf-8');
  console.log(`\n已生成 JavaScript 覆写文件：${jsOutputFile}`);
  
  // 生成 YAML 文件
  const yamlContent = generateYAML(domains);
  fs.writeFileSync(yamlOutputFile, yamlContent, 'utf-8');
  console.log(`已生成 YAML 覆写文件：${yamlOutputFile}`);
}

main();

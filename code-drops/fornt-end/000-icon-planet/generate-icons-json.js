/**
 * generate-icons-json.js
 * ----------------------
 * 自动扫描 ./icons 文件夹下的所有 .svg 文件
 * 根据文件名分词 + 内置同义词字典，生成一个 icons.json
 * 
 * 使用方法：
 *   1. 在终端进入本脚本所在目录
 *   2. 运行:  node generate-icons-json.js
 *   3. 程序会在同目录下生成/覆盖 icons.json
 */

const fs = require('fs');
const path = require('path');

// ============== 1. 定义可扩展的 同义词 字典  =============
// 你可在这里随时添加/修改
// 格式："单词": ["同义词", "同义词2", ...]
const synonymsMap = {
  "house":    ["home","building","residence","real estate"],
  "home":     ["house","residence","building","real estate"],
  "chimney":  ["smokestack"],
  "user":     ["person","account","profile","member"],
  "profile":  ["user","avatar","account"],
  "person":   ["user","human","individual"],
  "arrow":    ["direction","pointer"],
  "left":     ["previous","backward"],
  "right":    ["next","forward"],
  "solid":    ["fill","bold"],
  "circle":   ["round","shape"],
  "gear":     ["settings","cog","preferences"],
  "search":   ["magnifier","find","lookup"],
  "add":      ["plus","insert","new"],
  "edit":     ["pencil","modify","change"],
  "delete":   ["remove","trash","bin","discard"],
  // 自行添加更多常见单词
};

// ============== 2. 配置参数  =============
// 图标所在文件夹
const ICONS_DIR = './icons';
// 输出的 JSON 文件名
const OUTPUT_JSON = './icons.json';
// 为了说明来源或协议，给全部图标加一个 license，若不想加可留空
const DEFAULT_LICENSE = "Custom/Unknown";  
// 你也可以专门为 FontAwesome 图标写个检测逻辑

// ============== 3. 核心逻辑：扫描并生成 JSON =============
function main() {
  // 1) 读取 icons 文件夹所有文件
  let files;
  try {
    files = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));
  } catch (error) {
    console.error(`读取文件夹失败：${ICONS_DIR}`, error);
    return;
  }

  // 2) 为每个 svg 文件生成一个图标信息对象
  const iconList = files.map(filename => {
    // 去掉 .svg 后缀
    const baseName = filename.replace(/\.svg$/i, '');
    // 拆分：遇到 连字符、下划线 等做分词
    const tokens = baseName.split(/[-_]+/);

    // 收集每个 token 以及它的同义词
    let allKeywords = [];
    tokens.forEach(t => {
      const word = t.toLowerCase();
      allKeywords.push(word);
      if (synonymsMap[word]) {
        allKeywords = allKeywords.concat(synonymsMap[word]);
      }
    });

    // 去重（Set）、再转回数组
    allKeywords = Array.from(new Set(allKeywords));

    return {
      // 建议用 baseName 做 name
      "name": baseName,
      // keywords 就是 tokens + 同义词 的综合
      "keywords": allKeywords,
      // 默认 path 指向 icons 文件夹
      "path": `../000-icon-planet/icons/${filename}`,
      // category 可自己补
      "category": "",
      // license 默认填
      "license": DEFAULT_LICENSE
    };
  });

  // 3) 写出到 icons.json
  try {
    const jsonStr = JSON.stringify(iconList, null, 2)
    .replace(/"keywords": \[(.*?)\]/gs, (match, inner) => {
      // 把数组内的元素去换行+空格，只保留逗号+空格
      const flat = inner
        .replace(/\s+/g, '')     // 去掉所有换行和空格
        .replace(/","/g, '", "'); // 恢复逗号后空格
      return `"keywords": [${flat}]`;
    });
  
  fs.writeFileSync(OUTPUT_JSON, jsonStr, 'utf8');
  
    console.log(`成功生成 ${OUTPUT_JSON}，共收录 ${iconList.length} 个图标！`);
  } catch (error) {
    console.error("写入 icons.json 失败:", error);
  }
}

// 运行
main();

'use strict';

const fs = require('hexo-fs');
const path = require('path');

// CSS资源位置
const CSS_PATH = path.resolve(path.resolve(__dirname, "./source/css"), 'see-also.css');

// 资源生成器
hexo.extend.generator.register('see_also', () => [{
    path: 'css/see-also.css',
    data: function() {
        return fs.createReadStream(CSS_PATH);
    }
}]);

// 注入CSS引用
hexo.extend.filter.register('after_post_render', function(data) {
    if (data.content.includes('reference-table')) {
        let link_css = `<link rel="stylesheet" href="${hexo.config.root}css/see-also.css" type="text/css">`;
        data.content = link_css + data.content;
    }
    return data;
});

const referenceTable = function(args, content) {
  const rows = content.split('\n').filter(line => line.trim());
  
  let tableHtml = '<table class="reference-table">';
  
  rows.forEach(row => {

    const matches = row.match(/^(.*?)(?:\s+(https?:\/\/\S+))(?:\s+(https?:\/\/\S+))?$/);
    
    if (!matches) return;
    
    const [_, title, visit, archive] = matches;
    
    tableHtml += `
  <tr>
    <td>${title}</td>
    <td><a href="${visit}">訪問</a></td>
    <td>${archive ? `<a href="${archive}">存檔</a>` : 'Null'}</td>
  </tr>`;
  });
  
  tableHtml += '\n</table>';
  return tableHtml;
}

hexo.extend.tag.register('see_also', referenceTable, {ends: true});
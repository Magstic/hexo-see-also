'use strict';

const path = require('path');
const fs = require('hexo-fs');

// CSS 檔案實體位置（請確認存在）
const CSS_PATH = path.resolve(path.resolve(__dirname, './source/css'), 'see-also.css');

// 靜態資源輸出：輸出到 public/css/see-also.css
hexo.extend.generator.register('see_also_asset', () => [{
  path: 'css/see-also.css',
  data: () => fs.createReadStream(CSS_PATH)
}]);

// 當文章內含有 reference-table class，注入 CSS <link> 標籤
hexo.extend.filter.register('after_post_render', function (data) {
  if (data.content.includes('reference-table')) {
    const cssLink = `<link rel="stylesheet" href="${hexo.config.root}css/see-also.css" type="text/css">`;
    data.content = cssLink + data.content;
  }
  return data;
});

// HTML 轉義函數
function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 自定義 tag：{% see_also %} ... {% endsee_also %}
hexo.extend.tag.register('see_also', function (args, content) {
  const rows = content.split('\n').filter(line => line.trim());

  let html = '<table class="reference-table">\n';

  rows.forEach(row => {
    const match = row.match(/^(.*?)(?:\s+(https?:\/\/\S+))(?:\s+(https?:\/\/\S+))?$/);
    if (!match) return;

    const [, titleRaw, visitUrl, archiveUrl] = match;
    const title = escapeHtml(titleRaw.trim());

    const visitLink = `<a href="${visitUrl}" target="_blank" rel="noopener noreferrer">訪問</a>`;
    const archiveLink = archiveUrl
      ? `<a href="${archiveUrl}" target="_blank" rel="noopener noreferrer">存檔</a>`
      : 'Null';

    html += `  <tr>
    <td>${title}</td>
    <td>${visitLink}</td>
    <td>${archiveLink}</td>
  </tr>\n`;
  });

  html += '</table>';
  return html;
}, { ends: true });

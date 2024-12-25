'use strict';

const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.content.includes('see-also')) {
    data.content = `<link rel="stylesheet" href="/css/see-also.css">\n${data.content}`;
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
# hexo-see-also

一個美化 Hexo 部落格參見（See Also）的插件。
<br>
**該插件為自我使用，暫不考慮進一步適配和美化。**

## 安裝

```bash
npm i hexo-see-also
```

## 使用方法

```markdown
{% see_also %}
檔案名 檔案LINK 檔案存檔LINK
檔案名 檔案LINK 檔案存檔LINK
檔案名 檔案LINK 檔案存檔LINK
{% endsee_also %}
```

### 参数说明

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| 檔案名 | 是 | 檔案名稱 | 音樂資訊 |
| 檔案LINK | 是 | 檔案的原始連結 | https://example.com/ |
| 檔案存檔LINK | 是 | 檔案的存檔連接 | https://example.com/ |

### 示例

```markdown
{% see_also %}
音樂資訊 https://example.com/ https://example.com/
書籍資訊 https://example.com/ https://example.com/
影片資訊 https://example.com/ https://example.com/
{% endsee_also %}
```

## 许可证

MIT License © 2024 [Magstic](https://github.com/magstic)

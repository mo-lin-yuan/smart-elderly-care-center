#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
智慧养老 - 词云生成器
"""

from wordcloud import WordCloud
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

# 词汇数据（来自JSON配置）
word_data = [
    {"name": "智慧养老", "value": 12000},
    {"name": "实时监控", "value": 11000},
    {"name": "报警系统", "value": 10500},
    {"name": "任务管理", "value": 9000},
    {"name": "健康检测", "value": 8800},
    {"name": "呼叫响应", "value": 8600},
    {"name": "满意度分析", "value": 7500},
    {"name": "建议反馈", "value": 7300},
    {"name": "异常检测", "value": 7100},
    {"name": "视频监控", "value": 6500},
    {"name": "行为分析", "value": 6300},
    {"name": "优先级调度", "value": 5500},
    {"name": "数据可视化", "value": 5200},
    {"name": "系统联动", "value": 4500},
    {"name": "智能分析", "value": 4200},
    {"name": "设备管理", "value": 3500},
    {"name": "健康评估", "value": 3200},
    {"name": "远程看护", "value": 3000},
    {"name": "服务质量", "value": 2600},
    {"name": "数据分析", "value": 2400}
]

# 生成频率字典
text_dict = {item["name"]: item["value"] for item in word_data}

# 颜色方案（匹配网站主题）
colors = ['#2cf7fe', '#6586ec', '#4A9EF8', '#03F433FF', '#27979A',
          '#ff9500', '#e64d85', '#4169e1', '#32cd32', '#ff4500']


def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    index = word_data.index([item for item in word_data if item["name"] == word][0])
    return colors[index % len(colors)]


# 创建词云
wordcloud = WordCloud(
    font_path='C:/Windows/Fonts/simhei.ttf',  # 使用系统中的中文字体
    width=1443,
    height=644,
    background_color='rgba(0,0,0,0)',
    mode='RGBA',
    prefer_horizontal=0.7,
    relative_scaling=0.6,
    color_func=color_func,
    min_font_size=14,
    max_font_size=60,
    scale=1
).generate_from_frequencies(text_dict)

# 保存图片
output_path = '/web/wordcloud.png'
wordcloud.to_file(output_path)

print(f"词云已生成并保存至: {output_path}")

# 同时也生成一个 HTML 文件
html_template = """
<div style="width:100%; height:100%; position:relative; overflow:hidden;">
    <img src="wordcloud.png"
         style="position:absolute; left:0; top:0; width:100%; height:100%; object-fit:contain;">
</div>
"""

html_path = '/web/wordcloud.html'
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"HTML 示例已保存至: {html_path}")

print("\n使用方法:")
print("1. 将 renderer.js 中的 createWordCloudComponent 改为使用图片")
print("2. 或者直接使用 wordcloud.html")

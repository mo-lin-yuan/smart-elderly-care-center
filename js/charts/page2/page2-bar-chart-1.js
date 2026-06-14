const page2BarChart1 = {
    key: "Bar",
    attr: {
        x: 26,
        y: 509,
        w: 571,
        h: 463,
        zIndex: -1
    },
    option: {
        color: ['#00C9FF', '#92FE9D', '#F5D000FF'],
        legend: {
            show: true,
            type: "scroll",
            x: "center",
            y: "top",
            icon: "circle",
            orient: "horizontal",
            textStyle: {
                color: "#B9B8CE",
                fontSize: 14
            },
            itemHeight: 12,
            itemWidth: 20,
            pageTextStyle: {
                color: "#B9B8CE"
            }
        },
        xAxis: {
            show: true,
            name: "",
            nameGap: 15,
            nameTextStyle: {
                color: "#B9B8CE",
                fontSize: 12
            },
            inverse: false,
            axisLabel: {
                show: true,
                fontSize: 12,
                color: "#B9B8CE",
                rotate: 0
            },
            position: "bottom",
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#B9B8CE",
                    width: 1
                },
                onZero: true
            },
            axisTick: {
                show: true,
                length: 5
            },
            splitLine: {
                show: false
            },
            type: "category"
        },
        yAxis: {
            show: true,
            name: "",
            nameGap: 15,
            nameTextStyle: {
                color: "#B9B8CE",
                fontSize: 12
            },
            inverse: false,
            axisLabel: {
                show: true,
                fontSize: 12,
                color: "#B9B8CE",
                rotate: 0
            },
            position: "left",
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#B9B8CE",
                    width: 1
                },
                onZero: true
            },
            axisTick: {
                show: true,
                length: 5
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#484753",
                    width: 1,
                    type: "dashed"
                }
            },
            type: "value"
        },
        grid: {
            show: false,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 60
        },
        tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(20, 50, 80, 0.95)",
            borderColor: "#00C9FF",
            borderWidth: 1,
            textStyle: {
                color: "#fff",
                fontSize: 12
            },
            axisPointer: {
                show: true,
                type: "shadow",
                shadowStyle: {
                    color: "rgba(0, 201, 255, 0.1)"
                }
            }
        },
        dataset: {
            dimensions: [
                "type",
                "前",
                "昨",
                "今"
            ],
            source: [
                { "type": "日对比", "前": 120, "昨": 150, "今": 180 },
                { "type": "周对比", "前": 820, "昨": 760, "今": 900 },
                { "type": "月对比", "前": 3200, "昨": 2950, "今": 3400 }
            ]
        },
        series: [
            {
                type: "bar",
                barWidth: 30,
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "Microsoft YaHei"
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#00C9FF' },
                            { offset: 1, color: '#007AFF' }
                        ]
                    },
                    borderRadius: [8, 8, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(0, 201, 255, 0.5)'
                    }
                }
            },
            {
                type: "bar",
                barWidth: 30,
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "Microsoft YaHei"
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#92FE9D' },
                            { offset: 1, color: '#00C853' }
                        ]
                    },
                    borderRadius: [8, 8, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(146, 254, 157, 0.5)'
                    }
                }
            },
            {
                type: "bar",
                barWidth: 30,
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "Microsoft YaHei"
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#F5D000FF' },
                            { offset: 1, color: '#FF9500' }
                        ]
                    },
                    borderRadius: [8, 8, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(245, 208, 0, 0.5)'
                    }
                }
            }
        ],
        backgroundColor: "transparent",
        animation: true,
        animationDuration: 1500,
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
            return idx * 100
        }
    }
}
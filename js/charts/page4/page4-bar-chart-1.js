const page4BarChart1 = {
    key: "Bar",
    attr: {
        x: 1057,
        y: 542,
        w: 859,
        h: 493,
        zIndex: -1
    },
    option: {
        color: ['#00C9FF', '#92FE9D', '#F5D000FF'],
        legend: {
            show: true,
            x: "center",
            y: "top",
            icon: "circle",
            orient: "horizontal",
            textStyle: {
                color: "#B9B8CE",
                fontSize: 14,
                fontFamily: "Microsoft YaHei"
            },
            itemWidth: 20,
            itemHeight: 12,
            pageTextStyle: {
                color: "#B9B8CE"
            }
        },
        tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(20, 50, 80, 0.95)",
            borderColor: "#00C9FF",
            borderWidth: 1,
            textStyle: {
                color: "#fff",
                fontSize: 12,
                fontFamily: "Microsoft YaHei"
            },
            axisPointer: {
                show: true,
                type: "shadow",
                shadowStyle: {
                    color: "rgba(0, 201, 255, 0.1)"
                }
            }
        },
        xAxis: {
            type: "category",
            data: ["烟感设备", "摄像头", "巡检机器人", "门禁系统", "电梯监控", "环境传感器"],
            show: true,
            name: "",
            nameTextStyle: {
                color: "#B9B8CE",
                fontSize: 12
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#B9B8CE",
                    fontSize: 12
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#B9B8CE",
                    width: 1
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            show: true,
            name: "",
            nameTextStyle: {
                color: "#B9B8CE",
                fontSize: 12
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#B9B8CE",
                    fontSize: 12
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#B9B8CE",
                    width: 1
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#484753",
                    width: 1,
                    type: "dashed"
                }
            }
        },
        grid: {
            left: "8%",
            right: "8%",
            top: 60,
            bottom: 40,
            containLabel: true
        },
        series: [
            {
                name: "前天",
                type: "bar",
                barWidth: 25,
                label: {
                    show: false
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
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 201, 255, 0.5)'
                    }
                },
                data: [6, 5, 8, 4, 3, 2]
            },
            {
                name: "昨天",
                type: "bar",
                barWidth: 25,
                label: {
                    show: false
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
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(146, 254, 157, 0.5)'
                    }
                },
                data: [7, 6, 10, 4, 4, 3]
            },
            {
                name: "今天",
                type: "bar",
                barWidth: 25,
                label: {
                    show: false
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
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(245, 208, 0, 0.5)'
                    }
                },
                data: [8, 7, 12, 5, 4, 3]
            }
        ],
        backgroundColor: "transparent",
        animation: true,
        animationDuration: 1500,
        animationEasing: "elasticOut"
    }
}
const page2LineChart1 = {
    key: "VChartLine",
    attr: {
        x: 604,
        y: 700,
        w: 698,
        h: 296,
        zIndex: -1
    },
    option: {
        color: ['#00C9FF', '#F5D000FF'],
        legend: [
            {
                show: true,
                right: 20,
                top: 15,
                item: {
                    visible: true,
                    align: "left",
                    shape: "circle",
                    label: {
                        style: {
                            fontSize: 12,
                            fill: "#B9B8CE",
                            fontFamily: "Microsoft YaHei",
                            fontWeight: "normal"
                        }
                    }
                }
            }
        ],
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
                type: "line",
                lineStyle: {
                    color: "#00C9FF",
                    width: 1,
                    type: "dashed"
                }
            }
        },
        xAxis: {
            type: "category",
            data: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
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
                    fontSize: 11
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
                    fontSize: 11
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
            top: 50,
            bottom: 40,
            containLabel: true
        },
        series: [
            {
                name: "上周",
                type: "line",
                smooth: 0.5,
                symbol: "circle",
                symbolSize: 6,
                lineStyle: {
                    width: 2,
                    color: "#00C9FF"
                },
                itemStyle: {
                    color: "#00C9FF",
                    borderColor: "#fff",
                    borderWidth: 2
                },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: "rgba(0, 201, 255, 0.3)" },
                            { offset: 1, color: "rgba(0, 201, 255, 0)" }
                        ]
                    }
                },
                emphasis: {
                    focus: "series",
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 201, 255, 0.8)"
                    }
                },
                data: [12, 15, 18, 20, 22, 19, 25, 28, 30, 26, 22]
            },
            {
                name: "今日",
                type: "line",
                smooth: 0.5,
                symbol: "circle",
                symbolSize: 6,
                lineStyle: {
                    width: 2,
                    color: "#F5D000FF"
                },
                itemStyle: {
                    color: "#F5D000FF",
                    borderColor: "#fff",
                    borderWidth: 2
                },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: "rgba(245, 208, 0, 0.3)" },
                            { offset: 1, color: "rgba(245, 208, 0, 0)" }
                        ]
                    }
                },
                emphasis: {
                    focus: "series",
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(245, 208, 0, 0.8)"
                    }
                },
                data: [15, 18, 22, 25, 28, 24, 30, 32, 35, 30, 28]
            }
        ],
        backgroundColor: "transparent",
        animation: true,
        animationDuration: 2000,
        animationEasing: "cubicOut"
    }
}
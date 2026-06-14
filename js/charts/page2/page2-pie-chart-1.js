const page2PieChart1 = {
    key: "Pie",
    attr: {
        x: 1288.5,
        y: 542,
        w: 635,
        h: 538,
        zIndex: -1
    },
    option: {
        color: ['#00E5FF', '#7CFF6B', '#FFE45C', '#FF6B9A', '#A78BFA', '#38BDF8', '#FB923C', '#E2E8F0'],
        title: {
            show: false
        },
        tooltip: {
            show: true,
            trigger: "item",
            backgroundColor: "rgba(8, 28, 48, 0.96)",
            borderColor: "#2cf7fe",
            borderWidth: 1,
            textStyle: {
                color: "#fff",
                fontSize: 14,
                fontFamily: "Microsoft YaHei"
            },
            formatter: "{b}: {c}次 ({d}%)"
        },
        legend: {
            show: true,
            type: "plain",
            orient: "horizontal",
            left: "center",
            bottom: 8,
            width: 600,
            textStyle: {
                color: "#EAF7FFFF",
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Microsoft YaHei",
                width: 118,
                overflow: "truncate",
                textShadowColor: "rgba(0, 229, 255, 0.65)",
                textShadowBlur: 4
            },
            itemWidth: 16,
            itemHeight: 11,
            itemGap: 12
        },
        series: [
            {
                name: "呼叫内容",
                type: "pie",
                radius: ["35%", "62%"],
                center: ["50%", "42%"],
                minAngle: 3,
                minShowLabelAngle: 4,
                avoidLabelOverlap: true,
                roseType: false,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: "#061B36",
                    borderWidth: 3,
                    shadowBlur: 20,
                    shadowOffsetY: 12,
                    shadowColor: "rgba(0, 0, 0, 0.45)"
                },
                label: {
                    show: true,
                    position: "outside",
                    formatter: "{b}\n{d}%",
                    color: "#EAF7FFFF",
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: "bold",
                    fontFamily: "Microsoft YaHei",
                    textShadowColor: "rgba(0, 0, 0, 0.85)",
                    textShadowBlur: 5
                },
                labelLine: {
                    show: true,
                    length: 16,
                    length2: 28,
                    smooth: 0.25,
                    lineStyle: {
                        color: "rgba(160, 238, 255, 0.95)",
                        width: 2
                    }
                },
                emphasis: {
                    scale: true,
                    scaleSize: 8,
                    itemStyle: {
                        shadowBlur: 24,
                        shadowOffsetY: 14,
                        shadowColor: "rgba(44, 247, 254, 0.38)"
                    }
                },
                data: [
                    { value: 42, name: "请求倒水" },
                    { value: 38, name: "需要陪同聊天" },
                    { value: 35, name: "协助取物" },
                    { value: 28, name: "提醒吃药" },
                    { value: 22, name: "调整空调/温度" },
                    { value: 18, name: "协助如厕" },
                    { value: 15, name: "设备操作帮助" },
                    { value: 10, name: "其他" }
                ]
            }
        ],
        backgroundColor: "transparent",
        animation: true,
        animationDuration: 1200,
        animationEasing: "cubicOut"
    }
}

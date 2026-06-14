const page1WordCloud1 = {
    key: "VChartWordCloud",
    attr: {
        x: 1472,
        y: 210,
        w: 407,
        h: 806,
        zIndex: -1
    },
    option: {
        dataset: [
            { text: "紧急呼叫", value: 100 },
            { text: "吃药提醒", value: 90 },
            { text: "摔倒报警", value: 85 },
            { text: "日常起居", value: 80 },
            { text: "陪同聊天", value: 75 },
            { text: "协助行走", value: 70 },
            { text: "送餐服务", value: 65 },
            { text: "清洁打扫", value: 60 },
            { text: "医疗护理", value: 55 },
            { text: "心理疏导", value: 50 },
            { text: "康复训练", value: 45 },
            { text: "紧急救援", value: 40 }
        ],
        wordCloudConfig: {
            shape: "circle",
            size: ["20%", "80%"],
            sizeRange: [20, 60],
            rotationRange: [-45, 45],
            rotationStep: 15,
            gridSize: 10,
            drawOutOfBound: false,
            textStyle: {
                normal: {
                    fontFamily: "sans-serif",
                    fontWeight: "bold"
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: "#333"
                }
            },
            colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
        }
    }
}
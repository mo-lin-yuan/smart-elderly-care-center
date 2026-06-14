const page1Table3 = {
    key: "Table",
    attr: {
        x: 1024,
        y: 210,
        w: 407,
        h: 806,
        zIndex: -1
    },
    option: {
        dataset: [
            { column1: "1号机器人", column2: "巡检中", column3: "85%", column4: "在线" },
            { column1: "2号机器人", column2: "待命", column3: "92%", column4: "在线" },
            { column1: "3号机器人", column2: "充电中", column3: "45%", column4: "离线" },
            { column1: "4号机器人", column2: "巡检中", column3: "78%", column4: "在线" },
            { column1: "5号机器人", column2: "维护中", column3: "23%", column4: "离线" }
        ],
        tableConfig: {
            scrollType: "row",
            scrollInterval: 3,
            scrollAnimationType: "slide",
            hoverPause: true,
            backgroundColors: ["#38388FFF", "#5F5F9CFF"]
        },
        rowConfig: {
            useHeight: false,
            height: 40,
            count: 9,
            borderRadius: 0,
            flexGap: 0,
            topSpacing: 0,
            bottomSpacing: 0,
            fontColor: "#FFFFFFFF",
            fontWeight: "normal",
            fontSize: 14,
            fontFamily: "inherit",
            fontStyle: "normal",
            headerShow: true,
            headerBackgroundColor: "#1E1EB7FF",
            headerRowNumber: 40,
            headerBorderRadius: 0,
            headerFontSize: 14,
            headerFontColor: "#ffffff",
            headerFontWeight: "normal",
            headerFontStyle: "normal",
            headerFontFamily: "inherit",
            useHeaderTextAlign: false,
            headerTextAlign: "center",
            selectMode: "none",
            selectBackgroundColor: "#22A2C3",
            selectBorderColor: "#22A2C3",
            selectBorderType: "solid",
            selectBorderWidth: 1,
            selectRowFontColor: "#ffffff",
            selectRowFontWeight: "normal",
            selectRowFontSize: 14,
            selectRowFontFamily: "inherit",
            selectRowFontStyle: "normal",
            textOverflow: "marquee",
            marqueeSpeed: 5
        },
        columnConfig: {
            useWidth: false,
            indexShow: true,
            indexTitle: "序号",
            indexStart: 1,
            indexWidth: 40,
            useIndexWidth: true,
            indexLeftSpacing: 0,
            indexRightSpacing: 0,
            indexTextAlign: "center",
            indexFontStyle: {
                fontSize: 14,
                fontColor: "#ffffff",
                fontWeight: "normal",
                fontFamily: "inherit",
                fontStyle: "normal"
            },
            indexConditionConfig: [],
            columns: [
                {
                    id: "id_xxx1",
                    title: "编号",
                    dataset: "",
                    mapping: "column1",
                    width: 100,
                    leftSpacing: 0,
                    rightSpacing: 0,
                    prefix: "",
                    suffix: "",
                    columnTextAlign: "center",
                    conditionConfig: []
                },
                {
                    id: "id_xxx2",
                    title: "状态",
                    dataset: "",
                    mapping: "column2",
                    width: 80,
                    leftSpacing: 0,
                    rightSpacing: 0,
                    prefix: "",
                    suffix: "",
                    columnTextAlign: "center",
                    conditionConfig: []
                },
                {
                    id: "id_xxx3",
                    title: "电量",
                    dataset: "",
                    mapping: "column3",
                    width: 80,
                    leftSpacing: 0,
                    rightSpacing: 0,
                    prefix: "",
                    suffix: "",
                    columnTextAlign: "center",
                    conditionConfig: []
                },
                {
                    id: "id_xxx4",
                    title: "网络",
                    dataset: "",
                    mapping: "column4",
                    width: 80,
                    leftSpacing: 0,
                    rightSpacing: 0,
                    prefix: "",
                    suffix: "",
                    columnTextAlign: "center",
                    conditionConfig: []
                }
            ]
        }
    }
}
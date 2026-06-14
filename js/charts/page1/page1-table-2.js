const page1Table2 = {
    key: "Table",
    attr: {
        x: 542,
        y: 210,
        w: 407,
        h: 806,
        zIndex: -1
    },
    option: {
        dataset: [
            { column1: "烟感01", column2: "102", column3: "2024-01-15 09:30", column4: "正常" },
            { column1: "烟感02", column2: "205", column3: "2024-01-15 10:15", column4: "报警" },
            { column1: "烟感03", column2: "301", column3: "2024-01-15 11:00", column4: "正常" },
            { column1: "烟感04", column2: "402", column3: "2024-01-15 14:20", column4: "正常" },
            { column1: "烟感05", column2: "203", column3: "2024-01-15 15:45", column4: "报警" }
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
                    title: "设备",
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
                    title: "位置",
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
                    title: "时间",
                    dataset: "",
                    mapping: "column3",
                    width: 120,
                    leftSpacing: 0,
                    rightSpacing: 0,
                    prefix: "",
                    suffix: "",
                    columnTextAlign: "center",
                    conditionConfig: []
                },
                {
                    id: "id_xxx4",
                    title: "状态",
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
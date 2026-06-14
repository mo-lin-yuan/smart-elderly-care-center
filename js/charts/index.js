const pageIdMap = {
    'id_3vlrxpkmbmy000': 'page1',
    'id_hbqvszwb1cw00': 'page2',
    'id_18hsmgpx7na800': 'page3',
    'id_4clgh7utjei000': 'page4',
    'id_1bik2482o9xc00': 'page5'
}

const chartConfigs = {
    page1: {
        table1: page1Table1,
        table2: page1Table2,
        table3: page1Table3,
        wordCloud1: page1WordCloud1
    },
    page2: {
        barChart1: page2BarChart1,
        lineChart1: page2LineChart1,
        pieChart1: page2PieChart1
    },
    page4: {
        barChart1: page4BarChart1
    }
}

function getChartConfig(pageId, chartKey) {
    const pageName = pageIdMap[pageId] || pageId
    const pageCharts = chartConfigs[pageName]
    if (!pageCharts) return null
    return pageCharts[chartKey] || null
}

function getPageCharts(pageId) {
    const pageName = pageIdMap[pageId] || pageId
    return chartConfigs[pageName] || {}
}
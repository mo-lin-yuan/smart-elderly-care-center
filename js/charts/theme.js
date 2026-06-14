const EChartsTheme = {
    colors: [
        '#00C9FF',
        '#92FE9D',
        '#F5D000FF',
        '#FF6B6B',
        '#9B59B6',
        '#3498DB'
    ],

    gradientColors: [
        {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#00C9FF' },
                { offset: 1, color: '#007AFF' }
            ]
        },
        {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#92FE9D' },
                { offset: 1, color: '#00C853' }
            ]
        },
        {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#F5D000FF' },
                { offset: 1, color: '#FF9500' }
            ]
        }
    ],

    textColor: '#B9B8CE',
    gridColor: '#484753',
    backgroundColor: 'transparent',

    tooltip: {
        backgroundColor: 'rgba(20, 50, 80, 0.95)',
        borderColor: '#00C9FF',
        borderWidth: 1,
        textStyle: {
            color: '#fff',
            fontFamily: 'Microsoft YaHei'
        },
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: 'rgba(0, 201, 255, 0.1)'
            }
        }
    },

    legend: {
        textStyle: {
            color: '#B9B8CE',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
        },
        itemWidth: 20,
        itemHeight: 12
    },

    axis: {
        axisLine: {
            lineStyle: {
                color: '#B9B8CE',
                width: 1
            }
        },
        axisTick: {
            lineStyle: {
                color: '#B9B8CE'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#B9B8CE',
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#484753',
                type: 'dashed',
                width: 1
            }
        }
    },

    animation: {
        duration: 1500,
        easing: 'elasticOut'
    }
}

function getGradientColor(index) {
    return EChartsTheme.gradientColors[index % EChartsTheme.gradientColors.length]
}

function getColor(index) {
    return EChartsTheme.colors[index % EChartsTheme.colors.length]
}

function mergeWithTheme(options) {
    return {
        ...options,
        tooltip: {
            ...EChartsTheme.tooltip,
            ...options.tooltip
        },
        legend: {
            ...EChartsTheme.legend,
            ...options.legend
        }
    }
}
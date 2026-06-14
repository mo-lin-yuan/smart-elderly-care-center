let currentPageId = ''
const pageCache = {}
const chartInstances = {}

function handleError(error, context) {
    console.error(`[${context}] Error:`, error)
    
    if (error instanceof Error) {
        console.error('Error stack:', error.stack)
    }
    
    if (typeof window !== 'undefined' && window.location) {
        console.error('Page:', window.location.href)
    }
}

function logInfo(message, context) {
    console.info(`[${context}] ${message}`)
}

function debounce(func, delay = 300) {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), delay)
    }
}

function renderPage(page) {
    const app = document.getElementById('app')
    currentPageId = page.pageId

    app.innerHTML = ''

    if (page.editCanvasConfig) {
        const config = page.editCanvasConfig
        if (config.background) {
            app.style.background = config.background
        }
        if (config.backgroundImage) {
            app.style.backgroundImage = `url(${config.backgroundImage})`
            app.style.backgroundSize = 'cover'
            app.style.backgroundPosition = 'center'
            app.style.backgroundRepeat = 'no-repeat'
        }
    }

    if (!page.componentList || page.componentList.length === 0) {
        return
    }

    page.componentList.forEach((component, index) => {
        setTimeout(() => {
            if (currentPageId === page.pageId) {
                renderComponent(component, app)
            }
        }, index * 30)
    })
}

function reinitializeCharts(page) {
    const charts = document.querySelectorAll('.chart-container')
    charts.forEach((chartDom, index) => {
        setTimeout(() => {
            if (chartDom.dataset.chartType === 'bar') {
                initBarChart(chartDom)
            } else if (chartDom.dataset.chartType === 'line') {
                initLineChart(chartDom)
            }
        }, index * 100)
    })
}

function renderComponent(component, container) {
    if (!component) return

    if (component.isGroup) {
        renderGroup(component, container)
        return
    }

    const el = createElementFromComponent(component)
    if (!el) return

    const attr = component.attr || {}
    const {x, y, w, h, zIndex} = attr

    el.style.position = 'absolute'
    el.style.left = (x || 0) + 'px'
    el.style.top = (y || 0) + 'px'
    el.style.width = (w || 100) + 'px'
    el.style.height = (h || 100) + 'px'
    el.style.zIndex = Math.max(1, zIndex ?? 1)

    if (component.events && component.events.clickPageId) {
        el.style.cursor = 'pointer'
        el.style.zIndex = Math.max(1, zIndex ?? 1) + 1000
        el.onclick = function () {
            jumpPageById(component.events.clickPageId)
        }
    }

    container.appendChild(el)
}

function renderGroup(group, container) {
    const attr = group.attr || {}
    const {x, y, w, h, zIndex} = attr

    let clickPageId = null
    if (group.events && group.events.clickPageId) {
        clickPageId = group.events.clickPageId
    }

    const groupChildren = group.groupList || group.componentList || []
    const isReturnGroup = Boolean(clickPageId && groupChildren.some(child => {
        const text = child?.option?.dataset || ''
        return child?.key === 'TextCommon' && text.includes('返回')
    }))
    const baseX = isReturnGroup ? Math.max(12, x || 0) : (x || 0)
    const baseY = isReturnGroup ? -4 : (y || 0)

    if (group.componentList) {
        group.componentList.forEach(child => {
            const el = createElementFromComponent(child)
            if (!el) return

            const childAttr = child.attr || {}
            const isReturnText = isReturnGroup && child.key === 'TextCommon'
            const isReturnIcon = isReturnGroup && child.key === 'Icon'
            const childX = baseX + (isReturnText ? 84 : isReturnIcon ? 10 : (childAttr.x || 0))
            const childY = baseY + (isReturnText ? 30 : isReturnIcon ? 12 : (childAttr.y || 0))

            el.style.position = 'absolute'
            el.style.left = childX + 'px'
            el.style.top = childY + 'px'
            el.style.width = (isReturnText ? 138 : isReturnIcon ? 58 : (childAttr.w || 100)) + 'px'
            el.style.height = (isReturnText ? 30 : isReturnIcon ? 58 : (childAttr.h || 100)) + 'px'
            el.style.zIndex = Math.max(1, childAttr.zIndex ?? 1)

            container.appendChild(el)
        })
    }

    if (group.groupList) {
        group.groupList.forEach(child => {
            if (child.isGroup) {
                renderGroup(child, container)
            } else {
                const el = createElementFromComponent(child)
                if (!el) return

                const childAttr = child.attr || {}
                const isReturnText = isReturnGroup && child.key === 'TextCommon'
                const isReturnIcon = isReturnGroup && child.key === 'Icon'
                const childX = baseX + (isReturnText ? 84 : isReturnIcon ? 10 : (childAttr.x || 0))
                const childY = baseY + (isReturnText ? 30 : isReturnIcon ? 12 : (childAttr.y || 0))

                if (isReturnText) {
                    el.style.writingMode = 'horizontal-tb'
                    el.style.whiteSpace = 'nowrap'
                    el.style.justifyContent = 'flex-start'
                    el.style.letterSpacing = '1px'
                    el.style.fontSize = '18px'
                }

                el.style.position = 'absolute'
                el.style.left = childX + 'px'
                el.style.top = childY + 'px'
                el.style.width = (isReturnText ? 138 : isReturnIcon ? 58 : (childAttr.w || 100)) + 'px'
                el.style.height = (isReturnText ? 30 : isReturnIcon ? 58 : (childAttr.h || 100)) + 'px'
                el.style.zIndex = Math.max(1, childAttr.zIndex ?? 1)

                container.appendChild(el)
            }
        })
    }

    if (clickPageId) {
        const clickCover = document.createElement('div')
        clickCover.style.position = 'absolute'
        clickCover.style.left = baseX + 'px'
        clickCover.style.top = baseY + 'px'
        clickCover.style.width = Math.max(w || 100, 220) + 'px'
        clickCover.style.height = Math.max(h || 100, 88) + 'px'
        clickCover.style.zIndex = 9999
        clickCover.style.cursor = 'pointer'
        clickCover.style.background = 'transparent'
        clickCover.onclick = function () {
            jumpPageById(clickPageId)
        }
        container.appendChild(clickCover)
    }
}

function createElementFromComponent(component) {
    try {
        if (!component || !component.key) {
            handleError(new Error('Invalid component'), 'createElementFromComponent')
            return null
        }

        const key = component.key
        let option = component.option || {}
        const attr = component.attr || {}

        const chartKey = attr.chartKey
        if (chartKey && typeof getChartConfig === 'function') {
            const externalConfig = getChartConfig(currentPageId, chartKey)
            if (externalConfig) {
                option = externalConfig.option || option
            }
        }

        switch (key) {
            case 'TextCommon':
                return createTextComponent(option)

        case 'Image':
            return createImageComponent(option)

        case 'Border02':
            return createBorderComponent(option, 'border-02')

        case 'Border01':
            return createBorderComponent(option, 'border-01')

        case 'Border03':
            return createBorderComponent(option, 'border-03')

        case 'TableScrollBoardCommon':
            return createTableComponent(option, attr)

        case 'FlipperNumber':
            return createFlipperComponent(option)

        case 'VChartBarCommon':
        case 'BarCommon':
            return createBarChartComponent(component)

        case 'VChartLine':
            return createLineChartComponent(component)

        case 'VChartWordCloud':
            return createWordCloudComponent(option)

        case 'Icon':
            return createIconComponent(option)

        case 'Pie':
            return createPieChartComponent(component)

        case 'cllkbdtdr0001t0rw7ao9oz6a':
            return createFusionPieComponent(component)

        case 'clsu44p2w00037pfensv6134z':
            return createBarrageComponent(option)

        case 'cmhg04n5o00015y7el9cgop5k':
            return createTimeTextComponent({ fontSize: 18, fontColor: '#ffffff' })

        default:
            handleError(new Error(`Unknown component type: ${key}`), 'createElementFromComponent')
            return null
    }
    } catch (error) {
        handleError(error, 'createElementFromComponent')
        return null
    }
}

function createTextComponent(option) {
    const el = document.createElement('div')

    const opt = option

    el.innerText = (opt.dataset || '').trim()

    el.style.display = 'flex'
    el.style.justifyContent = opt.textAlign === 'center'
        ? 'center'
        : opt.textAlign === 'end' || opt.textAlign === 'right'
            ? 'flex-end'
            : 'flex-start'
    el.style.alignItems = 'center'

    el.style.lineHeight = opt.lineHeight || 'normal'
    el.style.fontFamily = 'Microsoft YaHei, Arial, sans-serif'
    el.style.boxSizing = 'border-box'
    el.style.paddingLeft = (opt.paddingX || 0) + 'px'
    el.style.paddingRight = (opt.paddingX || 0) + 'px'
    el.style.paddingTop = (opt.paddingY || 0) + 'px'
    el.style.paddingBottom = (opt.paddingY || 0) + 'px'

    el.style.fontSize = (opt.fontSize || 16) + 'px'
    el.style.color = opt.fontColor || '#fff'
    el.style.fontWeight = opt.fontWeight || 'normal'

    el.style.letterSpacing = (opt.letterSpacing || 0) + 'px'

    el.style.textAlign = opt.textAlign || 'left'
    el.style.whiteSpace = 'pre-line'
    el.style.writingMode = opt.writingMode || 'horizontal-tb'
    el.style.background = opt.backgroundColor || 'transparent'
    el.style.border = (opt.borderWidth || 0) + 'px solid ' + (opt.borderColor || 'transparent')
    el.style.borderRadius = (opt.borderRadius || 0) + 'px'

    return el
}

function createTimeTextComponent(option) {
    const el = document.createElement('div')

    el.style.display = 'flex'
    el.style.justifyContent = 'flex-end'
    el.style.alignItems = 'center'
    el.style.whiteSpace = 'nowrap'

    el.style.fontSize = (option.fontSize || 16) + 'px'
    el.style.color = option.fontColor || '#fff'
    el.style.fontFamily = 'Microsoft YaHei, Arial, sans-serif'

    function updateTime() {
        const now = new Date()

        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')

        const hour = String(now.getHours()).padStart(2, '0')
        const minute = String(now.getMinutes()).padStart(2, '0')
        const second = String(now.getSeconds()).padStart(2, '0')

        const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const week = weekArr[now.getDay()]

        el.innerText = `${year}年${month}月${day}日 ${week} ${hour}:${minute}:${second}`
    }

    updateTime()
    setInterval(updateTime, 1000)

    return el
}

function createImageComponent(option) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.overflow = 'hidden'

    const img = document.createElement('img')
    img.src = option.dataset || ''
    const isMonitorImage = currentPageId === 'id_18hsmgpx7na800' && typeof option.dataset === 'string' && option.dataset.includes('page3-img')
    img.style.objectFit = isMonitorImage ? 'fill' : (option.fit || 'fill')
    img.style.display = 'block'
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.borderRadius = (option.borderRadius || 0) + 'px'

    if (isMonitorImage) {
        img.style.filter = 'contrast(1.16) brightness(1.06) saturate(1.08)'
        img.style.backfaceVisibility = 'hidden'
        img.style.transform = 'translateZ(0)'
        img.style.imageRendering = 'auto'
    }

    el.appendChild(img)
    return el
}

function createBorderComponent(option, className) {
    const el = document.createElement('div')
    
    const colors = option?.colors || []
    const color1 = colors[0] || '#6586ec'
    const color2 = colors[1] || '#2cf7fe'
    
    el.style.cssText = `
        position: absolute !important;
        width: 100% !important;
        height: 100% !important;
        border: 2px solid ${color2} !important;
        border-radius: 8px !important;
        background: rgba(101, 134, 236, 0.1) !important;
        box-shadow: 0 0 15px ${color2}, inset 0 0 15px ${color2} !important;
        overflow: hidden !important;
        pointer-events: none !important;
    `
    
    return el
}

function normalizeColor(color, fallback) {
    if (!color) return fallback
    return color
}

function applyFontStyle(el, style, fallbackSize = 14) {
    const fontStyle = style || {}
    el.style.fontSize = (fontStyle.fontSize || fallbackSize) + 'px'
    el.style.color = normalizeColor(fontStyle.fontColor, '#ffffff')
    el.style.fontWeight = fontStyle.fontWeight || 'normal'
    el.style.fontStyle = fontStyle.fontStyle || 'normal'
    el.style.fontFamily = fontStyle.fontFamily && fontStyle.fontFamily !== 'inherit'
        ? fontStyle.fontFamily
        : 'Microsoft YaHei, Arial, sans-serif'
}

function applyCustomStyle(el, customStyle) {
    const value = customStyle && customStyle.stringValue
    if (!value) return

    try {
        const styleObject = JSON.parse(value)
        Object.entries(styleObject).forEach(([key, val]) => {
            if (key === 'background-image' && String(val).includes('table-bg.png')) {
                return
            }
            el.style.setProperty(key, val)
        })
    } catch (error) {
        handleError(error, 'applyCustomStyle')
    }
}

function createTableCell(text, width, textAlign, fontStyle, fallbackSize) {
    const cell = document.createElement('div')
    cell.style.boxSizing = 'border-box'
    cell.style.display = 'flex'
    cell.style.alignItems = 'center'
    cell.style.justifyContent = textAlign === 'left' || textAlign === 'start'
        ? 'flex-start'
        : textAlign === 'right' || textAlign === 'end'
            ? 'flex-end'
            : 'center'
    cell.style.textAlign = textAlign || 'center'
    cell.style.whiteSpace = 'nowrap'
    cell.style.overflow = 'hidden'
    cell.style.textOverflow = 'ellipsis'
    cell.style.paddingLeft = '4px'
    cell.style.paddingRight = '4px'
    cell.style.minWidth = '0'

    if (width) {
        cell.style.flex = `0 0 ${width}px`
        cell.style.width = width + 'px'
    } else {
        cell.style.flex = '1 1 0'
    }

    applyFontStyle(cell, fontStyle, fallbackSize)
    cell.innerText = text == null ? '' : String(text)
    return cell
}

function createTableComponent(option, attr = {}) {
    const el = document.createElement('div')
    const rowConfig = option.rowConfig || {}
    const columnConfig = option.columnConfig || {}
    const tableConfig = option.tableConfig || {}
    const columns = columnConfig.columns && columnConfig.columns.length
        ? columnConfig.columns
        : Object.keys((option.dataset || [])[0] || {}).map(key => ({
            title: key,
            mapping: key,
            columnTextAlign: 'center'
        }))
    const dataset = option.dataset || []
    const headerHeight = rowConfig.headerRowNumber || 40
    const visibleRowCount = rowConfig.count || dataset.length || 1
    const showIndexColumn = columnConfig.indexShow && columnConfig.indexTitle !== ''
    const rowHeight = rowConfig.useHeight
        ? (rowConfig.height || 40)
        : Math.max(1, Math.floor(((attr.h || 100) - (rowConfig.headerShow === false ? 0 : headerHeight)) / visibleRowCount))
    const rowGap = rowConfig.flexGap || 0
    const tableBackgrounds = tableConfig.backgroundColors || []

    el.className = 'table-scroll-board-runtime'
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.overflow = 'hidden'
    el.style.background = option.backgroundColor || 'transparent'
    el.style.borderRadius = (rowConfig.borderRadius || 0) + 'px'
    el.style.border = option.borderWidth ? `${option.borderWidth}px solid ${option.borderColor || 'rgba(44, 247, 254, 0.55)'}` : 'none'
    el.style.boxShadow = option.boxShadow || 'none'
    el.style.fontFamily = 'Microsoft YaHei, Arial, sans-serif'

    if (rowConfig.headerShow !== false) {
        const headerRow = document.createElement('div')
        headerRow.style.display = 'flex'
        headerRow.style.alignItems = 'center'
        headerRow.style.width = '100%'
        headerRow.style.height = headerHeight + 'px'
        headerRow.style.background = normalizeColor(rowConfig.headerBackgroundColor, 'rgba(30, 60, 100, 0.8)')
        headerRow.style.borderRadius = (rowConfig.headerBorderRadius || 0) + 'px'
        headerRow.style.overflow = 'hidden'

        if (showIndexColumn) {
            headerRow.appendChild(createTableCell(
                columnConfig.indexTitle || '',
                columnConfig.useIndexWidth ? columnConfig.indexWidth : null,
                columnConfig.indexTextAlign || rowConfig.headerTextAlign || 'center',
                {
                    fontSize: rowConfig.headerFontSize,
                    fontColor: rowConfig.headerFontColor,
                    fontWeight: rowConfig.headerFontWeight,
                    fontFamily: rowConfig.headerFontFamily,
                    fontStyle: rowConfig.headerFontStyle
                },
                rowConfig.headerFontSize || 14
            ))
        }

        columns.forEach(col => {
            headerRow.appendChild(createTableCell(
                col.title !== undefined ? col.title : (col.mapping || ''),
                columnConfig.useWidth ? col.width : null,
                rowConfig.useHeaderTextAlign ? rowConfig.headerTextAlign : (col.columnTextAlign || rowConfig.headerTextAlign || 'center'),
                {
                    fontSize: rowConfig.headerFontSize,
                    fontColor: rowConfig.headerFontColor,
                    fontWeight: rowConfig.headerFontWeight,
                    fontFamily: rowConfig.headerFontFamily,
                    fontStyle: rowConfig.headerFontStyle
                },
                rowConfig.headerFontSize || 14
            ))
        })

        el.appendChild(headerRow)
    }

    const scrollContainer = document.createElement('div')
    scrollContainer.style.width = '100%'
    scrollContainer.style.height = rowConfig.headerShow === false ? '100%' : `calc(100% - ${headerHeight}px)`
    scrollContainer.style.overflow = 'hidden'

    const scrollContent = document.createElement('div')
    scrollContent.className = 'table-scroll-content-runtime'
    scrollContent.style.width = '100%'
    scrollContent.style.display = 'flex'
    scrollContent.style.flexDirection = 'column'
    scrollContent.style.gap = rowGap + 'px'

    const renderRows = dataset.length > visibleRowCount ? dataset.concat(dataset.slice(0, visibleRowCount)) : dataset

    renderRows.forEach((row, rowIndex) => {
        const rowEl = document.createElement('div')
        rowEl.style.display = 'flex'
        rowEl.style.alignItems = 'center'
        rowEl.style.width = '100%'
        rowEl.style.height = rowHeight + 'px'
        rowEl.style.minHeight = rowHeight + 'px'
        rowEl.style.marginTop = (rowConfig.topSpacing || 0) + 'px'
        rowEl.style.marginBottom = (rowConfig.bottomSpacing || 0) + 'px'
        rowEl.style.borderRadius = (rowConfig.borderRadius || 0) + 'px'
        rowEl.style.overflow = 'hidden'

        if (tableBackgrounds.length) {
            rowEl.style.background = tableBackgrounds[rowIndex % tableBackgrounds.length]
        }
        applyCustomStyle(rowEl, rowConfig.customStyle)

        if (showIndexColumn) {
            rowEl.appendChild(createTableCell(
                (columnConfig.indexStart || 1) + rowIndex,
                columnConfig.useIndexWidth ? columnConfig.indexWidth : null,
                columnConfig.indexTextAlign || 'center',
                columnConfig.indexFontStyle || {
                    fontSize: rowConfig.fontSize,
                    fontColor: rowConfig.fontColor,
                    fontWeight: rowConfig.fontWeight,
                    fontFamily: rowConfig.fontFamily,
                    fontStyle: rowConfig.fontStyle
                },
                rowConfig.fontSize || 14
            ))
        }

        columns.forEach(col => {
            const mapping = col.mapping || col.dataset
            const value = `${col.prefix || ''}${row[mapping] ?? ''}${col.suffix || ''}`
            rowEl.appendChild(createTableCell(
                value,
                columnConfig.useWidth ? col.width : null,
                col.columnTextAlign || 'center',
                {
                    fontSize: rowConfig.fontSize,
                    fontColor: rowConfig.fontColor,
                    fontWeight: rowConfig.fontWeight,
                    fontFamily: rowConfig.fontFamily,
                    fontStyle: rowConfig.fontStyle
                },
                rowConfig.fontSize || 14
            ))
        })

        scrollContent.appendChild(rowEl)
    })

    if (dataset.length > visibleRowCount && tableConfig.scrollType !== 'none') {
        const distance = dataset.length * (rowHeight + rowGap)
        const interval = tableConfig.scrollInterval || 3
        const duration = Math.max(6, dataset.length * interval)
        const animationName = `table-scroll-${Math.random().toString(36).slice(2)}`
        const style = document.createElement('style')
        style.textContent = `
            @keyframes ${animationName} {
                0% { transform: translateY(0); }
                100% { transform: translateY(-${distance}px); }
            }
        `
        document.head.appendChild(style)
        scrollContent.style.animation = `${animationName} ${duration}s linear infinite`
        el.dataset.hoverPause = tableConfig.hoverPause !== false ? 'true' : 'false'
        ensureTableHoverController()

        if (tableConfig.hoverPause !== false) {
            el.addEventListener('mouseenter', () => {
                scrollContent.style.animationPlayState = 'paused'
            })
            el.addEventListener('mouseleave', () => {
                scrollContent.style.animationPlayState = 'running'
            })
        }
    }

    scrollContainer.appendChild(scrollContent)
    el.appendChild(scrollContainer)
    return el
}

function ensureTableHoverController() {
    if (window.__tableHoverControllerReady) return
    window.__tableHoverControllerReady = true

    document.addEventListener('mousemove', event => {
        document.querySelectorAll('.table-scroll-board-runtime').forEach(table => {
            const content = table.querySelector('.table-scroll-content-runtime')
            if (!content || table.dataset.hoverPause !== 'true') return

            const rect = table.getBoundingClientRect()
            const inside = event.clientX >= rect.left
                && event.clientX <= rect.right
                && event.clientY >= rect.top
                && event.clientY <= rect.bottom
            content.style.animationPlayState = inside ? 'paused' : 'running'
        })
    })
}

function createFusionPieComponent(component) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.position = 'absolute'

    const chartDom = document.createElement('div')
    chartDom.style.width = '100%'
    chartDom.style.height = '100%'
    el.appendChild(chartDom)

    const option = component.option || {}
    const source = option.dataset?.dataSource || {}
    const chart = source.chart || {}
    const data = source.data || []

    const echartsOption = {
        color: ['#00C9FF', '#65E572', '#F5D000', '#FF8A45', '#FF4D4F'],
        backgroundColor: 'transparent',
        title: {
            text: chart.caption || '',
            subtext: chart.subcaption || '',
            left: 'center',
            top: 8,
            textStyle: {
                color: chart.captionFontColor || '#ffffff',
                fontSize: Number(chart.captionFontSize) || 28,
                fontWeight: 'normal'
            },
            subtextStyle: {
                color: chart.subcaptionFontColor || '#ffffff',
                fontSize: Math.max(14, Math.floor((Number(chart.subcaptionFontSize) || 24) * 0.65))
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            textStyle: {
                color: chart.legendItemFontColor || '#ffffff',
                fontSize: Number(chart.legendItemFontSize) || 18
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['0%', '58%'],
                center: ['42%', '58%'],
                data: data.map(item => ({
                    name: item.label,
                    value: Number(item.value) || 0
                })),
                label: {
                    color: chart.labelFontColor || '#ffffff',
                    fontSize: Number(chart.valueFontSize) || 18,
                    formatter: '{b}\n{d}%'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.55)'
                    }
                }
            }
        ]
    }

    setTimeout(() => {
        const pie = echarts.init(chartDom)
        pie.setOption(echartsOption)
        window.addEventListener('resize', () => pie.resize())
    }, 0)

    return el
}

function createBarrageComponent(option) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.overflow = 'hidden'
    el.style.position = 'relative'
    el.style.pointerEvents = 'none'

    const sourceText = option?.dataset?.text || ''
    const messages = sourceText && sourceText !== '我是一段文本数据'
        ? [sourceText]
        : [
            '服务很贴心，提醒很及时',
            '希望增加更多康复活动',
            '饭菜清淡，适合老人',
            '护理人员响应很快',
            '视频通话很方便',
            '用药提醒很实用'
        ]
    const colors = ['#ffffff', '#67e8f9', '#93c5fd', '#fde68a', '#86efac']
    const laneCount = 5
    const laneGap = 64
    const laneStart = 18

    messages.concat(messages).forEach((message, index) => {
        const item = document.createElement('div')
        const lane = index % laneCount
        const round = Math.floor(index / laneCount)
        const top = laneStart + lane * laneGap
        const duration = 18 + (lane % 3) * 2
        const delay = round * 23 + lane * 2.2

        item.innerText = message
        item.style.position = 'absolute'
        item.style.left = '100%'
        item.style.top = top + 'px'
        item.style.whiteSpace = 'nowrap'
        item.style.padding = '8px 18px'
        item.style.borderRadius = '21px'
        item.style.background = 'rgba(8, 30, 70, 0.68)'
        item.style.border = '1px solid rgba(103, 232, 249, 0.55)'
        item.style.boxShadow = '0 0 14px rgba(3, 169, 244, 0.35)'
        item.style.color = colors[index % colors.length]
        item.style.fontSize = '20px'
        item.style.fontFamily = 'Microsoft YaHei, Arial, sans-serif'
        item.style.animation = `barrage-move ${duration}s linear ${delay}s infinite`
        el.appendChild(item)
    })

    return el
}

function createFlipperComponent(option) {
    const el = document.createElement('div')
    el.style.display = 'flex'
    el.style.gap = (option.flipperGap || 10) + 'px'
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'

    const num = option.dataset || 0
    const length = option.flipperLength || String(num).length
    const digits = String(num).padStart(length, '0')

    const width = option.flipperWidth || 30
    const height = option.flipperHeight || 50
    const bgColor = option.flipperBgColor || '#16293E'
    const textColor = option.flipperTextColor || '#4A9EF8'
    const radius = option.flipperRadius || 5

    for (let i = 0; i < digits.length; i++) {
        const digit = document.createElement('div')
        digit.style.width = width + 'px'
        digit.style.height = height + 'px'
        digit.style.background = bgColor
        digit.style.color = textColor
        digit.style.borderRadius = radius + 'px'
        digit.style.display = 'flex'
        digit.style.alignItems = 'center'
        digit.style.justifyContent = 'center'
        digit.style.fontWeight = 'bold'
        digit.style.fontSize = (option.flipperTextFontSize || 30) + 'px'
        digit.style.fontFamily = 'Arial, sans-serif'
        digit.innerText = digits[i]
        el.appendChild(digit)
    }

    return el
}

function createBarChartComponent(component) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.position = 'absolute'

    const chartDom = document.createElement('div')
    chartDom.style.width = '100%'
    chartDom.style.height = '100%'
    el.appendChild(chartDom)

    let option = component.option || {}
    const attr = component.attr || {}
    
    const chartKey = attr.chartKey
    if (chartKey && typeof getChartConfig === 'function') {
        const externalConfig = getChartConfig(currentPageId, chartKey)
        if (externalConfig) {
            option = externalConfig.option || option
        }
    }

    let echartsOption

    if (option.dataset && option.dataset.values) {
        echartsOption = convertVChartBarToECharts(option)
    } else {
        echartsOption = {
            legend: option.legend || option.legends || {},
            xAxis: option.xAxis || {},
            yAxis: option.yAxis || {},
            grid: option.grid || {},
            tooltip: option.tooltip || {},
            dataset: option.dataset || {},
            series: option.series || [],
            backgroundColor: option.backgroundColor || 'transparent'
        }
    }

    setTimeout(() => {
        const chart = echarts.init(chartDom)
        chart.setOption(echartsOption)
        window.addEventListener('resize', () => chart.resize())
    }, 0)

    return el
}

function convertVChartBarToECharts(option) {
    const dataset = option.dataset || {}
    const values = dataset.values || []
    const palette = ['#00E5FF', '#7CFF6B', '#FFE45C', '#FB923C', '#A78BFA', '#F472B6', '#60A5FA', '#34D399']

    let xField = Array.isArray(option.xField) ? option.xField[0] : (option.xField || 'x')
    let yField = Array.isArray(option.yField) ? option.yField[0] : (option.yField || 'y')
    let seriesField = option.seriesField || 'series'

    if (values.length > 0) {
        if (!option.xField && values[0].type !== undefined) xField = 'type'
        if (!option.yField && values[0].value !== undefined) yField = 'value'
        if (!option.seriesField) {
            if (values[0].series !== undefined) seriesField = 'series'
            else if (values[0].year !== undefined) seriesField = 'year'
        }
    }

    const seriesMap = {}
    values.forEach(item => {
        const seriesName = item[seriesField] || 'data'
        if (!seriesMap[seriesName]) {
            seriesMap[seriesName] = []
        }
        seriesMap[seriesName].push(item)
    })

    const xAxisData = [...new Set(values.map(item => item[xField]))]

    const series = Object.keys(seriesMap).map(name => {
        const seriesItems = seriesMap[name]
        const dataByAxis = new Map(seriesItems.map(item => [item[xField], item[yField]]))
        const data = xAxisData.map(axisValue => dataByAxis.get(axisValue) ?? 0)

        let barWidth = 20
        if (option.bar && option.bar.style && option.bar.style.width) {
            barWidth = option.bar.style.width
        }
        barWidth = option.seriesField === 'type'
            ? Math.min(Math.max(Number(barWidth) || 22, 44), 50)
            : Math.min(Number(barWidth) || 20, option.stack ? 38 : 28)

        const labelConfig = { show: false }

        return {
            name: name,
            type: 'bar',
            data: data,
            barWidth: barWidth,
            stack: option.stack ? 'total' : undefined,
            label: labelConfig,
            itemStyle: {
                borderRadius: option.stack ? [5, 5, 0, 0] : [5, 5, 0, 0],
                shadowBlur: 8,
                shadowColor: 'rgba(0, 229, 255, 0.16)'
            }
        }
    })

    let xAxisConfig = {
        type: 'category',
        data: xAxisData,
        boundaryGap: true
    }
    if (option.xAxis) {
        xAxisConfig = {
            ...xAxisConfig,
            show: option.xAxis.visible !== false,
            name: option.xAxis.title && option.xAxis.title.text ? option.xAxis.title.text : '',
            nameTextStyle: option.xAxis.title && option.xAxis.title.style ? option.xAxis.title.style : {},
            axisLabel: option.xAxis.label ? {
                show: option.xAxis.label.visible !== false,
                ...option.xAxis.label.style,
                interval: 0,
                rotate: 0,
                color: option.xAxis.label.style?.fill || '#B9B8CE',
                fontSize: option.seriesField === 'type' ? 20 : Math.min(Number(option.xAxis.label.style?.fontSize) || 13, 16),
                fontFamily: option.xAxis.label.style?.fontFamily || 'Microsoft YaHei',
                fontWeight: 600,
                overflow: 'truncate',
                width: option.seriesField === 'type' ? 116 : 96
            } : {},
            axisLine: option.xAxis.domainLine ? {
                show: option.xAxis.domainLine.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.45)', ...(option.xAxis.domainLine.style || {}) }
            } : {},
            splitLine: option.xAxis.grid ? {
                show: option.xAxis.grid.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.16)', type: 'dashed', ...(option.xAxis.grid.style || {}) }
            } : {}
        }
    }

    let yAxisConfig = {
        type: 'value'
    }
    if (option.yAxis) {
        yAxisConfig = {
            ...yAxisConfig,
            show: option.yAxis.visible !== false,
            name: option.yAxis.title && option.yAxis.title.text ? option.yAxis.title.text : '',
            nameTextStyle: option.yAxis.title && option.yAxis.title.style ? option.yAxis.title.style : {},
            axisLabel: option.yAxis.label ? {
                show: option.yAxis.label.visible !== false,
                color: option.yAxis.label.style?.fill || '#B9B8CE',
                fontSize: option.seriesField === 'type' ? 19 : Math.min(Number(option.yAxis.label.style?.fontSize) || 13, 16),
                fontFamily: option.yAxis.label.style?.fontFamily || 'Microsoft YaHei',
                fontWeight: 600
            } : {},
            axisLine: option.yAxis.domainLine ? {
                show: option.yAxis.domainLine.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.38)', ...(option.yAxis.domainLine.style || {}) }
            } : {},
            splitLine: option.yAxis.grid ? {
                show: option.yAxis.grid.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.18)', type: 'dashed', ...(option.yAxis.grid.style || {}) }
            } : {}
        }
    }

    return {
        color: palette,
        legend: {
            show: true,
            top: 4,
            left: 'center',
            itemWidth: 13,
            itemHeight: 9,
            itemGap: 12,
            textStyle: {
                color: '#EAF7FFFF',
                fontSize: option.seriesField === 'type' ? 16 : 14,
                fontWeight: 'bold'
            },
            type: 'scroll'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: 'rgba(8, 28, 48, 0.96)',
            borderColor: '#2cf7fe',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Microsoft YaHei'
            }
        },
        xAxis: xAxisConfig,
        yAxis: yAxisConfig,
        grid: {
            left: '9%',
            right: '6%',
            bottom: option.seriesField === 'type' ? '14%' : '20%',
            top: '22%',
            containLabel: true
        },
        series: series,
        backgroundColor: option.background || 'transparent'
    }
}

function createLineChartComponent(component) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.position = 'absolute'

    const chartDom = document.createElement('div')
    chartDom.style.width = '100%'
    chartDom.style.height = '100%'
    el.appendChild(chartDom)

    let option = component.option || {}
    const attr = component.attr || {}
    
    const chartKey = attr.chartKey
    if (chartKey && typeof getChartConfig === 'function') {
        const externalConfig = getChartConfig(currentPageId, chartKey)
        if (externalConfig) {
            option = externalConfig.option || option
        }
    }

    let echartsOption

    if (option.dataset && option.dataset.values) {
        echartsOption = convertVChartToECharts(option)
    } else {
        echartsOption = {
            legend: option.legend || option.legends || {},
            xAxis: option.xAxis || {},
            yAxis: option.yAxis || {},
            grid: option.grid || {},
            tooltip: option.tooltip || {},
            dataset: option.dataset || {},
            series: option.series || [],
            backgroundColor: option.backgroundColor || 'transparent'
        }
    }

    setTimeout(() => {
        const chart = echarts.init(chartDom)
        chart.setOption(echartsOption)
        window.addEventListener('resize', () => chart.resize())
    }, 0)

    return el
}

function convertVChartToECharts(option) {
    const dataset = option.dataset || {}
    const values = dataset.values || []

    const xField = option.xField || 'x'
    const yField = option.yField || 'y'
    const seriesField = option.seriesField || 'series'

    const seriesMap = {}
    values.forEach(item => {
        const seriesName = item[seriesField] || 'data'
        if (!seriesMap[seriesName]) {
            seriesMap[seriesName] = []
        }
        seriesMap[seriesName].push(item)
    })

    const series = Object.keys(seriesMap).map(name => {
        const data = seriesMap[name].map(item => item[yField])

        let lineStyle = { width: 2, color: '#F5D000' }
        if (option.line && option.line.style) {
            if (option.line.style.lineWidth) lineStyle.width = option.line.style.lineWidth
            if (option.line.style.lineCap) lineStyle.lineCap = option.line.style.lineCap
        }
        lineStyle.width = Math.min(Number(lineStyle.width) || 2, 5)
        lineStyle.color = lineStyle.color || '#FFE45C'

        let labelConfig = { show: false }
        if (option.label && option.label.visible !== false) {
            labelConfig = {
                show: true,
                position: option.label.position || 'top',
                offset: option.label.offset || 5,
                color: option.label.style?.fill || '#F5D000',
                fontSize: Math.min(Number(option.label.style?.fontSize) || 16, 17),
                fontFamily: option.label.style?.fontFamily || 'Microsoft YaHei',
                fontWeight: option.label.style?.fontWeight || 'bold'
            }
        }

        return {
            name: name,
            type: 'line',
            data: data,
            smooth: option.line && option.line.style && option.line.style.curveType === 'linear' ? false : 0.35,
            lineStyle: lineStyle,
            label: labelConfig,
            symbol: option.point && option.point.visible !== false ? 'circle' : 'none',
            symbolSize: Math.min(option.point && option.point.style && option.point.style.size ? option.point.style.size : 6, 9),
            itemStyle: {
                color: '#FFE45C',
                borderColor: option.point?.style?.stroke || '#ffffff',
                borderWidth: option.point?.style?.lineWidth || 2
            },
            areaStyle: {
                color: 'rgba(255, 228, 92, 0.13)'
            }
        }
    })

    const xAxisData = [...new Set(values.map(item => item[xField]))]

    let xAxisConfig = {
        type: 'category',
        data: xAxisData,
        boundaryGap: false
    }
    if (option.xAxis) {
        xAxisConfig = {
            ...xAxisConfig,
            show: option.xAxis.visible !== false,
            name: option.xAxis.title?.style?.text || option.xAxis.title?.text || '',
            nameLocation: 'end',
            nameTextStyle: {
                color: option.xAxis.title?.style?.fill || '#B9B8CE',
                fontSize: option.xAxis.title?.style?.fontSize || 12,
                fontFamily: option.xAxis.title?.style?.fontFamily || 'SimSun'
            },
            axisLabel: option.xAxis.label ? {
                show: option.xAxis.label.visible !== false,
                color: option.xAxis.label.style?.fill || '#B9B8CE',
                fontSize: Math.min(Number(option.xAxis.label.style?.fontSize) || 13, 15),
                fontFamily: option.xAxis.label.style?.fontFamily || 'Microsoft YaHei',
                fontWeight: 600
            } : {},
            axisLine: option.xAxis.domainLine ? {
                show: option.xAxis.domainLine.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.42)', ...(option.xAxis.domainLine.style || {}) }
            } : {},
            splitLine: option.xAxis.grid ? {
                show: option.xAxis.grid.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.12)', type: 'dashed', ...(option.xAxis.grid.style || {}) }
            } : {}
        }
    }

    let yAxisConfig = {
        type: 'value'
    }
    if (option.yAxis) {
        yAxisConfig = {
            ...yAxisConfig,
            show: option.yAxis.visible !== false,
            name: option.yAxis.unit?.text || option.yAxis.title?.style?.text || option.yAxis.title?.text || '',
            nameTextStyle: {
                color: option.yAxis.unit?.style?.fill || option.yAxis.title?.style?.fill || '#B9B8CE',
                fontSize: option.yAxis.unit?.style?.fontSize || option.yAxis.title?.style?.fontSize || 12,
                fontFamily: option.yAxis.unit?.style?.fontFamily || option.yAxis.title?.style?.fontFamily || 'SimSun'
            },
            axisLabel: option.yAxis.label ? {
                show: option.yAxis.label.visible !== false,
                color: option.yAxis.label.style?.fill || '#B9B8CE',
                fontSize: Math.min(Number(option.yAxis.label.style?.fontSize) || 13, 15),
                fontFamily: option.yAxis.label.style?.fontFamily || 'Microsoft YaHei',
                fontWeight: 600
            } : {},
            axisLine: option.yAxis.domainLine ? {
                show: option.yAxis.domainLine.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.38)', ...(option.yAxis.domainLine.style || {}) }
            } : {},
            splitLine: option.yAxis.grid ? {
                show: option.yAxis.grid.visible !== false,
                lineStyle: { color: 'rgba(120, 220, 255, 0.16)', type: 'dashed', ...(option.yAxis.grid.style || {}) }
            } : {}
        }
    }

    return {
        legend: { show: false },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(8, 28, 48, 0.96)',
            borderColor: '#FFE45C',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Microsoft YaHei'
            }
        },
        xAxis: xAxisConfig,
        yAxis: yAxisConfig,
        grid: {
            left: '10%',
            right: '6%',
            bottom: '18%',
            top: '16%',
            containLabel: true
        },
        series: series,
        backgroundColor: option.background || 'transparent'
    }
}

function createWordCloudComponent(option) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.position = 'relative'
    el.style.overflow = 'hidden'

    let data = [...(option.dataset?.values || option.dataset || [])]
    
    data.sort((a, b) => b.value - a.value)
    
    const colors = ['#2cf7fe', '#6586ec', '#4A9EF8', '#03F433FF', '#27979A', '#ff9500', '#e64d85', '#4169e1', '#32cd32', '#ff4500']

    const minValue = Math.min(...data.map(d => d.value))
    const maxValue = Math.max(...data.map(d => d.value))

    const positions = [
        {x: 50, y: 60},
        {x: 35, y: 52}, {x: 65, y: 52},
        {x: 32, y: 68}, {x: 68, y: 68},
        {x: 50, y: 45}, {x: 50, y: 75},
        {x: 20, y: 60}, {x: 80, y: 60},
        {x: 38, y: 46}, {x: 62, y: 46},
        {x: 38, y: 74}, {x: 62, y: 74},
        {x: 15, y: 52}, {x: 85, y: 52},
        {x: 15, y: 68}, {x: 85, y: 68},
        {x: 45, y: 38}, {x: 55, y: 82},
        {x: 25, y: 60}, {x: 75, y: 60}
    ]

    data.forEach((item, index) => {
        const word = document.createElement('div')
        word.innerText = item.name
        
        const normalizedValue = (item.value - minValue) / (maxValue - minValue)
        const fontSize = normalizedValue * 24 + 16

        const pos = positions[index]
        const color = colors[index % colors.length]

        word.style.position = 'absolute'
        word.style.left = pos.x + '%'
        word.style.top = pos.y + '%'
        word.style.color = color
        word.style.fontSize = fontSize + 'px'
        word.style.fontWeight = 'bold'
        word.style.fontFamily = 'Microsoft YaHei, SimHei, Arial, sans-serif'
        word.style.textShadow = 'none'
        word.style.whiteSpace = 'nowrap'
        word.style.pointerEvents = 'none'
        word.style.transform = 'translate(-50%, -50%)'
        word.style.opacity = '1'

        el.appendChild(word)
    })

    return el
}

function createPieChartComponent(component) {
    const el = document.createElement('div')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.position = 'absolute'

    const chartDom = document.createElement('div')
    chartDom.style.width = '100%'
    chartDom.style.height = '100%'
    el.appendChild(chartDom)

    let option = component.option || {}
    const attr = component.attr || {}
    
    const chartKey = attr.chartKey
    console.log('[PieChart] chartKey:', chartKey, 'currentPageId:', currentPageId)
    if (chartKey && typeof getChartConfig === 'function') {
        const externalConfig = getChartConfig(currentPageId, chartKey)
        console.log('[PieChart] externalConfig:', externalConfig)
        if (externalConfig) {
            option = externalConfig.option || option
            console.log('[PieChart] merged option:', option)
        }
    }

    const echartsOption = {
        color: option.color || ['#00C9FF', '#92FE9D', '#F5D000FF', '#FF6B6B', '#9B59B6', '#3498DB', '#E74C3C', '#34495E'],
        title: option.title || {},
        tooltip: option.tooltip || {},
        legend: option.legend || {},
        series: (option.series || []).map(series => ({
            ...series,
            label: series.label || {},
            labelLine: series.labelLine || {}
        })),
        backgroundColor: option.backgroundColor || 'transparent',
        animation: option.animation !== false,
        animationDuration: option.animationDuration || 1500,
        animationEasing: option.animationEasing || 'elasticOut'
    }
    console.log('[PieChart] echartsOption:', echartsOption)

    setTimeout(() => {
        console.log('[PieChart] initializing chart on:', chartDom)
        const chart = echarts.init(chartDom)
        chart.setOption(echartsOption)
        window.addEventListener('resize', () => chart.resize())
    }, 100)

    return el
}

function createIconComponent(option) {
    const el = document.createElement('div')
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'
    el.style.width = '100%'
    el.style.height = '100%'

    const dataset = option.dataset || 'uim:chart'
    const size = option.size || 64
    const color = option.color || '#03F433FF'

    if (dataset === 'uim:chart') {
        el.innerHTML = `<i class="ri-bar-chart-fill" style="font-size: ${size}px; color: ${color};"></i>`
        return el
    }

    if (dataset === 'uim:airplay') {
        el.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H16L20 8V18C20 19.1 19.1 20 18 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="${color}" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
                <circle cx="12" cy="13" r="3" stroke="${color}" stroke-width="1.5" fill="none"/>
                <circle cx="12" cy="13" r="1" fill="${color}"/>
                <path d="M8 4V2M12 4V1M16 4V2" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M4 8H20" stroke="${color}" stroke-width="1" opacity="0.5"/>
            </svg>
        `
        return el
    }

    if (dataset === 'uim:android-alt') {
        el.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="8" width="18" height="12" rx="2" stroke="${color}" stroke-width="1.5" fill="none"/>
                <path d="M7 8V6C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6V8" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="8" cy="13" r="1.5" fill="${color}"/>
                <circle cx="12" cy="13" r="1.5" fill="${color}"/>
                <circle cx="16" cy="13" r="1.5" fill="${color}"/>
                <path d="M8 17H16" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `
        return el
    }

    if (dataset === 'uim:house-user') {
        el.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 3L21 10.5V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V10.5Z" stroke="${color}" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
                <path d="M9 22V14H15V22" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="12" cy="9" r="2" fill="${color}"/>
            </svg>
        `
        return el
    }

    if (dataset === 'line-md:loading-twotone-loop') {
        el.innerHTML = `
            <div style="
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: conic-gradient(#53b4ff 0deg 105deg, #173a7c 105deg 360deg);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: spin 2s linear infinite;
            ">
                <div style="
                    width: ${size * 0.8}px;
                    height: ${size * 0.8}px;
                    border-radius: 50%;
                    background: #030a39;
                "></div>
            </div>
            <style>
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        `
        return el
    }

    if (dataset === 'line-md:downloading-loop') {
        el.innerHTML = `
            <i class="ri-download-cloud-2-line" style="
                font-size: ${size}px;
                color: ${color};
                animation: download-pulse 1.4s ease-in-out infinite;
            "></i>
        `
        return el
    }

    el.innerHTML = ''
    return el
}

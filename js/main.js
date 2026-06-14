function init() {
    renderPage(page1)
    handleResize()
    window.addEventListener('resize', handleResize)
}

function switchPage(page) {
    const app = document.getElementById('app')

    if (page.editCanvasConfig) {
        const config = page.editCanvasConfig
        app.style.width = config.width + 'px'
        app.style.height = config.height + 'px'
        app.style.background = config.background

        if (config.backgroundImage) {
            app.style.backgroundImage = `url(${config.backgroundImage})`
            app.style.backgroundSize = 'cover'
            app.style.backgroundPosition = 'center'
            app.style.backgroundRepeat = 'no-repeat'
        } else {
            app.style.backgroundImage = 'none'
        }
    }

    renderPage(page)
    handleResize()
}

function handleResize() {
    const app = document.getElementById('app')
    if (!app) return

    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight
    
    const designWidth = 1920
    const designHeight = 1080
    
    const scaleX = containerWidth / designWidth
    const scaleY = containerHeight / designHeight
    const scale = Math.min(scaleX, scaleY)

    const scaledWidth = designWidth * scale
    const scaledHeight = designHeight * scale
    
    const offsetX = Math.max(0, (containerWidth - scaledWidth) / 2)
    const offsetY = Math.max(0, (containerHeight - scaledHeight) / 2)

    app.style.transform = `scale(${scale})`
    app.style.transformOrigin = 'top left'
    app.style.position = 'absolute'
    app.style.left = offsetX + 'px'
    app.style.top = offsetY + 'px'

    const charts = document.querySelectorAll('.chart-container')
    charts.forEach(chart => {
        const chartInstance = echarts.getInstanceByDom(chart)
        if (chartInstance) {
            chartInstance.resize()
        }
    })
}

init()
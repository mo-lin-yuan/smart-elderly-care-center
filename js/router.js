const pageMap = {
    id_3vlrxpkmbmy000: page1,
    id_hbqvszwb1cw00: page2,
    id_18hsmgpx7na800: page3,
    id_4clgh7utjei000: page4,
    id_1bik2482o9xc00: page5
}

let isPageSwitching = false

function jumpPageById(pageId) {
    if (isPageSwitching) {
        console.info('页面切换中，请稍候...')
        return
    }

    const page = pageMap[pageId]

    if (!page) {
        console.warn('未找到页面：', pageId)
        return
    }

    isPageSwitching = true
    
    setTimeout(() => {
        switchPage(page)
        setTimeout(() => {
            isPageSwitching = false
        }, 300)
    }, 50)
}
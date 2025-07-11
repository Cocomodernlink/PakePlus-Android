const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

if (location.href.includes('//coco.codemao.cn/editor/')) {
    (function() {
        "use strict";
        var dataTransfer = {
            setData(n, v) {
                this[n] = v;
            },
            getData(n) {
                return this[n];
            }
        };
        
        setInterval(() => {
            document.querySelectorAll(`*[class*="WidgetList_widgetItem"]`).forEach((e) => {
                if (e.cococlick) return;
                e.cococlick = true;
                e.draggable = false;
                e.style.cursor = "pointer";
                
                e.addEventListener("click", function () {
                    var sen = document.querySelector(`*[class*="PreviewArea_main"]`);
                    if (!sen) return;
                    
                    var x = sen.offsetLeft + sen.offsetWidth / 2;
                    var y = sen.offsetTop + sen.offsetHeight / 2;
                    var keys = Object.keys(e);
                    var key = keys.find((e) => e.startsWith("__reactEventHandlers"));
                    
                    if (!e[key]) return;
                    
                    
                    e[key].onDragStart({
                        target: e,
                        dataTransfer,
                        persist: () => true,
                        clientX: x,
                        clientY: y,
                        x: x + 100,
                        y
                    });
                    
                    var stage = document.querySelector(`*[class*="PreviewArea_stage"]`);
                    if (stage && stage[key]) {
                        stage[key].onDragOver({ preventDefault() {} });
                        stage[key].onDrop({
                            dataTransfer,
                            persist: () => true,
                            clientX: x + 142,
                            clientY: y - 3,
                            x: x + 100,
                            y
                        });
                    }
                    
                   
                    if (e.dataset.widgetType == "BRUSH_WIDGET" || e.dataset.widgetType == "ACTOR_WIDGET") {
                        document.querySelectorAll(`*[data-widget-type="CANVAS_WIDGET"][id*="CANVAS_WIDGET"]`).forEach((en, _, array) => {
                            function click(ew) {
                                if (!en[key]) return;
                                
                                en[key].onDragEnter({
                                    dataTransfer,
                                    persist: () => true,
                                    stopPropagation: () => true,
                                });
                                
                                if (stage && stage[key]) {
                                    stage[key].onDragOver({ preventDefault() {} });
                                }
                                
                                en[key].onDrop({
                                    dataTransfer,
                                    persist: () => true,
                                    stopPropagation: () => true,
                                    clientX: ew.clientX,
                                    clientY: ew.clientY,
                                    x: ew.x,
                                    y: ew.y
                                });
                                
                                if (stage && stage[key]) {
                                    stage[key].onDrop({
                                        dataTransfer,
                                        persist: () => true,
                                    });
                                }
                                
                                array.forEach(e => e.removeEventListener("click", e.cococlickfunc, false));
                                if (e[key]) e[key].onDragEnd();
                            }
                            
                            en.cococlickfunc = click;
                            en.addEventListener("click", click, false);
                        });
                    } else {
                        if (e[key]) e[key].onDragEnd();
                    }
                });
            });
        }, 100);
    })();
}
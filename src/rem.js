(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',


        recalc = function () {
           
            window.clientWidth = docEl.clientWidth;
            window.clientHeight = docEl.clientHeight;
            if (!window.clientWidth) return;
            var aspectRatio = window.clientWidth / window.clientHeight;
            // if (aspectRatio > 1580 / 1080) {
            //     docEl.style.fontSize = 100 * (window.clientHeight / 1080) + 'px';
            //     window.base = 100 * (window.clientHeight / 1080);
            // } else {
            //     docEl.style.fontSize = 100 * ((window.clientWidth-340) / 1920) + 'px';
            //     window.base = 100 * ((window.clientWidth-340) / 1920);
            //     // 判断是否为移动设备，提示旋转屏幕
            // }

            if(window.location.href.indexOf('edit')!=-1){
                docEl.style.fontSize = 100 * ((window.clientWidth-340) / 1920) + 'px';
                // window.base = 82 * ((window.clientWidth-340) / 1920);                
            }else{
                // docEl.style.fontSize = 100 * ((window.clientWidth) / 1920) + 'px';
                // window.base = 100 * ((window.clientWidth) / 1920);
                return
            }

            
        };



    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
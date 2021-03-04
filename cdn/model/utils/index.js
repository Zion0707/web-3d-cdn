export const conn = () => {
    console.log('我是utils文件夹里面的函数');
};

/**
 * 监听实际的加载情况
 */
function loadProgress(callback, begin, all) {
    var loadinterval = setInterval(function () {
        if (window._pandaImageLoadArray.length !== 0 && window._pandaImageLoadArray.length !== begin) {
        } else if (window._pandaImageLoadArray.length === 0) {
            setTimeout(function () {
                callback.call(window);
            }, 500);
            clearInterval(loadinterval);
        }
    }, 300);
}

export const loadImages = (pics, callback, len) => {
    len = len || pics.length;
    if (pics.length) {
        var IMG = new Image(),
            picelem = pics.shift();

        if (window._pandaImageLoadArray) {
            window._pandaImageLoadArray = window._pandaImageLoadArray;
        } else {
            window._pandaImageLoadArray = [];
        }
        window._pandaImageLoadArray.push(picelem);
        IMG.src = picelem;
        // 缓存处理
        if (IMG.complete) {
            window._pandaImageLoadArray.shift();
            return loadImages(pics, callback, len);
        } else {
            // 加载处理
            IMG.onload = function () {
                window._pandaImageLoadArray.shift();
                IMG.onload = null; // 解决内存泄漏和GIF图多次触发onload的问题
            };
            // 容错处理 todo 应该如何处理呢?
            // 目前是忽略这个错误，不影响正常使用
            IMG.onerror = function () {
                window._pandaImageLoadArray.shift();
                IMG.onerror = null;
            };
            return loadImages(pics, callback, len);
        }
    }
    if (callback) loadProgress(callback, window._pandaImageLoadArray.length, len);
};

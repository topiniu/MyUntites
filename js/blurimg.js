
// onload-->the dom and resources has been loaded
function _ready(fn){
  if(document.addEventListener){
    document.addEventListener('DOMContentLoaded',function (){
      document.removeEventListener('DOMContentLoaded',arguments.callee,false);
      fn();
    },false);
  }else if(document.attachEvent){
    document.attachEvent('onreadystatechange',function(){
      if(document.readyState === 'complete'){
        document.detachEvent('onreadystatechange',arguments.callee);
        fn();
      }
    })
  }
}
_ready(function () {
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];

    var full = img.getAttribute("data-full");
    if (full === null) {
      continue;
    }
    img.style.filter = "blur(15px)";
    img.style.transition = "all .3s";

    var img_full = document.createElement("img");

    img_full.src = full;

    // 闭包解决this指向问题
    function J(img, full) {
      img_full.onload = function () {
        img.src = full; // 利用缓存机制实现直接替换
        img.style.filter = "blur(0px)";
      }
    };
    J(img, full);
  }
});
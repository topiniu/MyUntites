// onload-->the dom and resources has been loaded
window.onload = function () {
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.style.filter = "blur(15px)";
    img.style.transition = "all .3s";
    var full = img.getAttribute("data-full");

    var img_full = document.createElement("img");

    img_full.src = full;

    // 闭包解决多个img无法加载问题
    function J(img) {
      img_full.onload = function () {
        img.src = full; // 利用缓存机制实现直接替换
        img.style.filter = "blur(0px)";
      }
    };
    J(img);
  }
};

/*
*
* WTF
*
*/

// /*
// * Get the address of full size path and the compressed size path.
// * Then create an img and set some style
// * Then use method showImg to show it.
// */
// function loadImg(img) {
//   console.log(img.style.position);
//   var compressed = img.getAttribute("data-compress");
//   var full = img.getAttribute("data-full");
//   var cls = img.classList;

//   var img_com = document.createElement("img");
//   img_com.src = compressed;
//   img_com.classList = cls;
//   img_com.style.zIndex = 2;

//   showComImg(img, img_com, false);

//   var img_full = document.createElement("img");
//   img_full.src = full;
//   img_full.classList = cls;
//   img_full.style.zIndex = 1;

//   showComImg(img_com, img_full, true);
// }

// /*
// * Init img style to
// * the most important point is set new img position to 'absolute', 
// * in case new img won't be show in somewhere else except in the old one position.
// * When new img is loaded, add it to the document. 
// * The hard point is design animate.
// * 首先，将nwe img设置为transition all 1s，透明度都为0
// * 然后 如果是压缩的图片的话再设置模糊效果。
// * 当new img加载完成后，在old img后面追加new img
// * 使用setTimeout函数避免
// */
// function showComImg(oldImg, newImg, flag) {

//   newImg.style.position = "absolute";
//   newImg.style.transition = "all 1s";
//   newImg.style.opacity = 0;
//   if (!flag) {
//     newImg.style.filter = "blur(15px)";
//   }

//   newImg.onload = function () {
//     oldImg.after(newImg);
//     setTimeout(function () {
//       oldImg.style.opacity = 0;
//       newImg.style.opacity = 1;
//       setTimeout(function () {
//         oldImg.remove();
//       }, 1500);
//     }, 300);
//   }
// }
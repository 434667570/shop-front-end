import {Token} from 'utils/token.js';


App({
   onLaunch: function(){
      var token = new Token();
      token.verify();
   }
//   {
//       "pagePath": "pages/category/category",
//       "text": "分类",
//       "iconPath": "imgs/toolbar/category.png",
//       "selectedIconPath": "imgs/toolbar/category@selected.png"
//    },
   
})

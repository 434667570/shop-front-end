import {Home} from 'home-model.js';

var home = new Home();

Page({

   data: {

   },

   onLoad: function(options) {
      this._loadData();
      wx.showShareMenu({
         withShareTicket: true
      })
   },

   _loadData: function() {
      var id = 1;
      home.getBannerData(id, (res) => {
         console.log(res)
         this.setData({
            'bannerArr': res
         })
      })
      var ids = '1,2,3';
      home.getThemeData(ids, (res) => {
         console.log(res)
         this.setData({
            'themeArr' : res
         })
      })
      home.getRecentProducts((res)=>{
         console.log(res);
         this.setData({
            'recentArr': res
         })
      })



   },
   
   onBannerDetail: function(e){
      var id = e.currentTarget.dataset.id;
      if(id != 0){
         wx.navigateTo({
            url: '/pages/product-detail/product-detail?id=' + id,
         })
      }
      
   },

   onThemeDetail: function(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '/pages/theme/theme?id=' + id
      })
   },

   onProductDetail: function(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '/pages/product-detail/product-detail?id=' + id
      })
   }

   

})
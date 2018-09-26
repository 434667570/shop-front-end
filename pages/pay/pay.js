
Page({

  data: {
     weixin: true,
     weixinImage: "https://www.aocxiaonei.com/wei/public/images/erweima/weixin3.jpg",
  },

  onLoad: function (options) {
     this.setData({
        orderId: options.orderId
     })
  },

  onWeixin: function(e){
     this.setData({
        weixin: !this.data.weixin
     })
  },

   onZhifubao: function (e) {
      this.setData({
         weixin: !this.data.weixin
      })
   },

   preImage: function (e) {
      var src = e.currentTarget.dataset.src;
      wx.previewImage({
         urls: [src]
      })
   }

})
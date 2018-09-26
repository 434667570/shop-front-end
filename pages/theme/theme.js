// import {
//    Theme
// } from 'theme-model.js';
// var theme = new Theme();
// Page({

//    data: {
      
//    },
   
//    onLoad: function(options) {
//       var id = options.id;
//       this.setData({
//          'id': id
//       })
//       this._loadData();
//       wx.showShareMenu({
//          withShareTicket: true
//       })
//    },

//    _loadData: function() {
//       var id = this.data.id;
//       theme.getThemeDetail(id, (res) => {
//          console.log(res);
//          this.setData({
//             'themeDetail': res
//          })
//       })
//    },

//    onProductDetail: function(e) {
//       var id = e.currentTarget.dataset.id;
//       wx.navigateTo({
//          url: '/pages/product-detail/product-detail?id=' + id
//       })
//    }

// })
import {My} from 'my-model.js';
var my = new My();

Page({


   data: {

   },


   onLoad: function(options) {
      
   },

   
   onShow: function () {
      this._loadData();
   },

   _loadData:function(){
      my.getOrderList((res)=>{
         this.setData({
            orderData: res
         })
      })
   },

   onPullDownRefresh() {
      wx.showNavigationBarLoading();
      my.getOrderList((res) => {
         this.setData({
            orderData: res
         })
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
   },

   onToAddress: function(e){
      wx.navigateTo({
         url: '/pages/address/address?source=my'
      })
   },

   onPay: function(e){
      var bookPrice = e.currentTarget.dataset.bookprice;

      wx.navigateTo({
         url: '/pages/pay/pay?bookPrice=' + bookPrice
      })
   },

   onToOrderDetail:function(e){
      var orderId = e.currentTarget.dataset.orderid;

      wx.navigateTo({
         url: '/pages/order/order?source=my&orderId=' + orderId
      })
   },

   connectWe: function(e){
      wx.navigateTo({
         url: '/pages/pay/pay?orderId=0'
      })
   },

   cancelOrder:function(e){
      var id = e.currentTarget.dataset.id;
      var that = this;
      console.log(id)
      wx.showModal({
         title: '提示',
         content: '请点击右上角联系客服取消订单',
         showCancel: false,
         cancelText: '',
         cancelColor: '',
         confirmText: '确定',
         confirmColor: '#AB956D',
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
      })
      // wx.showModal({
      //    title: '提示',
      //    content: '确定取消预定吗?',
      //    success: function (res) {
      //       if (res.confirm) {
      //          my.cancelOrder(id, (res)=>{
      //             console.log(res)
      //             if(res.error_code == 0){
      //                wx.showToast({
      //                   title: '取消成功',
      //                   icon: 'success',
      //                   duration: 1500,
      //                   mask: true
      //                })
      //                my.getOrderList((res) => {
      //                   that.setData({
      //                      orderData: res
      //                   })
      //                })
      //             }
      //          })
      //       } else if (res.cancel) {
      //          console.log('用户点击取消')
      //       }
      //    }
      // })

   }
   

})
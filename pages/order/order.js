import {
   Order
} from 'order-model.js';
import {
   Token
} from '../../utils/token.js';
var token = new Token();
var order = new Order();

Page({


   data: {

   },

   onLoad: function(options) {
      this.setData({
         source: options.source
      })
      if (options.source == 'my' && options.orderId) {
         this._fromMy(options.orderId)
      }
   },

   onShow: function() {
      if (this.data.source == 'cart') {
         this._fromCart();
      }
   },


   _fromCart: function() {
      order.getUserAddress((res) => {
         
            this.setData({
               addressData: res
            })
         }),

         this.setData({
            cartData: order.getAllCart(),
            totalPrice: order.getTotalPrice(),
            bookPrice: (order.getTotalPrice() / 10).toFixed(2)
         })
   },

   _fromMy: function(orderId) {

      order.getOrderDetail(orderId, (res) => {
         console.log(res)
         this.setData({
            orderData: res,
            addressData: {
               name: res.name,
               mobile: res.mobile,
               detail: res.address
            },
            totalPrice: res.total_price,
            bookPrice: (res.total_price/10).toFixed(2)

         })
      })
   },

   onAddAddress: function(e) {
      wx.navigateTo({
         url: '/pages/address/address?source=order'
      })
   },
   
   formSubmit: function(e) {
      var formId = e.detail.formId;
      var totalPrice = this.data.totalPrice;
      var bookPrice = this.data.bookPrice;
      var note = e.detail.value.note;
      console.log(e)
      if (this.data.source == 'cart') {
         var addressData = this.data.addressData;
         var cartData = this.data.cartData;
         if (addressData && cartData) {
            //request到数据库
            order.saveOrder(formId, cartData, addressData, totalPrice, note, (res) => {
               console.log(res)
               if (res.orderId) {
                  //跳转付款页面
                  wx.redirectTo({
                     url: '/pages/pay/pay?orderId=' + res.orderId
                  })
                 
               }
            });


         } else {
            wx.showModal({
               title: '提示',
               content: '请填写收货信息',
               showCancel: false,
               confirmColor: '#AB956D',
            })
         }
      }else{
         wx.navigateTo({
            url: '/pages/pay/pay?bookPrice=' + bookPrice
         })
      }
   },



})
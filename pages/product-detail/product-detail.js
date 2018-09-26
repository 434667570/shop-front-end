// pages/productDetail/product-detail.js
import {
   ProductDetail
} from 'product-detail-model.js';
import {
   Cart
} from '../cart/cart-model.js';

var productDetail = new ProductDetail();
var cart = new Cart();

Page({

   data: {
      countArr: [
         1, 2, 3, 4, 5, 6, 7, 8, 9
      ],
      selectCount: 1
   },


   onLoad: function(options) {
      var id = options.id;
      this.setData({
         'id': id
      })
      this._loadData();
      wx.showShareMenu({
         withShareTicket: true
      })
   },

   _loadData: function() {
      productDetail.getProductDetail(this.data.id, (res) => {
         this.setData({
            productDetail: res,
            cartTotalCounts: cart.getTotalCount(false)
         })
      })


   },

   /**
    * 点击右上角购物车跳转到购物车页面
    */
   onToCart: function(e) {
      wx.switchTab({
         url: '/pages/cart/cart'
      })
   },

   onPickerChange: function(e) {
      var index = e.detail.value;
      this.setData({
         selectCount: this.data.countArr[index]
      })
   },


   onAddCart: function(e) {
      cart.addCart(this.data.productDetail, this.data.selectCount)
   },




   /*添加到购物车*/
   onAddingToCartTap: function(events) {
      if (this.data.productDetail.stock > 0) {
         //防止快速点击
         if (this.data.isFly) {
            return;
         }
         this._flyToCartEffect(events);
         this.onAddCart();
      }

   },

   /*加入购物车动效*/
   _flyToCartEffect: function(events) {
      //获得当前点击的位置，距离可视区域左上角
      var touches = events.touches[0];
      var diff = {
            x: '25px',
            y: 25 - touches.clientY + 'px'
         },
         style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(0)'; //移动距离
      this.setData({
         isFly: true,
         translateStyle: style
      });
      var that = this;
      setTimeout(() => {
         that.setData({
            isFly: false,
            translateStyle: '-webkit-transform: none;', //恢复到最初状态
            isShake: true,
         });
         setTimeout(() => {
            var counts = that.data.cartTotalCounts + that.data.selectCount;
            that.setData({
               isShake: false,
               cartTotalCounts: cart.getTotalCount(false)
            });
         }, 200);
      }, 1000);
   },

})
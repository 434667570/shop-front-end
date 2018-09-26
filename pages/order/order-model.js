import {
   Base
} from '../../utils/base.js';

class Order extends Base{
   /**
    * 获取所有打钩了的购物车数据
    */
   getAllCart() {
      var cartArr = wx.getStorageSync('cart');
      var orderArr = new Array();

      if (!cartArr) {
         cartArr = [];
      }
      
      for(var i = 0; i < cartArr.length; i++){
         if(cartArr[i].status == true ){
            orderArr.push(cartArr[i]);
         }
      }

      this.sortCart(orderArr);

      
      return orderArr;
   }


   //取出购物车商品时按照后放入购物车的的放前面排序
   sortCart(cartArr) {
      for (var i = 0; i < cartArr.length / 2; i++) {
         var temp = cartArr[i];
         cartArr[i] = cartArr[cartArr.length - i - 1];
         cartArr[cartArr.length - i - 1] = temp;
      }

      return cartArr;
   }
   /**
    * 获得全部商品总价
    */
   getTotalPrice(){
      var cartArr = wx.getStorageSync('cart');
      var totalPrice = 0;

      if (!cartArr) {
         cartArr = [];
      }

      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].status == true) {
            totalPrice += cartArr[i].price * cartArr[i].count;
         }
      }

      return totalPrice.toFixed(2);
   }

   getUserAddress(callBack){
      var params = {
         url: 'address',
         sCallBack: function(res){
            callBack(res);
         }
      };
      this.request(params);
   }


   saveOrder(formId, cartData, addressData, totalPrice, note, callBack){
      // console.log()
      var params = {
         url: 'order',
         type: 'POST',
         data: {
            formId: formId,
            cartData: cartData,
            addressData: addressData,
            total_price: totalPrice,
            note: note
         },
         sCallBack: function(res){
            callBack(res)
         },
         eCallBack: function(res){
            callBack(res)
         }
      };
      this.request(params);
   }
   
   getOrderDetail(orderId, callBack){
      var params = {
         url: 'order/' + orderId,
         sCallBack: function(res){
            callBack(res)
         }
      }
      this.request(params)
   }

}

export {Order};
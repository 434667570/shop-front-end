import {
   Base
} from '../../utils/base.js';

class Cart extends Base {

   addCart(item, count) {
      var storageArr = wx.getStorageSync('cart');

      if (!storageArr) {
         storageArr = [];
      }

      var arrIndex = this.isHasProduct(item.id, storageArr);

      if (arrIndex != -1) {
         storageArr[arrIndex].count += count;
         storageArr[arrIndex].status = true;
      } else {
         item.count = count;
         item.status = true;
         storageArr.push(item);
      }

      wx.setStorageSync('cart', storageArr);
   }

   getAllCart() {
      var cartArr = wx.getStorageSync('cart');

      if (!cartArr) {
         cartArr = [];
      }

      this.sortCart(cartArr);

      return cartArr;
   }
   /**
    * 修改商品选中状态
    */
   setCartStatusById(id, status) {
      var cartArr = wx.getStorageSync('cart');
      var isAllSelected = true;

      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].id == id) {
            cartArr[i].status = status;
         }
      }
      //检查是否是全选或者全没选了
      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].status != status) {
            isAllSelected = false;
            break;
         }
      }

      wx.setStorageSync('cart', cartArr);
      return isAllSelected;
   }

   addCountById(id) {
      var cartArr = wx.getStorageSync('cart');

      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].id == id) {
            cartArr[i].count++;
         }
      }
      wx.setStorageSync('cart', cartArr);
   }

   subCountById(id) {
      var cartArr = wx.getStorageSync('cart');

      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].id == id) {
            cartArr[i].count--;
         }
      }
      wx.setStorageSync('cart', cartArr);
   }

   cancelById(id) {
      var cartArr = wx.getStorageSync('cart');

      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].id == id) {
            cartArr.splice(i, 1);
         }
      }
      wx.setStorageSync('cart', cartArr);
   }

   selectAll() {
      var cartArr = wx.getStorageSync('cart');
      var hasNoSelected = false;

      for (var i = 0; i < cartArr.length; i++) {
         if (!cartArr[i].status) {
            hasNoSelected = true;
         }
      }
      for (var i = 0; i < cartArr.length; i++) {
         if (hasNoSelected) {
            cartArr[i].status = true;
         } else {
            cartArr[i].status = false;
         }
      }
      wx.setStorageSync('cart', cartArr);
      return hasNoSelected;
   }

   getTotalPrice() {
      var cartArr = wx.getStorageSync('cart');
      var totalPrice = 0;

      if (!cartArr) {
         cartArr = [];
      }
      for (var i = 0; i < cartArr.length; i++) {
         if (cartArr[i].status) {
            totalPrice = totalPrice + cartArr[i].price * cartArr[i].count
         }
      }
      return totalPrice.toFixed(2);
   }

   getTotalCount(flag = true) {
      var cartArr = wx.getStorageSync('cart');
      var totalCount = 0;

      if (!cartArr) {
         cartArr = [];
      }
      if (flag) {
         for (var i = 0; i < cartArr.length; i++) {
            if (cartArr[i].status) {
               totalCount = totalCount + cartArr[i].count;
            }
         }
      } else {
         for (var i = 0; i < cartArr.length; i++) {
            totalCount = totalCount + cartArr[i].count;
         }
      }

      return totalCount;
   }




   //查找缓存数组中是否有元素的商品id是productId的
   //有则返回元素下标
   isHasProduct(productId, storageArr) {

      for (var i = 0; i < storageArr.length; i++) {
         if (storageArr[i].id == productId) {
            return i;
         }
      }
      return -1;
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
}

export {
   Cart
};
import {Base} from '../../utils/base.js';


class My extends Base{
   
   getOrderList(callBack) {
      var params = {
         url: 'orderList',
         sCallBack: function (res) {
            callBack(res)
         }
      }

      this.request(params);
   }

   cancelOrder(orderId, callBack){
      var params = {
         url: 'order/cancel/' + orderId,
         sCallBack: function (res) {
            callBack(res)
         }
      }

      this.request(params);
   }
}

export {My};
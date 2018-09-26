import {Base} from '../../utils/base.js';

class Address extends Base{

   submitData(info, callBack){
      var params = {
         url: 'address',
         data: {
            name: info.name,
            mobile: info.phone,
            detail: info.address
         },
         type: 'POST',
         sCallBack: function(res){
            callBack(res)
         },
         eCallBack: function(res){
            callBack(res)
         }
      }
      this.request(params);
   }

   getUserAddress(callBack) {
      var params = {
         url: 'address',
         sCallBack: function (res) {
            callBack(res);
         }
      };
      this.request(params);
   }
}

export {Address};
import {Base} from '../../utils/base.js';

class Category extends Base{
   getCategoryList(callBack){
      var params = {
         url: 'category/all',
         sCallBack: function(res){
            callBack(res);
         }
      }
      this.request(params);
   }

   getAllProduct(callBack){
      var params = {
         url: 'product/allProduct',
         sCallBack: function(res){
            callBack(res);
         }
      }
      this.request(params);
   }

   
}

export {Category};
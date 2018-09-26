import { Base } from '../../utils/base.js';

class ProductDetail extends Base{
   // constructor() {
   //    super();
   // }

   getProductDetail(id, callBack) {
      var params = {
         url: 'product/' + id,
         sCallBack: function(res){
            callBack(res);
         }
      }
      this.request(params);
   }
}

export { ProductDetail };
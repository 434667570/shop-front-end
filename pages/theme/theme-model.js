import {Base} from '../../utils/base.js';

class Theme extends Base{
   getThemeDetail(id, callBack){
      var params = {
         url: 'theme/' + id,
         sCallBack: function(res){
            callBack(res);
         }
      }
      this.request(params);
   }
}
export {Theme};
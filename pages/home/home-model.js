import {Base} from '../../utils/base.js';

class Home extends Base{
//   constructor(){
//     super();
//   }

  getBannerData(id, callBack){
    var params = {
      url : 'banner/' + id,
      sCallBack : function(res){
        callBack(res.items);
      }
    }
    this.request(params);
  }

  getThemeData(ids, callBack){
     var params = {
        url : 'theme?ids=' + ids,
        sCallBack : function(res){
           callBack(res);
        }
     }
   
     this.request(params);
  }

  getRecentProducts(callBack){
     var params = {
        url: 'product/recent',
        sCallBack: function(res){
           callBack(res);
        }
     }
     this.request(params);
  }
}

export {Home};
import {
   Address
} from 'address-model.js';
var address = new Address();

Page({

   data: {

   },


   onLoad: function(options) {
      this.setData({
         source: options.source
      })
      console.log(this.data.source)
      this._loadData();
   },

   _loadData: function(){
      address.getUserAddress((res)=>{
         this.setData({
            data: res
         })
      })
   },
   

   /**
    * 点击保存提交数据
    */
   formSubmit: function(e) {
      var info = e.detail.value;
      var that = this;
      address.submitData(info, (res) => {
         if (res.error_code == 0) {
            wx.showToast({
               title: '保存成功',
               icon: 'succes',
               success: function() {
                  setTimeout(function() {
                     if(that.data.source == 'my'){
                        wx.switchTab({
                           url: '/pages/my/my'
                        })
                     }
                  }, 700)
               }
            })
         } else {
            console.log(res)
            wx.showModal({
               title: '提示',
               content: '请检查输入格式是否有误',
               showCancel: false,
               confirmColor: '#AB956D',
            })
         }
      })
   }
})
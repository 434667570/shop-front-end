import {Cart} from 'cart-model.js';
var cart = new Cart();

Page({

   data: {
      isAllSelect: false,
      totalPrice: cart.getTotalPrice(),
      totalCount: cart.getTotalCount(),
      
   },


   onLoad: function(options) {
      // this._loadData();
   },
   onShow: function(){
      this._loadData();
   },

   _loadData: function() {
      this.setData({
         cartData: cart.getAllCart(),
         totalPrice: cart.getTotalPrice(),
         totalCount: cart.getTotalCount()
      })
   },
   // 选中商品事件
   onSelectProduct: function(e){
      var id = e.currentTarget.dataset.id;
      var status = e.currentTarget.dataset.status;

      var isAllSelected = cart.setCartStatusById(id, !status);

      //检查是全选了或者全没选了
      if(isAllSelected){
         if(status){
            this.setData({
               isAllSelect: true
            })
         }else{
            this.setData({
               isAllSelect: false
            })
         }
      }else{
         this.setData({
            isAllSelect: true
         })
      }

      this.setData({
         cartData: cart.getAllCart(),
         totalPrice: cart.getTotalPrice(),
         totalCount: cart.getTotalCount()
      })
   },
   //改变商品数量事件
   onChangeCount: function(e){
      var id = e.currentTarget.dataset.id;
      var operation = e.currentTarget.dataset.operation;
      var count = e.currentTarget.dataset.count;

      if(operation == 'add'){
         cart.addCountById(id);
      }
      if (operation == 'sub' && count != 1){
         cart.subCountById(id);
      }
      
      this.setData({
         cartData: cart.getAllCart(),
         totalPrice: cart.getTotalPrice(),
         totalCount: cart.getTotalCount()
      })
   },
   
   //取消/清除商品
   onCancel: function(e){
      var id = e.currentTarget.dataset.id;

      cart.cancelById(id);

      this.setData({
         cartData: cart.getAllCart(),
         totalPrice: cart.getTotalPrice(),
         totalCount: cart.getTotalCount()
      })
   },

   //全选按钮
   onAllSelect: function(e){
      var hasNoSelected = cart.selectAll();
      
      this.setData({
         cartData: cart.getAllCart(),
         isAllSelect: !hasNoSelected,
         totalPrice: cart.getTotalPrice(),
         totalCount: cart.getTotalCount()
      })
   },

   /**
    * 跳转到商品详情页面
    */
   onToProductDetail: function(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '/pages/product-detail/product-detail?id=' + id
      })
   },

   onOrder: function(e) {
      if (this.data.totalCount > 0){
         wx.navigateTo({
            url: '/pages/order/order?source=cart'
         })
      }
      // wx.showModal({
      //    title: '十分抱歉',
      //    content: '因订单量暴增,暂时无法线上下单,请在送货时间到自提点自取,自提点请加客服师兄询问',
      //    showCancel: true,
      //    cancelText: '取消',
      //    cancelColor: '',
      //    confirmText: '确定',
      //    confirmColor: '',
      //    success: function(res) {},
      //    fail: function(res) {},
      //    complete: function(res) {},
      // })
     
   }

})
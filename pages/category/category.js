import {Category} from 'category-model.js';
var category = new Category();

Page({

  
  data: {
     currentCategory: ''
  },

  onLoad: function (options) {
      this._loadData();
     wx.showShareMenu({
        withShareTicket: true
     })
  },

   _loadData: function(){
      category.getCategoryList((res) => { 
         this.setData({
            categoryList: res,
            currentCategory: res[0].id
         })
      }),

      category.getAllProduct((res) => {
         console.log(res)
         this.setData({
            allProduct: res,
            productArr: res[1]
         })
      })
   },

   onSelectCategory: function(e){
      var id = e.currentTarget.dataset.id;
      var allProduct = this.data.allProduct;

      this.setData({
         currentCategory: id,
         productArr: ''
      })
      
      for (var i = 1; i <= 7; i++){
         if(id == i){
            this.setData({
               productArr: allProduct[i]
            })
         } 
      }
      
   },

   
   onProductDetail: function (e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '/pages/product-detail/product-detail?id=' + id
      })
   }

   
  
})
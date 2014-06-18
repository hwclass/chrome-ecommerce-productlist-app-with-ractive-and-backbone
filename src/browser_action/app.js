(function(Main, config, Ractive, Backbone, _, $) {
	
	'use strict';

	/**
	 * headerView is a Ractive template
	 *
	 * @param <String> el
	 * @param <String> template
	 * @param <String> data
	 * @param <String> data.imageSrc
	 *
	 */
	var headerView = new Ractive({
		el : 'header',
		template : '<div id="header" class="cf"><img src="{{imgSrc}}" width="164" height="26" style="margin: 5px 0 0 5px;"/></div>',
		data : {
			imgSrc : '../../img/logo.png'
		}
	});

	/**
	 * Main.Models.Product is a Backbone Model that is used to organize model structure of a product
	 *
	 * @param <String> defaults
	 * @param <String> defaults.brand_name
	 * @param <String> defaults.short_description
	 * @param <String> defaults.sale_price
	 * @param <String> defaults.actual_price
	 * @param <String> defaults.url_key
	 * @param <String> defaults.img
	 *
	 */
	Main.Models.Product = Backbone.Model.extend({
		defaults : {
			brand_name : 'n/a',
			short_description : 'n/a',
			sale_price : '0.00',
			actual_price : '0.00',
			url_key : 'http://www.zizigo.com/500',
			img : 'n/a'
		}
	});

	/**
	 * Main.Collections.Product is a Backbone Collection that is used to organize models and data
	 *
	 */
	Main.Collections.Product = Backbone.Collection.extend({
	  
	  model : Main.Models.Product,
	  
	  url : config.urls.favouriteProducts,
	  
	  initialize: function(){
      this.fetch({
        success: this.fetchSuccess,
        error: this.fetchError
      });
    },

    fetchSuccess: function (collection, response) {
    	var _productList = [];
    	response.map(function(product) {
    		product.img = product.images[0];
    		_productList.push(product);
    	});
      new Ractive({
    		el : 'ZizigoChromeApp',
    		template : '#productTemplate',
    		data : {
    			products: _productList,
    			adapt: ['Backbone'] 
    		}
    	});
    	debugger;
    	var test2 = 2;
    },

    fetchError: function (collection, response) {
      throw new Error("Products fetch error...");
    }

	});

	var products = new Main.Collections.Product;

	products.fetch();

})(Main, config, Ractive, Backbone, _, jQuery);


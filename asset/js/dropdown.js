//下拉框
define(['jquery'],function($){

	function Dropdown(el,opts){
		this.opts = $.extend({},Dropdown.DEFAULTS,opts);
		this.$el =$(el);
		this.$el.on('click',$.proxy(this._drop,this));
	};
	Dropdown.DEFAULTS={
		
	}
	
	
	Dropdown.prototype._drop= function(){
			console.log(111)
			console.log(this)
			this.$el.next().slideToggle();
	}
	// 封装成 jquery 插件
	$.fn.extend({
		Drop:function(opts){  //插件 函数名称
			return  this.each(function(){
				new Dropdown(this,opts)
			   })
		}
	})

	return {
		Dropdown:Dropdown
	}
})

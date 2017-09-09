//下拉框
define(['jquery'],function($){

	/**
	*  opts  {Object} 参数列表
	*  opts.hasParent   {boolean}  是否父节点
	*  opts.docClose  {boolean}  是否点击空白区域关闭
	*/
	function Dropdown(el,opts){
		this.opts = $.extend(true,Dropdown.DEFAULTS,opts);
		this.$el =$(el);
		// 判断是否父节点
		if(!opts.hasParent){
			this.$el.on("click", $.proxy(this._drop, this));
			$(document).on("click", $.proxy(this._close, this));
		}else{
			this.$el.on("click", $.proxy(this._dropHasParent, this));
			$(document).on("click", $.proxy(this._closeHasParent, this));
		};
	};
	Dropdown.DEFAULTS={
		hasParent: false
	}
	
	
	Dropdown.prototype._drop= function(e){
			e.stopPropagation();
			this.$el.next().slideToggle();
	}
	Dropdown.prototype._dropHasParent= function(){
			e.stopPropagation();
			this.$el.parent().next('.dropdownMenu').slideToggle();
	}
	Dropdown.prototype._close= function(){
			this.$el.next().slideUp();
	}
	Dropdown.prototype._closeHasParent= function(){
			this.$el.parent().next('.dropdownMenu').slideUp();
	}
	// 封装成 jquery 插件
	$.fn.extend({
		Dropdown:function(opts){  //插件 函数名称
			return  this.each(function(){
				new Dropdown(this,opts)
			   })
		}
	})

	return {
		Dropdown:Dropdown
	}
})

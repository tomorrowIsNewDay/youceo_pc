//第三课  封装模块
define(['jquery','scrollto'],function($,scrollto){
	function BackTop (el,opts){
		this.opts = $.extend({},BackTop.DEFAULTS,opts);
		this.$el = $(el);
		this.scroll = new scrollto.ScrollTo({
			dest:0,
			speed:this.opts.speed
		})

		this._checkPostion();

		//判断 调用move方法还是go 方法
		if(this.opts.mode == 'move'){
			this.$el.on('click',$.proxy(this._move,this));
		}else{
			this.$el.on('click',$.proxy(this._go,this));
		}
		
		$(window).on('scroll',$.proxy(this._checkPostion,this))
	};
	BackTop.DEFAULTS={
		mode:'move',
		pos:$(window).height(),
		speed:800
	}

	BackTop.prototype._move = function(){
		this.scroll.move();
	}
	BackTop.prototype._go = function(){
		this.scroll.go();
	}
	BackTop.prototype._checkPostion = function(){
		if($(window).scrollTop() > this.opts.pos){
			this.$el.fadeIn()
		}else{
			this.$el.fadeOut()
		}
	}
	//封装成 jquery 插件
	$.fn.extend({
		backTop:function(opts){  //插件 函数名称
			return  this.each(function(){
				new BackTop(this,opts)
			   })
		}
	})

	return {
		BackTop:BackTop
	}
})

//实现 将 滚动条 移动到指定的位置的  模块
define(['jquery'],function($){
	// 面向对象写法
	// 1.先写一个构造函数
	function ScrollTo (opts){ //ops 是参数 为对象形式
		this.opts = $.extend({},ScrollTo.DEFAULTS,opts);
		this.$el=$('html,body') //简化代码 缓存
	};
	ScrollTo.DEFAULTS = { //默认参数
		dest:0, //默认位置 顶部
		speed:800 
	};
	//原型练上加 方法
	ScrollTo.prototype.move = function(){
		console.log(this)
		var opts = this.opts;
		this.$el.stop().animate({  
			scrollTop:opts.dest
		},opts.speed)
	};
	ScrollTo.prototype.go = function(){
		if($(window).scrollTop() !=this.opts.dest){
			// $('html,body').scrollTop(this.opts.dest) 下行为简写
			this.$el.scrollTop(this.opts.dest)
		}
		
	}

	//导出模块
	return {
		ScrollTo:ScrollTo
	}
})

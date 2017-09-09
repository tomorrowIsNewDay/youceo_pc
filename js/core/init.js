define(['jquery', 'js/core/login'], function($, login){
	
	var init = function(options){
		options = $.extend(true, {
			wrap: $("body")
		}, options);

		options.wrap.load("html/core/init.html", function(){
			// 初始化登录页
			login.init();
		})
	};



	return {
		init: init
	}
})

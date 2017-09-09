// 初始化登录页
// js/core/login.js
define(['jquery', 'js/core/main'], function($, main){

	var initLogin = function(options){
		options= $.extend(true, {
			wrap: $('#login')
		},options);

		options.wrap.load('html/core/login.html', function(){
			// 主页面 容器隐藏
			$('#webContent').hide();
			// 登录页 容器显示
			$('#login').show();

			initEvents(); // 初始化事件
		})
	};

	function initEvents(){
		$('.loginFrom').on('submit', function(e){
			//  ajax 调用登录接口
			// 成功返回数据
			// 初始化 主页面数据
			e.preventDefault();
			main.init();
		
		});
	};

	return {
		init: initLogin
	}
})

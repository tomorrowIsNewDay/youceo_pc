/**
*  js/core/main
*  主页面
*/
define(['jquery', 'js/common/global'], function($, global){
	var initMain = function(options){
		options = $.extend(true, {
			wrap: $('#webContent')
		}, options);
		options.wrap.load('html/core/main.html',function(){
			// 主页面 容器显示
			$('#webContent').show();
			// 登录页 容器隐藏
			$('#login').hide();

			// 调用全局方法
			global.initHeaderEvents();
			//菜单页签绑定点击事件
			var $nav = $('.linkNav');
			$nav.on('click','ul>li>a',function(){
				var $this = $(this);
				//  给点击的a标签加上active类
				$nav.find('a').removeClass('active')
				$this.addClass('active');
				// 调用 打开页面方法
				openTab({
				path:$this.data('path')
			   });
			})
			// 默认打开推动页面
			openTab({
				path:'js/pages/drive'
			});
			
		});
	};
	/**
	*  重要的 打开页签的 事件
	*  options.path   js路径
	*  options.callback 回调事件
	*/
	function openTab(options){
		options = $.extend(true, {
			path: '',
			callback:function(){}
		}, options);
		// require.under(options.path);
		require([options.path], function(page){
			page.init({
				callback:function(){
					console.log('main.js callback')
				}
			});
		})

	};
	return {
		init: initMain
	}
})

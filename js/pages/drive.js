/**
* 推动页面
*/
define(["jquery",  "jBox", 'datepicker','js/common/global'], function($, jBox, datepicker, global){
	
	// 路径
	var path = 'html/pages/drive.html';

	

	// 页面初始化 接口
	// options.callback 成功回调
	return {
		init: function(options){
			options = $.extend(true, {}, options);
			
			$('#mainContent').load(path, function(){
				global.initMoreInfo($('tbody .task-tr:first'));//加载第一条信息
				$(document).on('click','tbody .task-tr',function(){
					global.initMoreInfo($(this));
				})

				options.callback();
			})


		}
	}
})

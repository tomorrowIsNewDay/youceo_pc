/**
* 工作分析页面
*/
define(["jquery",  "js/lib/drag", 'slimscroll','highcharts', "tablesort"], function($, drag, slimscroll, highcharts, tablesort){
	
	// 路径
	var path = 'html/pages/jobAnalysis.html';
	function initEvent(){
		drag.init('jobAnalysisLeft-main');

		$('.jobAnalysisCenter-text').sortable({
		      revert: true
		    })
		// 滚动条
		// $(".jobAnalysisLeft-main").slimScroll({
		// 	height:'calc(100% - 50px)'
		// })
		$(".jobAnalysis-center>div").slimScroll({
			height:'100%'
		})
		$('.floatBar-menu>ul').slimScroll({
			height:'280px'
		})
		$(document).on('click','.floatBar',function(){
			$(this).next().fadeToggle()
		})
		// close 按钮
		$(document).on('click','.docBox .icon-close',function(){
			var num = $(this).parents('.jobAnalysisCenter-box').find('.docBoxNum').text();
			num--;
			$(this).parents('.jobAnalysisCenter-box').find('.docBoxNum').text(num);
			$(this).parent('.docBox').remove()
		})
	}
	

	// 页面初始化 接口
	// options.callback 成功回调
	return {
		init: function(options){
			options = $.extend(true, {}, options);
			
			$('#mainContent').load(path, function(){
				initEvent();
				options.callback();
			})


		}
	}
})

/**
* 任务页面
*/
define(["jquery",  "jBox", 'datepicker','js/common/global'], function($, jBox, datepicker, global){
	
	// 路径
	var path = 'html/pages/taskList.html';
	function initEvent(){
			//面包屑 nav
		$(document).on('click','.breadCrumb>li>a',function(){
			$(this).next('.breadCrumbMenu').toggle();
			$(this).find('i').toggleClass('rotate90')
			return false
		})
		// 面包屑 下拉框 a 点击
		$(document).on('click','.breadCrumbMenu>li>a',function(){
			var $parentsLi = $(this).parents('.breadCrumbMenu').parent('li');
			var  $breadCrumb = $(this).parents('.breadCrumb');
			var _newLi = $(this).parent('li').clone();
			$parentsLi.children('a').find('i').removeClass('rotate90')//三角图标
			$(this).parents('.breadCrumbMenu').hide();// 下拉框关闭

			if($parentsLi.next().length == 0){
				$breadCrumb.append(_newLi)

			}else{
				$parentsLi.next().remove()
				$breadCrumb.append(_newLi)
			}
			
			return false
		})
	}
	

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
				initEvent();
				options.callback();
			})


		}
	}
})

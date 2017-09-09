/**
* 云盘页面
*/
define(["jquery",  "jBox", 'datepicker', 'tablesort', 'slimscroll'], function($, jBox, datepicker, tablesort, slimscroll){
	
	// 路径
	var path;
	// 页面初始化
	function initEvents(){
		var newName = new jBox('Modal', {
		  attach: '.newName-a',
		  animation: 'pulse',
		  title: '重命名',
		  content: $('#newName')
		});
		var moveTo = new jBox('Modal', {
		  width:'500px',
		  attach: '.moveTo-a',
		  animation: 'pulse',
		  title: '移动到',
		  content: $('#moveTo')
		});
		// jBox 取消按钮
		$('.closejBox').on('click',function(){
			newName.close();
			moveTo.close();
		})

		$(".cloudDisk-main").slimScroll({
			height:'calc(100% - (61px))'
		})
		$("#moveTo>form>div").slimScroll({
			height:'300px'
		})
		
		$(document).on('click','.cloudDisk-main tbody td .icon-more',function(){
			$(this).next('ul').slideToggle()
		})
		//云盘 nav 按钮 切换
		$('.wrapperNav-tittle>li>a').on('click',function(){
			$('.wrapperNav-tittle>li>a').removeClass('active');
			$(this).addClass('active');

			var thisid = $(this).data('id');
			$(".forms>div").each(function(){
				if( this.id == thisid){
					$(this).fadeIn().siblings().hide()
				}
			})
		})
		
		//tree.js
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '关闭');
	            $('.tree li.parent_li > span').on('click', function (e) {
	            	$('.tree li.parent_li > span').removeClass('c-darkblue')
	            	$(this).addClass('c-darkblue')

	                var children = $(this).parent('li.parent_li').find(' >ul> li');
	                if (children.is(":visible")) {
	                    children.hide('fast');
	                    $(this).attr('title', '展开').find('i').first().addClass('icon-plus').removeClass('icon-reduse');
	                } else {
	                    children.show('fast');
	                    $(this).attr('title', '关闭').find('i').first().addClass('icon-reduse').removeClass('icon-plus');
	                }
	                e.stopPropagation();
	            });
	            //表格排序
	            $('table').tablesort().data('tablesort');
	            $('table th.number').data('sortBy', function(th, td, sorter) {
			return parseInt(td.text(), 10);
		});
	            $(document).on('click','.cloudDisk-title>.pull-right>.icon-sort',function(){
	            	$(this).next('.cloud-menu').slideToggle()
	            })
	            //按文件名 排序
	            $(document).on('click','.cloudDisk-title .cloud-menu>li:first-child>a',function(){
	            	_sort($(this),2)
	            	return false
	            })
	             //按文件大小 排序
	              $(document).on('click','.cloudDisk-title .cloud-menu>li:nth-child(2)>a',function(){
	            	_sort($(this),0)
	            	return false
	            })
	               //按文件创建日期 排序
	                $(document).on('click','.cloudDisk-title .cloud-menu>li:last-child>a',function(){
	            	_sort($(this),1)
	            	return false
	            })
	              function _sort(e,n){
	              	e.parents('.cloudDisk-title').next().find('thead').find('th').eq(n).trigger('click')
	            	e.parents('.cloud-menu').slideUp()
	              }
	             //全选
	             $(document).on('click','input[name="allcheck"]',function(){
	             	var $allcheckbox =$(this).parents('table').find('tbody').find('input[type="checkbox"]');
	             	if($(this).prop('checked')==true){
	             		$allcheckbox.prop('checked',true)
	             	}else{
	             		$allcheckbox.prop('checked',false)
	             	}
	             	
	             })
	}

	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/cloudDisk.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

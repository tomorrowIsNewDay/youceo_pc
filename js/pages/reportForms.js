/**
* 报表页面
*/
define(["jquery", 'jBox'], function($, jBox){
	
	// 路径
	var path = 'html/pages/reportForms.html';
	function initEvent(){
		var approval = new jBox('Modal', {
		  // attach: '#newCustomers-a',
		  width:'400px',
		  animation: 'pulse',
		  title: '审批人',
		  content: $('#approval'),
		  preventDefault:true
		});
		var appoint = new jBox('Modal', {
			  // attach: '#newCustomers-a',
			  width:'400px',
			  animation: 'pulse',
			  title: '指派',
			  content: $('#appoint'),
			  preventDefault:true
		});
		// jBox 取消按钮
		$('.closejBox').on('click',function(){
			appoint.close();
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
		$(document).on("click","#workflowForms tbody td:nth-child(6)",function(){
			approval.open()
		})
		$(document).on('click','#dutyForms tbody td button',function(){
			appoint.open()
		})
		// dorpdown 指派弹窗下拉框
		$(document).on('click','.dropdownMenu-addStaff>li>a',function(){
			dorpdown($(this))
			return false
		})
		// 关闭 图标
		$(document).on('click','.delIcon',function(){
			$(this).parent().html('<i class="icon iconfont icon-plus-circle itype dropdownIcon"></i>')
		})
		// dropdown
		$(document).on('click','.dropSpan',function(){
			$(this).next('.dropdownMenu').slideToggle()
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

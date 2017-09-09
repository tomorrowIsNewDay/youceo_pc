/**
* js/common/global.js
* 全局通用
*/
define(["jquery",  "jBox", "js/util/dropdown","timepicker","datepicker"], function($, jBox, dropdown, timepicker, datepicker){
	
	function loadajax(l,box){
		  $.ajax({
		    url:l,
		    async:false,
		    cache:false,
		    success:function (msg){ 
		        box.html(msg); 
		    } 
		  });
		}

	return {
		// header 
		initHeaderEvents: function(){
		// 点击头像 下拉框切换 页面通用
		// jquery 插件 写法
		$('#avatar-a').Dropdown({
			hasParent: false
		})
		$('#add-a').Dropdown({
			hasParent: false
		})
		// 点击 增加按钮 下拉框切换 页面通用
		$('.workflowItem .icon-plus-circle').Dropdown({
			hasParent: true
		})

		//头部 新增客户 页面通用
		var newCustomers = new jBox('Modal', {
			  attach: '#newCustomers-a',
			  width:'400px',
			  animation: 'pulse',
			  title: '新增客户',
			  content: $('#newCustomers'),
			  preventDefault:true
			});
			var meeting = new jBox('Modal', {
			  attach: '#meeting-a',
			  width:'600px',
			  height:'380px',
			  animation: 'pulse',
			  title: '',
			  content: $('#meeting'),
			  preventDefault:true
			});
		// jBox 取消按钮
		$('.closejBox').on('click',function(){
			newCustomers.close();
			});
		// 会议模式中a标签点击切换
		$('.meeting-title>a').on('click',function(){
			$('.meeting-title>a').removeClass('active')
			$(this).addClass('active');
			
			var thisid = $(this).data('id');

			$("#meeting>div>div").each(function(){
				if( this.id == thisid){
					$(this).fadeIn().siblings().hide()
				}
			})
		});
		// //nav 点击切换
		$(document).on('click','.wrapperRight-tittle li a',function(){
		 	$('.wrapperRight-tittle li a').removeClass('active')
		 	$(this).addClass('active')
		 });		
		//云盘 nav 按钮 切换
		$('.wrapperNav-tittle>li>a').on('click',function(){
			$('.wrapperNav-tittle>li>a').removeClass('active');
			$(this).addClass('active');

			var thisid = $(this).data('id');
			$(".cloudDisk>div").each(function(){
				if( this.id == thisid){
					$(this).fadeIn().siblings().hide()
					}
				})
			})
		// 日期控件
		$(document).on('focus','input[name="datepicker"]',function(){
			 $(this).datepicker({
		                      autoclose: true,
		                      format: 'yyyy-mm-dd',
		                      minDate: new Date()
		             })
		})
		 $('input[name="timepicker"]').timepicker({
		                      timeFormat: 'HH:mm',
			    interval: 5,
			    minTime: '7',
			    maxTime: '11:00pm',
			    // defaultTime: '11',
			    // startTime: '10:00',
			    dynamic: false,
			    dropdown: true,
			    scrollbar: true
		})
		 //下拉框 切换图标
		$(document).on('click','.dropdownIcon',function(){
			$(this).parent().next('.dropdownMenu').slideToggle();	
		})

		//会议弹窗 增加人员 按钮
		$(document).on('click','#appointment .icon-plus-circle',function(){
			$(this).next('.dropdownMenu').slideToggle()
		})
		//会议弹窗 dropdown
		$(document).on('click','#appointment .dropdownMenu li>a',function(){
			var _img = $(this).children('img').clone();
			$(_img).addClass('avatar-34');
			var _i = $(this).parents('.dropdownMenu').prev('.icon-plus-circle');
			var newspan = '<span class="relative avatar avatar-34 itype isSpan">'+$(_img).prop("outerHTML")+'<i class="icon iconfont icon-close delIconMeet" ></i></span>'

			$(_i).before(newspan)
			return false;
		})

		$(document).on('click','#appointment .delIconMeet',function(){
			$(this).parent('.isSpan').remove()
		})
		//会议弹窗  已预约 修改按钮		
		$(document).on('click','#appointmented p.pull-right button:first-child',function(){
			$(this).parents('#appointmented').slideUp()
			$("#appointment").slideDown()
			//取值
			var meetText = $(this).parent('p').prev('h4').children('span').first().text();
			var meetDate = $(this).parent('p').next('p').children('s').first().text();
			var meetTime = $(this).parent('p').next('p').children('s').last().text();
			var meetPlace =$(this).parent('p').next('p').next('p').children('s').text();

			var $div = $("#appointment form>div");
			//赋值
			$div.eq(0).children('input').val(meetText)
			$div.eq(1).children('input').first().val(meetDate)	
			$div.eq(1).children('input').last().val(meetTime)
			$div.eq(2).children('input').val(meetPlace)

		})
		//会议弹窗  已预约 开始按钮
		$(document).on('click','#appointmented p.pull-right button:last-child',function(){
			var mark = '<mark>会议中</mark>';
			$(this).parent('p').prev('h4').children('.pull-right').append(mark);
			$(this).parent('p').hide()
		})

		//会议弹窗  预约 预约按钮
		$(document).on('click','#appointment .jBoxfooter button:first-child',function(){

		})
		$(document).on('focus','.dutyInput .input-btn>input',function(){
			var newDiv ='  <div class="dutyInput">'+
						'<h6 class="dis-2"></h6>'+
						'<div class="dis-8">'+
							'<div class="input-btn">'+
								'<select class="dis-3"> '+
									'<option>技术工艺部</option>'+
									'<option>部门2</option>'+
									'</select><input type="text" name="" class="dis-7" placeholder="说明...">'+
							'</div>'+
						'</div>'+
					'</div>';
			
			var parents = $(this).parents('.dutyInput');
			if($(parents).next('.dutyInput').length ==0){
				$(parents).after(newDiv)
			}
		})

		},

		initMoreInfo:function(e){
		     $('tr').removeClass('active');
		     e.addClass('active');
		     $('html, body').animate({scrollTop:0}, 'fast');

		      $(".overlay").show();
		      // var l = "ajax_iteminfo_"+ e.data('itemtype') +".html?id="+e.data('itemid');
		      var l = "ajax_drive_"+e.data('alias')+'.html#moving'
		      var box = $(".wrapperRight-main");
		      loadajax(l,box);
		      // $("#info-box").slideDown();
		      // $("#tab-feeds,#tab-users").data({"itemid":e.data('itemid'),"itemtype":e.data('itemtype')});
		      $(".overlay").delay("slow").fadeOut();
		},
		
		

		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/drive.html';
			$('#mainContent').load(path, function(){
				options.callback();
			})


		}
	}
})

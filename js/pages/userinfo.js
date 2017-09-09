/**
* 个人资料页面
*/
define(["jquery",  "jBox", 'datepicker'], function($, jBox, datepicker){
	
	// 路径
	var path;
	// 页面初始化
	function initEvents(){
		//编辑 按钮
	$(document).on('click','#edit',function(){
		var _text = $(this).text();
		if(_text == '编辑'){
			$(this).text('完成')
			var _span = $(".userinfo input[type='hidden']").prev();
			var arr = [];
			for(var i = 0;i<_span.length;i++){
				arr.push(_span[i].innerText)
			};
			$(".userinfo input[type='hidden']").attr('type','text').each(function(index,el){
				el.value = arr[index] 
			});
			$('.userinfo .dis-8 select').prop('disabled',false).addClass('addselect')//select
			$('.userinfoText').text('')
			$('.avatarShade').show()
		}else {
			$(this).text('编辑');
		
			var _input = $(".userinfo input[type='text']");
			var arr1 =[];
			for(var i = 0;i<_input.length;i++){
				console.log(_input[i].value)
				arr1.push(_input[i].value)
			}
			console.log(arr1)
			$('.userinfoText').each(function(index,el){
				el.innerText = arr1[index]
			});
			$(".userinfo input[type='text']").attr('type','hidden');
			$('.userinfo .dis-8 select').prop('disabled',true).removeClass("addselect");//select
			$('.avatarShade').hide()
		}
	})
	}

	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/userinfo.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

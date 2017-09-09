/**
* CRM页面
*/
define(["jquery",  "jBox", 'slimscroll', 'js/common/global'], function($, jBox, slimscroll, global){
	
	// 路径
	var path = 'html/pages/crm.html';
	function initEvents(){
		var editFirminfo = new jBox('Modal', {
		  width:'400px',
		  animation: 'pulse',
		  title: '编辑客户信息',
		  content: $('#editFirminfo'),
		  preventDefault:true
		});
		var editcContact = new jBox('Modal', {
		  width:'400px',
		  animation: 'pulse',
		  title: '编辑联系人',
		  content: $('#editcContact'),
		  preventDefault:true
		});
		var newContact = new jBox('Modal', {
		  attach: '#newContact-p',
		  width:'400px',
		  animation: 'pulse',
		  title: '新增联系人',
		  content: $('#newContact'),
		  preventDefault:true
		});
		var delContact = new jBox('Modal', {
		  animation: 'pulse',
		  content: $('#delContact'),
		  preventDefault:true
		});
		// jBox 取消按钮
		$(document).on('click','.closejBox',function(){
			// newCustomers.close();
			editFirminfo.close();
			editcContact.close();
			newContact.close();
			delContact.close();
		})
		global.initMoreInfo($('tbody .task-tr:first'));//加载第一条信息
		$(document).on('click','tbody .task-tr',function(){
			global.initMoreInfo($(this));
		})
		//编辑客户信息
		$(document).on('click','#editFirminfo-btn',function(){
			var _div = $(this).parents('.crmFirminfo').children('div');
			var firmName = $('.crmFirminfoImg').children('p').text()//公司名称
			var address = $(_div).eq(0).children('p').text();//公司地址
			var level = $(_div).eq(1).children('p').text();//客户等级
			var ps = $(_div).eq(-1).children('p').text();//备注
			
			//赋值
			var $div = $('#editFirminfo>.staffForm>div');
			$div.eq(0).children('input').val(firmName);
			$div.eq(1).children('input').val(address);
			$div.eq(2).children('select').val(level);
			$div.eq(3).children('textarea').val(ps);

			editFirminfo.open();

			$('#editFirminfo .jBoxfooter>button:last-child').on('click',function(event){
				var firmName1 = $div.eq(0).children('input').val();
				var address1 = $div.eq(1).children('input').val();
				var level1 = $div.eq(2).find('select').val();
				console.log(level1)
				var ps1 = $div.eq(3).children('textarea').val();
				$('.crmFirminfoImg').children('p').text(firmName1)
				$('.crmFirminfo').children('div').eq(0).children('p').text(address1)
				$('.crmFirminfo').children('div').eq(1).children('p').text(level1);
				$('.crmFirminfo').children('div').eq(-1).children('p').text(ps1);

				editFirminfo.close();
			})
		})
		//查看联系人
		var _id;
		$(document).on('click','.crmFirminfoLink>p:not(:last-child)',function(event){
			var name = $(this).children('s').text();
			var tel = $(this).children('span').children('s').text()
			_id = $($(this).context).data('id');//重点重点
			console.log(_id)
			var $div = $('#editcContact .staffForm>div')
			$div.eq(0).find('input').val(name)
			$div.eq(1).find('input').val(tel)
			editcContact.open()
		})
		// 查看联系人 确定按钮
		$('#editcContact .jBoxfooter>button:last-child').on('click',function(event){
			// console.log(11)
			var btn = event.target;
			var $div =$(btn).parents('.jBoxfooter').prev('form').children('div');
			var name1 = $div.eq(0).find('input').val();
			var tel1 = $div.eq(1).find('input').val()
			var _p = $('.crmFirminfoLink>p:not(:last-child)');

			for(var i = 0;i<_p.length;i++){

				if($(_p[i]).data('id') == _id){

					$(_p[i]).children('s').text(name1);
					$(_p[i]).children('span').children('s').text(tel1)
					editcContact.close()
				}
			}
		})
		
		//删除联系人
		$(document).on('click','.crmFirminfoLink>p .icon-delete',function(event){
			event.stopPropagation();
			var $p = $(this).parents('p');
			delContact.open()
			$('#delContact .jBoxfooter>button:last-child').on('click',function(event){
				$p.remove()
				delContact.close()
			})
		})
		//新增联系人
		$('#newContact .jBoxfooter>button:last-child').on('click',function(event){
				var $div = $(this).parent('.jBoxfooter').prev('form').children('div')
				var name = getNewVal(0,'input',$div)//姓名
				var tel = getNewVal(1,'input',$div)//电话
				var newId = 4;//新增的 ID;应该设置为 动态的
				var newtr ='<p data-id="'+newId+'"><s>'+name+'</s><span class="pull-right"><s>'+tel+'</s><i class="icon iconfont icon-delete"></i></span></p>'

				$('#newContact-p').before(newtr)
				newContact.close()
			})

		//工作记录 滚动条
		$('#jobRecord>ul').slimScroll({
			height:'100%'
		})
		$('.crmFirminfo').slimScroll({
			height:'calc(100% - (10px))'
		})

		function getNewVal(n,el,dom){
	    			var val = dom.eq(n).find(el).val();
				dom.eq(n).find(el).val('')
				return val
			}
	}

	// 页面初始化 接口
	// options.callback 成功回调
	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/crm.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

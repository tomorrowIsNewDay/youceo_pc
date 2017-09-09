/**
* 工作流页面
*/
define(["jquery",  "jBox", 'datepicker', 'tablesort', 'slimscroll'], function($, jBox, datepicker, tablesort, slimscroll){
	
	// 路径
	var path;
	// 页面初始化
	function initEvents(){
		var delWorkflow = new jBox('Modal', {
		  animation: 'pulse',
		  title: '',
		  content: $('#delWorkflow'),
		  preventDefault:true
		});
		var newWorkflow = new jBox('Modal', {
		  attach: '#newWorkflow-a',
		  width:'400px',
		  animation: 'pulse',
		  title: '工作流名称',
		  content: $('#newWorkflow')
		});
		// jBox 取消按钮
		$('.closejBox').on('click',function(){
			delWorkflow.close();
			newWorkflow.close();
		})
		// 新建工作流
		$(document).on('click','#newWorkflow .jBoxfooter>button:last-child',function(){
			var _val = $(this).parent('.jBoxfooter').prev('form').find('input').val();
			$(this).parent('.jBoxfooter').prev('form').find('input').val('')
			if(_val){
				newWorkflow.close()
				var _newWorkflow = '<div class="workflowItem">' + 
								'<h5>'+_val+'</h5>' +
								'<ol>' +
									'<li><span class="startOrEnd bg-start">流程发起</span><i class="icon iconfont icon-triangle-right"></i></li>' +
									'<li>'+
										'<span class="avatar relative"><i class="icon iconfont icon-plus-circle"></i></span>' +
										'<div class="dropdownMenu">' +
								            		'<div class="dropdownMenu-search">'+
								            			'<input type="text" placeholder="输入员工名称">' +
								            			'<i class="icon iconfont icon-search"></i>' +
								            		'</div>'+
								            		'<div class="dropdownMenu-main">' +
								            			'<ul class="dropdownMenu-workFlow ">' +
								            				//此处应为 数据库中获取 员工列表
									            			'<li class="c-text f12">最常添加的同事</li>' +
									            			'<li><a href="">用户体验设计师</a></li>'+
									            			'<li><a href="">设计总监</a></li>'+
									            			'<li><a href="">动效设计师</a></li>'+
									            		'</ul>'+
								            		'</div>'+	
								            	'</div>'+
									'</li>'+
									'<li class="pull-right"><button class="btn-g">完成</button></li>'+
								'</ol>'+
							'</div>'
				$('.workflowList').prepend(_newWorkflow)
			}
		})
		// 修改 工作流
		$(document).on('click',".workflowItem .workFlow-span>.icon-close",function(){
			var thisli = $(this).parents('li');
			var replaceli = $(this).parents('ol').children('li').eq(-2);
			$(thisli).nextUntil(replaceli).remove()//删除区间 li元素
			$(thisli).replaceWith(replaceli)//替换li元素
			return false
		})
		// 编辑 工作流
		$(document).on('click','.workflowItem>h5 .icon-write',function(){
			var newli ='<li>'+
						'<span class="avatar relative"><i class="icon iconfont icon-plus-circle"></i></span>' +
						'<div class="dropdownMenu">' +
				            		'<div class="dropdownMenu-search">'+
				            			'<input type="text" placeholder="输入员工名称">' +
				            			'<i class="icon iconfont icon-search"></i>' +
				            		'</div>'+
				            		'<div class="dropdownMenu-main">' +
				            			'<ul class="dropdownMenu-workFlow ">' +
				            				//此处应为 数据库中获取 员工列表
					            			'<li class="c-text f12">最常添加的同事</li>' +
					            			'<li><a href="">用户体验设计师</a></li>'+
					            			'<li><a href="">设计总监</a></li>'+
					            			'<li><a href="">动效设计师</a></li>'+
					            		'</ul>'+
				            		'</div>'+	
				            	'</div>'+
					'</li>'+
					'<li class="pull-right"><button class="btn-g">完成</button></li>'
			var $arrli = $(this).parents('.workflowItem').children('ol').children('li');
			$arrli.last().replaceWith(newli)
			$arrli.find('.workFlow-span').children('.icon-close').show()

		})
		//删除 工作流
		$(document).on('click','.workflowItem>h5 .icon-delete',function(){
			var parents = $(this).parents('.workflowItem');
			delWorkflow.open()
			$(document).on('click','#delWorkflow .jBoxfooter>button:last-child',function(){
				$(parents).remove();
				delWorkflow.close()
			})
		})
		
		//完成按钮
		$(document).on('click','.workflowItem>ol>li.pull-right>button',function(){
			var endli = '<li><span class="startOrEnd bg-end">结束</span></li>'
			var icon ='<span class="pull-right"><i class="icon iconfont icon-write"></i><i class="icon iconfont icon-delete"></i></span>';
			var h5 =$(this).parents('.workflowItem').children('h5');
			
			if($(h5).children('span').length == 0){
				
				$(h5).append(icon)
			}
			$(this).parents('.workflowItem').find('.icon-close').hide()
			$(this).parent('li').prev().replaceWith(endli)
			$(this).parent('li').remove()
		})
		// 工作流 添加员工
		$(document).on('click','.workflowItem .dropdownMenu-workFlow>li>a',function(){
			var thisval = $(this).text();
			var parentsLi = $(this).parents('.dropdownMenu').parent('li');
			var newli = '<li><a href=""><span class="workFlow-span">'+thisval+
				'<i class="icon iconfont icon-close"></i>'+
				'</span></a><i class="icon iconfont icon-triangle-right"></i></li>'

			$(parentsLi).before(newli)
			// console.log(this)

			return false

		})
	}

	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/workflow.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

/**
* 新增任务页面
*/
define(["jquery",  "jBox", 'datepicker'], function($, jBox, datepicker){
	
	// 路径
	var path = 'html/pages/addTask.html';
	// 页面初始化
	function initEvents(){
		//点击第一条 td 新增一条tr
		$(document).on('click','.task-tr [name="task-text"]',function(){
			var _newTr = $(this).parents('.task-tr').clone();
			var _nextTrLen = $(this).parents('.task-tr').next().length;
			if(!_nextTrLen){
				$('#tbody').append(_newTr)
			}
		})
		//点击 工作流下拉框 选项
		$(document).on('click','.dropdownMenu-workFlow>li>a',function(){
			var _thisText = $(this).text();
			var $parents = $(this).parents('.dropdownMenu');
			$parents.prev('span').addClass('workFlow').html(_thisText+'<i class="icon iconfont icon-close deleteWorkFlow" ></i>')
			$parents.hide()
			
			return false
		})
		//点击 工作流 删除
		$(document).on('click','.deleteWorkFlow',function(){
			$(this).parent().removeClass('workFlow').html('<i class="icon iconfont icon-plus dropdownIcon"></i>')
			// alert(1)
		})
		//点击 关联客户 下拉框 选项
		$(document).on('click','.dropdownMenu-addCustomer>li>a',function(){
			dorpdown($(this))
			return false
		})
		//点击 指派员工 下拉框 选项
		$(document).on('click','.dropdownMenu-addStaff>li>a',function(){
			dorpdown($(this))
			return false
		})
		// 关闭 图标
		$(document).on('click','.delIcon',function(){
			$(this).parent().html('<i class="icon iconfont icon-plus dropdownIcon"></i>')
			
		})
		//添加附件 close图标
		$(document).on('click','.dropdownMenu-addAttachment .pull-right .icon-close',function(){
			$(this).parents('li').remove()
			return false
		})
		// 发布 按钮 切换
		$(document).on("input propertychange",'.task-tr input[name="task-text"]',function(){
			var $_el =$(this).parent('td').siblings('.task-td-btn');
		 	if(this.value.length>0){
		 		fabu('disabled-release','abled-release','abled-copy','disabled-copy','abled-close','disabled-close')

		 	}else{
		 		fabu('abled-release','disabled-release','disabled-copy','abled-copy','disabled-close','abled-close')

		 	}
		 	function fabu(dis,ab,ab1,dis1,ab2,dis2){
		 		$_el.children('button').first().addClass(ab).removeClass(dis).next().addClass(ab1).removeClass(dis1).next().addClass(ab2).removeClass(dis2)
		 	}		 	
		 })
		//点击 x ；删除 tr
		$(document).on('click','.task-td-btn .abled-close',function(){
			$(this).parents('.task-tr').remove()
		})
		//点击 发布按钮 
		$(document).on('click','.task-td-btn .abled-release',function(){
			var $taskTr = $(this).parents('.task-tr');
			$taskTr.find('input').attr('disabled',true)
			$(this).parents('.task-td-btn').html('已发布')
			$taskTr.find('.icon-plus').hide()
			$taskTr.find('.icon-close').hide()
		})
		//点击 复制图标 
		$(document).on('click','.task-td-btn .abled-copy',function(){
			var $taskTr = $(this).parents('.task-tr');
			var _thisTr = $(this).parents('.task-tr').clone();
			$taskTr.after(_thisTr)
		})
	}

	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/addTask.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

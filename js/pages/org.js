/**
* org页面
*/
define(["jquery",  "jBox", 'datepicker', '../util/tree.js', 'slimscroll'], function($, jBox, datepicker, tree, slimscroll){
	
	// 路径
	var path;
	// 页面初始化
	function initEvents(){
		var newStaff = new jBox('Modal', {
		  attach: '#newStaff-a',
		  width:'400px',
		  // height:'300px',
		  animation: 'pulse',
		  title: '新增职员',
		  content: $('#newStaff'),
		  preventDefault:true
		});
		var editStaff = new jBox('Modal', {
		  // attach: '.editStaff-i',
		  animation: 'pulse',
		  title: '修改职员信息',
		  content: $('#editStaff')
		});
		var newName = new jBox('Modal', {
		  attach: '#newName-a',
		  animation: 'pulse',
		  title: '重命名',
		  content: $('#newName')
		});
		var newDept = new jBox('Modal', {
		  attach: '#newDept-a',
		  width:'400px',
		  animation: 'pulse',
		  title: '新增部门',
		  content: $('#newDept')
		});
		var delDept = new jBox('Modal', {
		  attach: '#delDept-a',
		  animation: 'pulse',
		  content: $('#delDept')
		});
		var delStaff = new jBox('Modal',{
		  animation: 'pulse',
		  content: $('#delStaff')
		});
		var jobManage = new jBox('Modal',{
		  attach: '#jobManage-a',
		  width:'500px',
		  animation: 'pulse',
		  title: '',
		  content: $('#jobManage')
		});
		//滚动条
		$('.tableBox').slimScroll({
			height:'calc(100% - (90px))'
		})
		$('.tree>ul').slimScroll({
			height:'calc(100% - (61px))'
		})
		//更多 按钮 下拉框切换
		$(document).on('click','#orgMore-a',function(){
			$(this).next().slideToggle()
		})
		// jBox 取消按钮
		$('.closejBox').on('click',function(){
			newStaff.close();
			editStaff.close();
			newName.close();
			newDept.close();
			delDept.close();
			delStaff.close();
		})
		// 编辑员工
		var _id;
		$(document).on('click','.editStaff-i',function(event){
			
			editStaff.open()
			var el = event.currentTarget;
			var $td =$(el).parents('tr').children('td')
			_id = $($td.context).data('id');//重点重点
			var $div = $('#editStaff>form>div');	
			getVal(0,'input')
			getVal(1,'select')
			// getVal(2,'select')
			$div.eq(2).find('select').val($td.eq(3).text())// 级别
			getVal(5,'input')
			getVal(6,'input')
			// 级别
			var radio = $div.eq(3).find('input[type="radio"]')//弹窗中的 i
			var i =$td.eq(3).find('i'); // td 中的i
			(function hasi(){
				if($(i).hasClass('icon-star')){
					$(radio).eq(1).prop('checked',true)
				}else if($(i).hasClass('icon-star-O')){
					$(radio).eq(2).prop('checked',true)
				}else if($(i).length == 0){
					$(radio).eq(0).prop('checked',true)
				}
			})()
			function getVal(n,el){
				if(n<3){
					var value =$td.eq(n+1).text();
					$div.eq(n).find(el).val(value)
				}else{
					var value =$td.eq(n-1).text();
					$div.eq(n).find(el).val(value)
				}		
			}
		})
		$('#editStaff .jBoxfooter>button:last-child').on('click',function(event){
			var btn = event.currentTarget;
			var $div = $(btn).parent('.jBoxfooter').prev('form').children('div');//form元素
			var tr = $('tbody>tr')
			// 级别
			function level2(){
				var iocn1 = $div.eq(3).find('input[type="radio"]:checked').next('i');
				if(iocn1.length>0){
					return $(iocn1).addClass('istatus').prop("outerHTML")
				}else{
					return '';
				}
			}

			for(var i = 0;i<tr.length;i++){
				if($(tr[i]).data('id') == _id){
					// console.log($(tr[i]),i)
					var $td1 = $(tr[i]).children('td')
					// console.log($td1)
					
					$td1.eq(1).text(getNewVal(0,'input',$div));//姓名
					$td1.eq(2).text(getNewVal(1,'select',$div));//部门
					$td1.eq(3).html(level2()+getNewVal(2,'select',$div));//级别 职位
					$td1.eq(4).text(getNewVal(5,'input',$div));//联系方式
					$td1.eq(5).text(getNewVal(6,'input',$div));//邮箱

					$('#editStaff i').removeClass('istatus')
					editStaff.close()	
				}

			}
							
		})
		
		
		//新增员工 确定按钮
		$('#newStaff .jBoxfooter>button:last-child').on('click',function(event){
			var btn = event.target;
			var $div = $(btn).parent('.jBoxfooter').prev('form').children('div');//form元素div集合

			var name = getNewVal(0,'input',$div,true)//姓名
			var dept = getNewVal(1,'select',$div,true)//部门
			var job = getNewVal(2,'select',$div,true)//职位
			var tel = getNewVal(5,'input',$div,true)//电话
			var email = getNewVal(6,'input',$div,true)//邮箱
			//级别
			function levelfunc(){
				var level = $('#newStaff input:radio[name="rank"]:checked').parent().text();
				if(level == '副级管理者'){
					return '<i class=" icon iconfont icon-star-O istatus"></i>'
				}
				else if(level == '正级管理者'){
					return '<i class=" icon iconfont icon-star istatus"></i>'
				}else{
					return ''
				}
			}
			var newId = 4;//新增的 ID;应该设置为 动态的
			var newtr = '<tr data-id="'+newId+'"><td><img class="avatar" src="http://www.qq745.com/uploads/allimg/141225/1-141225164J5.jpg"></td>'+
				'<td>'+name+'</td>'+
				'<td>'+dept+'</td>'+
				'<td>'+levelfunc()+job+'</td>'+
				'<td>'+tel+'</td>'+
				'<td>'+email+'</td>'+
				'<td><i data-id="'+newId+'" class="icon iconfont icon-write editStaff-i"></i><i class="icon iconfont icon-delete delStaff-i"></i></td></tr>';

			$('tbody').append(newtr)
			newStaff.close()
		})
		//删除员工
		$(document).on('click','.delStaff-i',function(event){
			var el = event.target;
			var $tr = $(el).parents('tr');
			// console.log(el)
			delStaff.open()

			$('#delStaff .jBoxfooter>button:last-child').on('click',function(event){
				// var btn = event.target;
				$tr.remove()
				delStaff.close()
				// console.log(btn)
		   })
		})
		//tree.js
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '关闭');
	            $('.tree li.parent_li > span').on('click', function (e) {
	                var children = $(this).parent('li.parent_li').find(' > ul > li');
	                if (children.is(":visible")) {
	                    children.hide('fast');
	                    $(this).attr('title', '展开').find('i').last().addClass('rotate0').removeClass('rotate90');
	                } else {
	                    children.show('fast');
	                    $(this).attr('title', '关闭').find('i').last().addClass('rotate90').removeClass('rotate0');
	                }
	                e.stopPropagation();
	            });

	            function getNewVal(n,el,dom,or){
	            		if(or == true){
	            			var val = dom.eq(n).find(el).val();
					dom.eq(n).find(el).val('')
					return val
				}else{
					return dom.eq(n).find(el).val();
				}
				
			}
		//职位管理 弹窗
		//删除按钮
		$(document).on('click','#jobManage tbody .icon-delete',function(){
			$(this).parents('tr').remove()
		})
		//新增职位
		$(document).on('click','#jobManage .jBoxfooter>button:first-child',function(){
			var newtr = '<tr>'+
					'<td><span></span><input type="text" name="" class="userinfoInput"></td><td>0</td><td><i class="icon iconfont icon-close"></i><i class="icon iconfont icon-choose"></i></td>'+
				       '</tr>'
			var $tbody = $(this).parent('.jBoxfooter').prev('table').find('tbody');
			$tbody.append(newtr)
			
			$('#jobManage tbody .icon-close').on('click',function(){
				$(this).parents('tr').remove()
			})

		})
		//编辑图标
		$(document).on('click','#jobManage tbody .icon-write',function(){
			var thisTd = $(this).parents('tr').children('td').eq(0);
			var iconTd = $(this).parents('tr').children('td').eq(2);
			var thisVal =$(thisTd).find('span').text();
			$(thisTd).find('span').hide();
			$(thisTd).find('input').attr('type','text').val(thisVal)
			var icon = '<td><i class="icon iconfont icon-close"></i><i class="icon iconfont icon-choose"></i></td>';
			$(iconTd).replaceWith(icon)

			//取消本次操作
			$('#jobManage tbody .icon-close').on('click',function(){
				$(thisTd).find('input').attr('type','hidden');
				$(thisTd).find('span').text(thisVal).show()
				var iconTd1 = $(this).parent('td'); 
				var icon1 = '<td><i class="icon iconfont icon-write"></i><i class="icon iconfont icon-delete"></i></td>';
				$(iconTd1).replaceWith(icon1)
			})
			
		})
		
		//icon-choose 图标
		$(document).on('click','#jobManage tbody .icon-choose',function(){
			var thisTd = $(this).parents('tr').children('td').eq(0);
			var iconTd = $(this).parents('tr').children('td').eq(2);
			var thisVal =$(thisTd).find('input').val();
			$(thisTd).find('input').attr('type','hidden');
			$(thisTd).find('span').text(thisVal).show()
			var icon = '<td><i class="icon iconfont icon-write"></i><i class="icon iconfont icon-delete"></i></td>';
			$(iconTd).replaceWith(icon)
		})
	}

	return {
		init: function(options){
			options = $.extend(true, {}, options);
			path = 'html/pages/org.html';
			$('#mainContent').load(path, function(){
				initEvents();
				options.callback();
			})


		}
	}
})

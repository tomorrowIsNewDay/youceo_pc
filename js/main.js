require.config({
	paths:{
		jquery:'jquery-2.2.3.min',
		jBox:'jBox.min',
		'datepicker':'bootstrap-datepicker',
		'timepicker':'jquery.timepicker.min'
	},
	shim:{
		'jBox':{
			'deps':['jquery'],
			exports: 'jBox'
		},
		'datepicker':{
			'deps':['jquery']
		},
		'timepicker':{
			'deps':['jquery']
		}
	}
});
require(['jquery','load','dropdown','jBox','datepicker','timepicker'],function($,load,dropdown,jBox,datepicker,timepicker){
	var data =[{
	"id":1,
	"title":"个人任务",
	"detail":"对第三季度销售会议内容进行整理，对大区的销售分配制度进行梳理",
	"name":"大区数量",
	"value":21,
	"time":3,
	"status":{
		"icon-chat":8,
		"icon-fujian":2
	}
},{
	"id":2,
	"title":"草稿",
	"detail":"我看到各种各样的人都因为承担他们所指派的各种额外工作而获得酬金。",
	"name":"大水电费",
	"value":10,
	"time":"	超期1天",
	"status":{
		"icon-chat":8
	}
},{
	"id":3,
	"title":"章三提交",
	"imgSrc":"http://www.qq745.com/uploads/allimg/141225/1-141225164J5.jpg",
	"detail":"关注中国污水处理工程网站获取相关信",
	"name":"设计稿",
	"value":221,
	"time":"3天"
}]
	$.each(data,function(i){
		var html='';
		var _td="";
		var _lastTd="";
		if(data[i].title=="个人任务"){
			 _td+=  '<td class="pl30"><span class="iconType bg-grayer itype"><i class="icon iconfont icon-document"></i></span>'+
				            data[i].title+'</td>'
		}else if(data[i].title=="草稿"){
			_td+='<td class="pl30 c-draft"><span class="iconType bg-grayer itype"><i class="icon iconfont icon-write"></i></span>草稿</td>'
		}else{
			_td+='<td class="pl30"><img src="'+data[i].imgSrc+'" class="iconType itype">'+data[i].title+'</td>'
		}

		if(data[i].status){
			for (var k in data[i].status){
				console.log(data[i].status[k],k)
				_lastTd+='<i class="icon iconfont mr10 '+ k+'"></i>'+data[i].status[k]
			} 
			_lastTd ='<span class="driveStatus">'+ _lastTd +'<span>'
		}else{
			_lastTd=''
		}
		html+='<tr class="task-tr">'+ _td +
					'<td class="pl20">'+data[i].detail+'</td>'+
				            '<td>'+ data[i].name+'</td>'+
				            '<td>'+  data[i].value +'</td>'+
				            '<td>' +data[i].time +'</td>'+
				            '<td class="tr">'+_lastTd+'</tr>';
		$("#Tbody").append(html)
		$('.detail-top>h5>p:last').html(data[1].detail)
	})
	var load = new load.Load({
		url:'https://api.youceo.cn/api/users/login',
		type:'GET',
		dataType:'jsonp'
	});

	$('#Tbody .task-tr:first').addClass('active')
	$(document).on('click',".task-tr",function(){
		$.proxy(load._load($(this)),load)
	})

	// var dropdown = new dropdown.Dropdown($('#avatar-a'),{})

	// $('#avatar-a').on('click',function(){
	// 	console.log('ok')
	// 	$.proxy(dropdown._drop($(this)),dropdown)
	// });
	// jquery 插件 写法
	$('#avatar-a').Drop({
		isTrue:true
	})
	
	// $('.workflowItem .icon-plus-circle').Drop()
	// console.log('its ok')
	// $(document).on('click','#avatar-a,#add-a',function(){
	// $(this).next().slideToggle()
	// })
	// // 点击 增加按钮 下拉框切换 页面通用
	// $(document).on('click','.workflowItem .icon-plus-circle',function(){
	// 	$(this).parent().next('.dropdownMenu').slideToggle()
	// })
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
	
	
})

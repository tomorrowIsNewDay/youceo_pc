/**
* 工作统计页面
*/
define(["jquery",  "jBox", 'datepicker','highcharts', "tablesort"], function($, jBox, datepicker, highcharts, tablesort){
	
	// 路径
	var path = 'html/pages/jobAccount.html';
	function initEvent(){
	//表格排序
            $('.rankingTable').tablesort();
            $('.rankingTable th').data('sortBy', function(th, td, sorter) {
		return parseInt(td.text(), 10);
	});
	//nav 点击切换
	$(document).on('click','.wrapperNav-tittle li a',function(){
		$('.wrapperNav-tittle li a').removeClass('active')
		$(this).addClass('active')
	})
	//highchart.js
	$('#perChart').highcharts({
	       chart: {
		 backgroundColor:'rgb(241,241,241)',
		 type:'line'

	        },
	        title: {
	            text: null
	        },
	        xAxis: {
	            categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"]
	        },
	        yAxis: [{
	        	title:{
	        	text:null
	        	},
	        	gridLineColor: '#fff',
	            labels: {
		    formatter:function(){
		     return this.value;
		    }
		  }
	        },{
	        	title:{
	        	text:null
	        	},
	        	opposite: true,
	        	categories:['0','50%',"100%"]
	        }],
	        tooltip: {
	           	valueSuffix: ''
	        },
	        legend: {
	            layout: 'horizontal',
	            align: 'right',
	            verticalAlign: 'top',
	            borderWidth: 0
	        },
	        credits:{
		     enabled:false // 禁用版权信息
		},
	        series: [{
	            name: '完成率',
	            data: [0, 45,48, 71, 36, 52,50, 65, 59, 80, 81,  30],
	            color:'rgb(220,61,213)'
	        },{
	            name: '不通过数',
	            data: [25, 25, 38, 31,65, 59, 80, 81, 56, 56, 45, 80],
	            color:'rgb(32,202,229)'
	        }, {
	            name: '通过数',
	            data: [35, 35, 80, 21,63, 39, 20, 51, 46, 26, 35, 30],
	            color:'rgb(32,229,65)'
	        }, {
	            name: '表扬数',
	            data: [51, 46, 26, 35, 30,45, 35, 80, 21,63, 29, 40],
	            color:'rgb(255,218,45)'
	        }, {
	            name: '任务数',
	            data: [65, 50, 65, 59, 80, 81, 56,48, 71, 36, 52, 30],
	            color:'rgb(237,41,41)'
	        }]
	    });
	$('#comChart').highcharts({
	       chart: {
		 backgroundColor:'rgb(241,241,241)',
		 type:'line'

	        },
	        title: {
	            text: null
	        },
	        xAxis: {
	            categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"]
	        },
	        yAxis: [{
	        	title:{
	        	text:null
	        	},
	        	gridLineColor: '#fff',
	            labels: {
		    formatter:function(){
		     return this.value;
		    }
		  }
	        },{
	        	title:{
	        	text:null
	        	},
	        	opposite: true,
	        	categories:['0','50%',"100%"]
	        }],
	        tooltip: {
	           
	        },
	        legend: {
	            layout: 'horizontal',
	            align: 'right',
	            verticalAlign: 'top',
	            borderWidth: 0
	        },
	        credits:{
		     enabled:false // 禁用版权信息
		},
	        series: [{
	            name: '部门',
	            data: [25, 25, 38, 31,65, 59, 80, 81, 56, 56, 45, 80],
	            color:'rgb(32,202,229)'
	        }, {
	            name: '个人',
	            data: [35, 35, 80, 21,63, 39, 20, 51, 46, 26, 35, 30],
	            color:'rgb(51,51,51)'
	        }, {
	            name: '完成率',
	            data: [0, 56,48, 71, 36, 52,50, 65, 59, 80, 81,  30],
	            color:'rgb(220,61,213)'
	        }, {
	            name: '任务数',
	            data: [65, 50, 65, 59, 80, 81, 56,48, 71, 36, 52, 30],
	            color:'rgb(237,41,41)'
	        }]
	    });
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

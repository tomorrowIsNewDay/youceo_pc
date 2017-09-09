// require 配置
require.config({
	paths:{
		jquery: '../js/lib/jquery-2.2.3.min',
		jBox: '../js/lib/jBox.min',
		'datepicker': '../js/lib/bootstrap-datepicker',
		'timepicker': '../js/lib/jquery.timepicker.min',
		'tablesort':"../js/lib/jquery.tablesort.min",
		'highcharts':'../js/lib/highcharts',
		'slimscroll':"../js/lib/jquery.slimscroll.min"
	},
	packages:[{
		name: 'js',
		location: serverCfg.js
	},
	{
		name: 'html',
		location: serverCfg.html
	}],
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
		},
		'tablesort':{
			'deps':['jquery']
		},
		'highcharts':{
			'deps':['jquery']
		},
		'slimscroll':{
			'deps':['jquery']
		}
	}
});

require(['js/core/init.js'], function(init){
	init.init()
})

require.config({
	paths:{
		jquery:'jquery-2.2.3.min'
	}
});
require(['jquery','backTop'],function($,backTop){
	//实例化
	var scroll = new backTop.BackTop($('#back'),{
		mode:'move',
		pos:400,
		speed:200
	})

	//jquery 插件 写法
	// $('#back').backTop({
	// 	mode:'move'
	// })
	
})

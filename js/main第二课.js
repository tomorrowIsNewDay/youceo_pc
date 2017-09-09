require.config({
	paths:{
		jquery:'jquery-2.2.3.min'
	}
});
require(['jquery','scrollto'],function($,scrollto){
	//实例化
	var scroll = new scrollto.ScrollTo({
		dest:300,
		speed:600 // 可传参，不传 则默认值
	})
	$('#back').on('click',$.proxy(scroll.move,scroll));//$.proxy 改变this的指向 指向scroll 对象 另一种方法：scroll.move.bind(scroll)
	$(window).on('scroll',function(){
		checkPositon($(window).height())//传参 可视区的高度
	});
	checkPositon($(window).height());//加载时  先检查一遍
	// function move(){
	// 	$('html,body').animate({
	// 		scrollTop:0
	// 	},800)
	// }
	// function go(){
	// 	$('html,body').scrollTop(0)
	// }
	function checkPositon(pos){
		if($(window).scrollTop() > pos){
			$('#back').fadeIn()
		}else{
			$('#back').fadeOut()
		}
	}
})

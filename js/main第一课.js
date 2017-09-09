require.config({
	paths:{
		jquery:'jquery-2.2.3.min'
	}
});
require(['jquery'],function($){
	$('#back').on('click',go);
	$(window).on('scroll',function(){
		checkPositon($(window).height())//传参 可视区的高度
	});
	checkPositon($(window).height());//加载时  先检查一遍
	function move(){
		$('html,body').animate({
			scrollTop:0
		},800)
	}
	function go(){
		$('html,body').scrollTop(0)
	}
	function checkPositon(pos){
		if($(window).scrollTop() > pos){
			$('#back').fadeIn()
		}else{
			$('#back').fadeOut()
		}
	}
})

define(['jquery'],function($){
	function Load(opts){
		this.opts=$.extend({},Load.DEFAULTS,opts);
		// this.$el = $(el);
	}
	Load.DEFAULTS={
		url:'url',
		type:'GET'
	}
	Load.prototype._load=function(e){
		$('#Tbody .task-tr').removeClass('active');
		e.addClass('active');
		$('html, body').animate({scrollTop:0}, 'fast');
		$(".overlay").show();
		$.ajax({
		            url: this.opts.url,
		             type: this.opts.type,
		             dataType: this.opts.dataType, 
		             data:{username:'18255215768',password:'123456'},
		             success:function(data){
		             	console.log(data)
		             	$.each(data,function(i,item){
		             		console.log(data)
		             		console.log(item)
		             		$(".overlay").delay("slow").fadeOut();
		             	})
		             },
		             error:function(err){
		             	console.log(err);

		             }
		})
		console.log(this.opts.url)
		
	}
	return {
		Load:Load
	}
})

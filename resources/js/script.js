 $(function(){

	$('ul#difficulty li').click(function() {
		$('li.active').removeClass('active');
		$(this).addClass('active');
	});

});
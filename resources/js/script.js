 $(function(){
	$('ul#difficulty li').click(function() {
		$('li.active').removeClass('active');
		$(this).addClass('active');
	});
});


function pulse() {
    $('button.heartbeat').animate({
        width: 200, height: 200, 
        'font-size': 50,
        opacity: 0.5
    }, 700, function() {
        $('button.heartbeat').animate({
            width: 220, height: 220, 
            'font-size': 55,
            opacity: 1
        }, 700, function() {
            pulse();
        });
    }); 
};
$( document ).ready(function() {
    pulse();
});

jQuery(document).ready(function($) {

    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });

    var navoffeset=$(".agileits_header").offset().top;
    $(window).scroll(function(){
        var scrollpos=$(window).scrollTop();
        if(scrollpos >=navoffeset){
            $(".agileits_header").addClass("fixed");
        }else{
            $(".agileits_header").removeClass("fixed");
        }
    });

    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');
        }
    );

    $().UItoTop({ easingType: 'easeOutQuart' });

    $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
            $('body').removeClass('loading');
        }
    });

    $('#example').okzoom({
        width: 150,
        height: 150,
        border: "1px solid black",
        shadow: "0 0 5px #000"
    });

    $.ajaxSetup({
        dataType: "json"
    });

    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        const id = +$(this).data('id');
        
        if(id > 0) {
           const data = {
                id
            };

            $.ajax({
                url: 'cart/add',
                method: "GET",
                data
            })
            .done(function (res) {
                
            })
            .fail(function (error) {
                let res = {
                    'error': 'Произошла ошибка. Попробуйте еще раз'
                }
                console.log(res);
            });
        }
    })
});

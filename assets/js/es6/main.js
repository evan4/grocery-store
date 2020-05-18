jQuery(document).ready(function($) {

    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });

    const navoffeset=$(".agileits_header").offset().top;
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

    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        const id = +$(this).data('id');
        
        if(id > 0) {
           const data = {
                id
            };

            $.ajax({
                url: 'cart/add',
                data
            })
            .done(function (res) {
                if(!res) alert('Произошла ошибка. Попробуйте еще раз');

                updateCartDialog(res, true);
            })
            .fail(function (error) {
                let res = {
                    'error': 'Произошла ошибка. Попробуйте еще раз'
                }
                console.log(res);
            });
        }
    });

    const $modal = $('#w0');
    $modal.find('.modal-body').on('click', '.del-item', function () {
        const id = +$(this).data('id');

        if(id > 0) {
            deleteItem(id);
         }
    })
    
    $('#clearCart').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'cart/clear-cart'
        })
        .done(function (res) {
            updateCartDialog('')
        })
        .fail(function (error) {
            let res = {
                'error': 'Произошла ошибка. Попробуйте еще раз'
            }
            console.log(res);
        });
    });

    $('.value-plus').on('click', function(){
        const $tr = $(this).closest("tr");
        const index = $tr.index();

        const divUpd = $(this).parent().find('.value');
        const newVal = parseInt(divUpd.text(), 10)+1;
        divUpd.text(newVal);
    });

    $('.value-minus').on('click', function(){
        const $tr = $(this).closest("tr");
        const index = $tr.index();

        const divUpd = $(this).parent().find('.value');
        const newVal = parseInt(divUpd.text(), 10)-1;

        if(newVal>=1) {
            
            divUpd.text(newVal);
        }
    });

    $('.removeItem').on('click', function(e){
        e.preventDefault();

        const $tr = $(this).closest("tr");
        const id = +$tr.data('id');

        if(id > 0) {
            $('.overlay').fadeIn();
            deleteItem(id)
            .then(data => {
                const $list = $('.total-list');
                const index = $tr.index();
                let res = 0;

                if(data.indexOf("<td id=\"cart-sum\">") !== -1){
                    res = data.split("<td id=\"cart-sum\">");
                    console.log(res[1].charAt(0));

                    res = res[1].split("<")[0];
                }
               
                $tr.fadeOut('slow').remove();
                
                $list.find('li')
                .last().find('span').text(res);

                $list.find('li').eq(index)
                .fadeOut('slow').remove()

                $('.overlay').fadeOut();

            })
            .catch(error => {
                console.log(error)
                $('.overlay').fadeOut();
            })

        }
    });

});

function updateCartDialog(cart, open) {

    const $modal = $('#w0');
    $modal.find('.modal-body').html(cart);
    if(open){
        $modal.modal();
    }
    
    const $sum = $('#cart-sum').text();
    const $cartSum = $sum ? $sum : '$0';

    $('.cart-sum').text($cartSum);
}

function deleteItem(id) {
    return new Promise((resolve, reject) => {
        const data = {
            id
        };

        $.ajax({
            url: 'cart/remove-item',
            data
        })
        .done(function (res) {
            if(!res) alert('Произошла ошибка. Попробуйте еще раз');

            updateCartDialog(res);
            resolve(res)
        })
        .fail(function (error) {
            reject(error)
        });
    });
}

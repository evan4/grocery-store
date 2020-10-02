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

            $.ajax({
                url: 'cart/add',
                data: {id}
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

    $modal.find('.modal-body')
    .on('click', '.del-item', function () {
        const id = +$(this).data('id');
        const index = +$(this).closest('tr').index();
        
        if(id > 0) {
            deleteItem(id)
            .then(res => {
               
                if($('.cart-table').length){
                    console.log(res);
                    removeUtemFromTable(res, index)
                }
            })
         }
    });
    
    $('#clearCart').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'cart/clear-cart'
        })
        .done(function (res) {
            updateCartDialog('');

            if($('.cart-table').length){
                removeUtemFromTable({
                    cart: {},
                    cartTemplate: res
                })
            }
        })
        .fail(function (error) {
            let res = {
                'error': 'Произошла ошибка. Попробуйте еще раз'
            }
            console.log(res);
        });
    });

    $('.value-plus, .value-minus').on('click', function(){
        const $tr = $(this).closest("tr");
        const index = $tr.index();
        const id = +$tr.data('id');
        const divUpd = $(this).parent().find('.value');
        
        const value = $(this).hasClass('value-plus') ? 1 : -1;

        const newVal = parseInt(divUpd.text(), 10)+value;

        if(newVal>0) {
            changeCartQuantity(id, value, index)
            .then(data => {
                divUpd.text(newVal);
            })
        }
        
    });

    $('.removeItem').on('click', function(e){
        e.preventDefault();

        const $tr = $(this).closest("tr");
        const id = +$tr.data('id');
        const index = $tr.index();

        if(id > 0) {
            $('.overlay').fadeIn();

            deleteItem(id)
            .then(res => {
                removeUtemFromTable(res, index);
            })
            .catch(error => {
                console.log(error)
                $('.overlay').fadeOut();
            })
        }
    });

});

function removeUtemFromTable(res, index) {

    const {cart, cartTemplate } = res;
    console.log(cart);
    console.log(index);
    if(cart['cart-sum'] > 0){
        const $list = $('.total-list');

        $('.timetable_sub tbody tr').eq(index)
        .fadeOut('slow').remove();
        
        $list.find('li')
        .last().find('span').text(cart['cart-sum']);

        $list.find('li').eq(index)
        .fadeOut('slow').remove()

        $('.overlay').fadeOut();
    }else{
        $('.checkout-right').fadeOut();
        $('.checkout-left').fadeOut();
        $('.privacy.about').append(cartTemplate)
    }
}

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

        $.ajax({
            url: 'cart/remove-item',
            data: {id}
        })
        .done(function (res) {
            if(!res) alert('Произошла ошибка. Попробуйте еще раз');

            updateCartDialog(res.cartTemplate);
            resolve(res)
        })
        .fail(function (error) {
            reject(error)
        });
    });
}

function changeCartQuantity(id, qty, index) {
    
    return new Promise((resolve, reject) => {
        
        $.ajax({
            url: 'cart/change-cart',
            data: {id, qty}
        })
        .done(function (res) {
            if(!res) alert('Произошла ошибка. Попробуйте еще раз');

            const {cart, cartTemplate, product } = res;

            const sum = product.price*product.qty;
            const $list = $('.total-list');
            $list.find('li').eq(index).find('span').text(`$${sum}`)

            // total sum
            $list.find('li')
                .last().find('span').text(`$${cart['cart-sum']}`);

            updateCartDialog(cartTemplate);

            resolve(cart)
        })
        .fail(function (error) {
            reject(error)
        });
    });
}



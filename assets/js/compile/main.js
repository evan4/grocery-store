"use strict";

jQuery(document).ready(function ($) {
  $(".scroll").click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });
  var navoffeset = $(".agileits_header").offset().top;
  $(window).scroll(function () {
    var scrollpos = $(window).scrollTop();

    if (scrollpos >= navoffeset) {
      $(".agileits_header").addClass("fixed");
    } else {
      $(".agileits_header").removeClass("fixed");
    }
  });
  $(".dropdown").hover(function () {
    $('.dropdown-menu', this).stop(true, true).slideDown("fast");
    $(this).toggleClass('open');
  }, function () {
    $('.dropdown-menu', this).stop(true, true).slideUp("fast");
    $(this).toggleClass('open');
  });
  $().UItoTop({
    easingType: 'easeOutQuart'
  });
  $('.flexslider').flexslider({
    animation: "slide",
    start: function start(slider) {
      $('body').removeClass('loading');
    }
  });
  $('#example').okzoom({
    width: 150,
    height: 150,
    border: "1px solid black",
    shadow: "0 0 5px #000"
  });
  $('.add-to-cart').on('click', function (e) {
    e.preventDefault();
    var id = +$(this).data('id');

    if (id > 0) {
      var data = {
        id: id
      };
      $.ajax({
        url: 'cart/add',
        data: data
      }).done(function (res) {
        if (!res) alert('Произошла ошибка. Попробуйте еще раз');
        showCart(res);
      }).fail(function (error) {
        var res = {
          'error': 'Произошла ошибка. Попробуйте еще раз'
        };
        console.log(res);
      });
    }
  });
  var $modal = $('#w0');
  $modal.find('.modal-body').on('click', '.del-item', function () {
    var id = +$(this).data('id');

    if (id > 0) {
      var data = {
        id: id
      };
      $.ajax({
        url: 'cart/remove-item',
        data: data
      }).done(function (res) {
        if (!res) alert('Произошла ошибка. Попробуйте еще раз');
        showCart(res);
      }).fail(function (error) {
        var res = {
          'error': 'Произошла ошибка. Попробуйте еще раз'
        };
        console.log(res);
      });
    }
  });
  $('#clearCart').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: 'cart/clear-cart'
    }).done(function (res) {
      showCart('');
    }).fail(function (error) {
      var res = {
        'error': 'Произошла ошибка. Попробуйте еще раз'
      };
      console.log(res);
    });
  });
});

function showCart(cart) {
  var $modal = $('#w0');
  $modal.find('.modal-body').html(cart);

  if (cart) {
    $modal.modal();
  }

  var $sum = $('#cart-sum').text();
  $cartSum = $sum ? $sum : '$0';
  $('.cart-sum').text($cartSum);
}
//# sourceMappingURL=main.js.map

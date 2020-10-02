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
      $.ajax({
        url: 'cart/add',
        data: {
          id: id
        }
      }).done(function (res) {
        if (!res) alert('Произошла ошибка. Попробуйте еще раз');
        updateCartDialog(res, true);
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
    var index = +$(this).closest('tr').index();

    if (id > 0) {
      deleteItem(id).then(function (res) {
        if ($('.cart-table').length) {
          console.log(res);
          removeUtemFromTable(res, index);
        }
      });
    }
  });
  $('#clearCart').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: 'cart/clear-cart'
    }).done(function (res) {
      updateCartDialog('');

      if ($('.cart-table').length) {
        removeUtemFromTable({
          cart: {},
          cartTemplate: res
        });
      }
    }).fail(function (error) {
      var res = {
        'error': 'Произошла ошибка. Попробуйте еще раз'
      };
      console.log(res);
    });
  });
  $('.value-plus, .value-minus').on('click', function () {
    var $tr = $(this).closest("tr");
    var index = $tr.index();
    var id = +$tr.data('id');
    var divUpd = $(this).parent().find('.value');
    var value = $(this).hasClass('value-plus') ? 1 : -1;
    var newVal = parseInt(divUpd.text(), 10) + value;

    if (newVal > 0) {
      changeCartQuantity(id, value, index).then(function (data) {
        divUpd.text(newVal);
      });
    }
  });
  $('.removeItem').on('click', function (e) {
    e.preventDefault();
    var $tr = $(this).closest("tr");
    var id = +$tr.data('id');
    var index = $tr.index();

    if (id > 0) {
      $('.overlay').fadeIn();
      deleteItem(id).then(function (res) {
        removeUtemFromTable(res, index);
      })["catch"](function (error) {
        console.log(error);
        $('.overlay').fadeOut();
      });
    }
  });
});

function removeUtemFromTable(res, index) {
  var cart = res.cart,
      cartTemplate = res.cartTemplate;
  console.log(cart);
  console.log(index);

  if (cart['cart-sum'] > 0) {
    var $list = $('.total-list');
    $('.timetable_sub tbody tr').eq(index).fadeOut('slow').remove();
    $list.find('li').last().find('span').text(cart['cart-sum']);
    $list.find('li').eq(index).fadeOut('slow').remove();
    $('.overlay').fadeOut();
  } else {
    $('.checkout-right').fadeOut();
    $('.checkout-left').fadeOut();
    $('.privacy.about').append(cartTemplate);
  }
}

function updateCartDialog(cart, open) {
  var $modal = $('#w0');
  $modal.find('.modal-body').html(cart);

  if (open) {
    $modal.modal();
  }

  var $sum = $('#cart-sum').text();
  var $cartSum = $sum ? $sum : '$0';
  $('.cart-sum').text($cartSum);
}

function deleteItem(id) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'cart/remove-item',
      data: {
        id: id
      }
    }).done(function (res) {
      if (!res) alert('Произошла ошибка. Попробуйте еще раз');
      updateCartDialog(res.cartTemplate);
      resolve(res);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function changeCartQuantity(id, qty, index) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'cart/change-cart',
      data: {
        id: id,
        qty: qty
      }
    }).done(function (res) {
      if (!res) alert('Произошла ошибка. Попробуйте еще раз');
      var cart = res.cart,
          cartTemplate = res.cartTemplate,
          product = res.product;
      var sum = product.price * product.qty;
      var $list = $('.total-list');
      $list.find('li').eq(index).find('span').text("$".concat(sum)); // total sum

      $list.find('li').last().find('span').text("$".concat(cart['cart-sum']));
      updateCartDialog(cartTemplate);
      resolve(cart);
    }).fail(function (error) {
      reject(error);
    });
  });
}
//# sourceMappingURL=main.js.map

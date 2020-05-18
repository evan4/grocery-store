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

    if (id > 0) {
      deleteItem(id);
    }
  });
  $('#clearCart').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: 'cart/clear-cart'
    }).done(function (res) {
      updateCartDialog('');
    }).fail(function (error) {
      var res = {
        'error': 'Произошла ошибка. Попробуйте еще раз'
      };
      console.log(res);
    });
  });
  $('.value-plus').on('click', function () {
    var $tr = $(this).closest("tr");
    var index = $tr.index();
    var divUpd = $(this).parent().find('.value');
    var newVal = parseInt(divUpd.text(), 10) + 1;
    divUpd.text(newVal);
  });
  $('.value-minus').on('click', function () {
    var $tr = $(this).closest("tr");
    var index = $tr.index();
    var divUpd = $(this).parent().find('.value');
    var newVal = parseInt(divUpd.text(), 10) - 1;

    if (newVal >= 1) {
      divUpd.text(newVal);
    }
  });
  $('.removeItem').on('click', function (e) {
    e.preventDefault();
    var $tr = $(this).closest("tr");
    var id = +$tr.data('id');

    if (id > 0) {
      $('.overlay').fadeIn();
      deleteItem(id).then(function (data) {
        var $list = $('.total-list');
        var index = $tr.index();
        var res = 0;

        if (data.indexOf("<td id=\"cart-sum\">") !== -1) {
          res = data.split("<td id=\"cart-sum\">");
          console.log(res[1].charAt(0));
          res = res[1].split("<")[0];
        }

        $tr.fadeOut('slow').remove();
        $list.find('li').last().find('span').text(res);
        $list.find('li').eq(index).fadeOut('slow').remove();
        $('.overlay').fadeOut();
      })["catch"](function (error) {
        console.log(error);
        $('.overlay').fadeOut();
      });
    }
  });
});

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
    var data = {
      id: id
    };
    $.ajax({
      url: 'cart/remove-item',
      data: data
    }).done(function (res) {
      if (!res) alert('Произошла ошибка. Попробуйте еще раз');
      updateCartDialog(res);
      resolve(res);
    }).fail(function (error) {
      reject(error);
    });
  });
}
//# sourceMappingURL=main.js.map

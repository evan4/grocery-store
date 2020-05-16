<?php

namespace app\models;

use Yii;
use yii\base\Model;

class Cart extends Model
{

  public function addToCart($product, $qty = 1)
  {

    $session = Yii::$app->session;
   /*  unset($session['cart']);
    unset($session['cart-sum']);
    unset($session['cart-qty']); */
    
    if(isset($session['cart'][$product->id])){
      $_SESSION['cart'][$product->id]['qty'] = $session['cart'][$product->id]['qty'] + $qty;
    }else{
      $_SESSION['cart'][$product->id] = [
          'title' => $product->title,
          'price' => $product->price,
          'img' => $product->img,
          'qty' => $qty
      ];
    }
    
    if ($session->has('cart-qty')){
      $session->set('cart-qty', $session->get('cart-qty') + $qty);
    }else{
      $session->set('cart-qty', $qty);
    }
    
    $sum = 0;
   
    foreach ($session['cart'] as $product) {
      $sum += (float)$product['price'] * $product['qty'];
    }

    $session->set('cart-sum', $sum);

  }

  public function deleteItemCart($id)
  {
    $session = Yii::$app->session;
    $product = $session['cart'][$id];

    $session->set('cart-qty', $session->get('cart-qty') + $product['qty']);

    $sum = $session->get('cart-sum') - ((float)$product['price'] * $product['qty']);

    $session->set('cart-sum', $sum);
    unset($_SESSION['cart'][$id]);
  }

  public function clearCart()
  {
    $session = Yii::$app->session;
    $session->remove('cart');
    $session->set('cart-qty',0);
    $session->set('cart-sum', 0);
  }
}

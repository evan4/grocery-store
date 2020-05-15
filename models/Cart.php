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
    unset($session['cart-sum']); */
    
    if(isset($session['cart'][$product->id])){
      $_SESSION['cart'][$product->id]['qty'] = $session['cart'][$product->id]['qty'] + $qty;
    }else{
      $_SESSION['cart'][$product->id] = [
          'title' => $product->title,
          'price' => $product->price,
          'image' => $product->img,
          'qty' => $qty
      ];
    }
    
    if ($session->has('cart-qty')){
      $session->set('cart-qty', $session->get('cart-qty') + $qty);
    }else{
      $session->set('cart-qty', $qty);
    }
    
    $sum = $session->has('cart-sum') ? $session->get('cart-sum') : 0;
   
    foreach ($session['cart'] as $product) {
      $sum += (float)$product['price'] * $product['qty'];
    }

    $session->set('cart-sum', $sum);

    

  }
}

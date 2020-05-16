<?php

namespace app\controllers;

use Yii;
use app\models\Category;
use app\models\Product;
use app\models\Cart;

class CartController extends AppController
{
  public function actionAdd($id)
  {
    $product = Product::findOne($id);
    
    if (empty($product)) {
      return false;
    }
    
    $session = Yii::$app->session;
    $session->open();
    $cart = new Cart();
    $cart->addToCart($product);
    $cart = [
      'products' => $session->get('cart'),
      'cart-qty' => $session->get('cart-qty'),
      'cart-sum' => $session->get('cart-sum'),
    ];
    
    if (Yii::$app->request->isAjax) {
      return $this->renderPartial('cart-modal', compact('cart'));
    }

    return $this->redirect(Yii::$app->request->referrer);
  }

  public function actionRemoveItem($id)
  {
    $session = Yii::$app->session;
    $session->open();

    if(!isset($session['cart'][$id])){
      return false;
    }

    $cart = new Cart();
    $cart->deleteItemCart($id);
    $cart = [
      'products' => $session->get('cart'),
      'cart-qty' => $session->get('cart-qty'),
      'cart-sum' => $session->get('cart-sum'),
    ];

    if (Yii::$app->request->isAjax) {
      return $this->renderPartial('cart-modal', compact('cart'));
    }

    return $this->redirect(Yii::$app->request->referrer);
  }

  public function actionClearCart()
  {
    $session = Yii::$app->session;
    $session->open();

    $cart = new Cart();
    $cart->clearCart();

    $cart = [
      'products' => $session->get('cart'),
      'cart-qty' => $session->get('cart-qty'),
      'cart-sum' => $session->get('cart-sum'),
    ];

    if (Yii::$app->request->isAjax) {
      return $this->renderPartial('cart-modal', compact('cart'));
    }
    
    return $this->redirect(Yii::$app->request->referrer);
  }

}

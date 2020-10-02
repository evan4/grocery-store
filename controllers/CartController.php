<?php

namespace app\controllers;

use Yii;
use yii\web\Response;

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
    Yii::$app->response->format = Response::FORMAT_JSON;
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
      return [
        'cartTemplate' => $this->renderPartial('cart-modal', compact('cart')),
        'cart' => $cart
      ];
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

  public function actionView()
  {
    $session = Yii::$app->session;
    $cart = [
      'products' => $session->get('cart'),
      'cart-qty' => $session->get('cart-qty'),
      'cart-sum' => $session->get('cart-sum'),
    ];
    $this->setMeta(
      "Оформление заказа: ". Yii::$app->name
    );
    return $this->render('checkout', compact('cart'));
  }

  public function actionChangeCart($id, $qty)
  {
    Yii::$app->response->format = Response::FORMAT_JSON;
    $session = Yii::$app->session;
    $session->open();

    if(!isset($session['cart'][$id])){
      return false;
    }

    $product = (object)[];
    $product->id = $id;
    $product->title = $session['cart'][$id]['title'];
    $product->price = $session['cart'][$id]['price'];
    $product->img = $session['cart'][$id]['img'];
    $product->qty = $session['cart'][$id]['qty'];
    
    $cart = new Cart();
    $cart->addToCart($product, $qty);

    $cart = [
      'products' => $session->get('cart'),
      'cart-qty' => $session->get('cart-qty'),
      'cart-sum' => $session->get('cart-sum'),
    ];
    
    if (Yii::$app->request->isAjax) {
      return [
        'cartTemplate' => $this->renderPartial('cart-modal', compact('cart')),
        'cart' => $cart,
        'product' => $cart['products'][$id]
      ];
    }

  }
}

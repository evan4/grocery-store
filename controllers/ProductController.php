<?php

namespace app\controllers;

use Yii;
use app\models\Product;

class ProductController extends AppController
{

  public function actionView($id)
  {
    $product = Product::findOne($id);
    
    if (empty($product)) {
     throw new NotFoundHttpException('Этого товара нет');
    }

    $this->setMeta(
      "{$product->title} :: ". Yii::$app->name,
      $product->keywords,
      $product->description
    );
    
    return $this->render('view', compact('product'));
  }
  
}

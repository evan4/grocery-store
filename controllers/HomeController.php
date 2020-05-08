<?php

namespace app\controllers;

use Yii;
use app\models\Product;

class HomeController extends AppController
{

  public function beforeAction($action)
  {
    $this->view->title = Yii::$app->name;
    return parent::beforeAction($action);
  }

  public function actionIndex()
  {
    $offers = Product::find()->where(['is_offer' => 1])->limit(4)->all();

    return $this->render('index', compact('offers'));
  }
  
}

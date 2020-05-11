<?php

namespace app\controllers;

use Yii;
use app\models\Category;
use app\models\Product;
use yii\web\NotFoundHttpException;
use yii\data\Pagination;

class CategoryController extends AppController
{
  public function actionView($id)
  {
    $category = Category::findOne($id);

    if (empty($category)) {
      throw new NotFoundHttpException('Этой категории нет');
    }

    $this->setMeta(
      "{$category->title} :: ". Yii::$app->name,
      $category->keywords,
      $category->description
    );

    $query = Product::find()->where(['category_id' => $id]);
    $countQuery = clone $query;
    $pages = new Pagination([
      'totalCount' => $countQuery->count(),
      'pageSize' => 3,
      'forcePageParam' => false,
      'pageSizeParam' => false
    ]);
    $products = $query->offset($pages->offset)
        ->limit($pages->limit)
        ->all();

    return $this->render('view', compact('products', 'category', 'pages'));
  }

  public function actionSearch()
  {
    $q = trim(Yii::$app->request->get('q'));
    
    $this->setMeta(
      "Поиск {$q} :: ". Yii::$app->name
    );

    if (!$q) {
      return $this->render('search');
    }

    $query = Product::find()->where(['ILIKE', 'title', $q]);
    
    $countQuery = clone $query;
    $pages = new Pagination([
      'totalCount' => $countQuery->count(),
      'pageSize' => 3,
      'forcePageParam' => false,
      'pageSizeParam' => false
    ]);

    $products = $query->offset($pages->offset)
        ->limit($pages->limit)
        ->all();
     
    return $this->render('search', compact('products', 'pages', 'q'));

  }
}

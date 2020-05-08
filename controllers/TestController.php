<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\EntryForm;
use app\models\Country;
use yii\web\Response;
use yii\widgets\ActiveForm;

class TestController extends Controller
{

    public $data = [
        [
          'code' => 'AU',
          'name' => 'Australia',
          'population' => 25499884
        ],
        [
          'code' => 'BR',
          'name' => 'Brazil',
          'population' => 212559417
        ],
        [
          'code' => 'CA',
          'name' => 'Canada',
          'population' => 37742154
        ],
        [
          'code' => 'CN',
          'name' => 'China',
          'population' => 1439323776
        ],
        [
          'code' => 'DE',
          'name' => 'Germany',
          'population' => 83783942
        ],
        [
          'code' => 'FR',
          'name' => 'France',
          'population' => 65273511
        ],
        [
          'code' => 'GB',
          'name' => 'United Kingdom',
          'population' => 67886011
        ],
        [
          'code' => 'IN',
          'name' => 'India',
          'population' => 1380004385
        ],
        [
          'code' => 'RU',
          'name' => 'Russia',
          'population' => 145934462
        ]
    ];
    

  /**
     * Displays about page.
     *
     * @return string
     */
    public function actionIndex()
    {
        $model = new EntryForm();

        if ($model->load(Yii::$app->request->post())) {
            if(Yii::$app->request->isAjax){
                Yii::$app->response->format = Response::FORMAT_JSON;
                
                if($model->validate()){
                    return [
                        'data' => [
                            'success' => true,
                            'model' => $model,
                            'message' => 'Model has been saved.',
                        ],
                        'code' => 0,
                    ];
                }else{
                    return ActiveForm::validate($model);
                }
                
            }else{
               Yii::$app->session->setFlash('success', 'Form was send');
                return $this->render('index', compact('model')); 
            }
            
        }
        // либо страница отображается первый раз, либо есть ошибка в данных
        return $this->render('index', compact('model'));

    }

    public function actionPosts()
    {
      $countries = Country::find()
      /* ->where(
        ['code' => ['DE', 'FR', 'GB']]
      ) */
      ->asArray()->all();
      return $this->render('view', compact('countries'));
    }

    public function actionFillCountry()
    {
      //Country::deleteAll();

      $country = new Country();
      //Yii::$app->db->createCommand()->truncateTable('country')->execute();
 /*     foreach ($this->data as $key => $value) {
           
            $country = new Country();
            $country->attributes = $value;
           
            $country->save();
            
       } */
        $countries = Country::find()->asArray()->all();
        echo '<pre>';
              print_r($countries);
          echo '</pre>';
        return true;
    }

    public function actionCreate()
    {
      $country = new Country();
      $this->view->title = 'Create';

      if (Yii::$app->request->isAjax && $country->load(Yii::$app->request->post())) {
        Yii::$app->response->format = Response::FORMAT_JSON;
        return ActiveForm::validate($country);
      }
      
      if($country->load(Yii::$app->request->post()) && $country->validate()){
        $country->save();
        Yii::$app->session->setFlash('success', 'Страна добавлена');
      }

      return $this->render('create', compact('country'));
    }

    public function actionUpdate()
    {
      $country = Country::findOne(1);
      $this->view->title = 'Create';

      if (Yii::$app->request->isAjax && $country->load(Yii::$app->request->post())) {
        Yii::$app->response->format = Response::FORMAT_JSON;
        return ActiveForm::validate($country);
      }
      
      if($country->load(Yii::$app->request->post()) && $country->validate()){
        $country->save();
        Yii::$app->session->setFlash('success', 'Страна Оновлена');
      }

      return $this->render('update', compact('country'));
    }


}

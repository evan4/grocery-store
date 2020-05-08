<?php

namespace app\models;

use yii\db\ActiveRecord;

class Country extends ActiveRecord
{
  public $status;

  public function rules()
  {
      return [
          [['code', 'name', 'population'], 'required'],
          ['code', 'unique'],
          ['population', 'integer']
      ];
  }

  public function attributeLabels()
  {
    return [
      'code' => 'Код страны',
      'name' => 'Страна',
      'population' => 'Население'
    ];
  }
}

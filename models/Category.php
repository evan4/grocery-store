<?php

namespace app\models;

use yii\db\ActiveRecord;

class Category extends ActiveRecord
{

   /**
   * @return string название таблицы, сопоставленной с этим ActiveRecord-классом.
   */
  public static function tableName()
  {
      return '{{%categories}}';
  }

  public function rules()
  {
      return [
          [['parent_id', 'title'], 'required'],
          ['title', 'unique'],
          ['parent_id', 'integer']
      ];
  }

 /*  public function attributeLabels()
  {
    return [
      'code' => 'Код страны',
      'name' => 'Страна',
      'population' => 'Население'
    ];
  } */
}

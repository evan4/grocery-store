<?php

namespace app\models;

use yii\base\Model;

class EntryForm extends Model
{
  public $name;
  public $email;
  public $text;

  public function rules()
  {
      return [
          [['name', 'email', 'text'], 'required'],
          ['email', 'email'],
      ];
  }

}

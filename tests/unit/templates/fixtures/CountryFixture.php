<?php
namespace app\tests\fixtures;
 
use yii\test\ActiveFixture;

class CountryFixture extends ActiveFixture
{
  public $modelClass = 'app\models\Country';
  public $dataFile = '@tests/unit/templates/fixtures/data/country.php';
}

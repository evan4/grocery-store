<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>
<h1><?=$this->title;?></h1>
<?php $form = ActiveForm::begin([
  'id' => "my-form",
  'options' => [
    'class' => 'form-horizontal'
  ],
  'fieldConfig' => [
    'template' => "{label} <div class=\"col-md-5\">{input}</div><div class=\"col-md-5\">{hint}</div><div class=\"col-md-5\">{error}</div>",
    'labelOptions' => ['class' => 'col-md-2 control-label']
  ]
]); ?>
<?= $form->field($country, 'code', ['enableAjaxValidation' => true]); ?>
<?= $form->field($country, 'name'); ?>
<?= $form->field($country, 'population'); ?>
<?= $form->field($country, 'status')->checkbox(['labelOptions' => ['class' => 'col-md-offset-5']]); ?>
<div class="form-group">
    <div class="col-md-5 col-md-offset-2">
      <?= Html::submitButton('Отправить', ['class' => 'btn btn-primary btn-block']) ?>
    </div>
  </div>
<?php ActiveForm::end(); ?>

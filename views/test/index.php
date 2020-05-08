<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>

<h1>Form</h1>
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
  <?= $form->field($model, 'name'); ?>
  <?= $form->field($model, 'email')->input('email'); ?>
  <?= $form->field($model, 'text')->textarea(); ?>
  <div class="form-group">
    <div class="col-md-5 col-md-offset-2">
      <?= Html::submitButton('Отправить', ['class' => 'btn btn-primary btn-block']) ?>
    </div>
  </div>
<?php ActiveForm::end(); ?>

<?php
$js = <<<JS
    $('#my-form').on('beforeSubmit', function(){
      
      const data = $(this).serializeArray();
      const url = $(this).attr('action');
      $.ajax({
          url: url,
          type: 'post',
          dataType: 'json',
          data: data
      })
      .done(function(response) {
        console.log(response);
      })
      .fail(function() {
          console.log("error");
      });
      $('#my-form')[0].reset();
      return false;
    });
JS;
 
$this->registerJs($js);
?>
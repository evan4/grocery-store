<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>

<h1>Работа с моделями</h1>
<table class="table">
  <thead>
    <tr>
      <th>Код</th>
      <th>Название</th>
      <th>Численность</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($countries as $key => $country) { ?>
      <tr>
        <td><?=$country['code'];?></td>
        <td><?=$country['name'];?></td>
        <td><?=$country['population'];?></td>
      </tr>
    <?php } ?>
  </tbody>
</table>
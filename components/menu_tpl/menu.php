<?php
use yii\helpers\Url;

if(isset($category['children'])): ?>
<li class="dropdown">
  <a class="dropdown-toggle" data-toggle="dropdown"
    href="<?=Url::to(['category/view', 'id' => $category['id']]);?>"><?=$category['title'];?></a>
  <div class="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
    <div class="w3ls_vegetables">
      <ul>
        <?= $this->getMenuHtml($category['children']); ?>
      </ul>
    </div>                  
  </div>
</li>
<?php else: ?>
<li>
  <a href="<?=Url::to(['category/view', 'id' => $category['id']]); ?>"><?=$category['title']; ?></a>
</li>
<?php endif; ?>

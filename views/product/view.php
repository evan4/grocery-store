<?php
use yii\widgets\LinkPager;
use yii\helpers\Html;
use yii\helpers\Url;
?>

<!-- products-breadcrumb -->
<div class="products-breadcrumb">
    <div class="container">
        <ul>
            <li><i class="fa fa-home" aria-hidden="true"></i><a href="<?= Url::home() ?>">Home</a><span>|</span></li>
            <li>
                <a href="<?=Url::to(['category/view', 'id' => $product->category->id]) ?>"><?=$product->category->title ?></a>
                <span>|</span>
            </li>
            <li><?= $product->title; ?></li>
        </ul>
    </div>
</div>
<!-- //products-breadcrumb -->
<!-- banner -->
<div class="banner">
    <?= $this->render('//layouts/inc/sidebar') ?>

    <div class="w3l_banner_nav_right">
        <div class="w3l_banner_nav_right_banner3">
            <h3>Best Deals For New Products<span class="blink_me"></span></h3>
        </div>
        <div class="agileinfo_single">
            <h5><?= $product->title ?></h5>
            <div class="col-md-4 agileinfo_single_left">
                <?= Html::img("@web/products/{$product->img}", 
                ['alt' => $product->title, 'id' => 'example', 'class' => 'img-responsive']) ?>
            </div>
            <div class="col-md-8 agileinfo_single_right">
                <div class="rating1">
						<span class="starRating">
							<input id="rating5" type="radio" name="rating" value="5">
							<label for="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4">
							<label for="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" checked>
							<label for="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2">
							<label for="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1">
							<label for="rating1">1</label>
						</span>
                </div>
                <div class="w3agile_description">
                    <h4>Description :</h4>
                    <p><?= $product->content ?></p>
                </div>
                <div class="snipcart-item block">
                    <div class="snipcart-thumb agileinfo_single_right_snipcart">
                        <h4>
                            $<?= $product->price ?>
                            <?php if((float)$product->old_price): ?>
                                <span>$<?= $product->old_price ?></span>
                            <?php endif; ?>
                        </h4>
                    </div>
                    <div class="snipcart-details agileinfo_single_right_details">
                        <?=Html::a('Добавить в корзину', ['cart/add', 'id' => $product->id],
                            ['class' => 'btn btn-danger btn-block add-to-cart', 'data-id' => $product->id]
                        );?>
                    </div>
                </div>
            </div>
            <div class="clearfix"> </div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
<!-- //banner -->
<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%products}}`.
 */
class m200507_105559_create_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%products}}', [
            'id' => $this->primaryKey(),
            'category_id' => $this->integer()->unsigned()->notNull()->defaultValue(0),
            'title' => $this->string()->notNull(),
            'content' => $this->text()->notNull(),
            'price' => $this->decimal(6,2)->notNull()->defaultValue(0.00),
            'old_price' => $this->decimal(6,2)->notNull()->defaultValue(0.00),
            'description' => $this->string(),
            'keywords' => $this->string(),
            'img' => $this->string()->notNull()->defaultValue('no-image.png'),
            'is_offer' => $this->tinyInteger()->unsigned()->notNull()->defaultValue(0)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%products}}');
    }
}

<?php

use Codeception\Util\Fixtures;

/*
 * Используем класс Fixtures для хранения фикстур
 * FIXTURES_DIR - константа заданная в главном файле _bootstrap
 */
Fixtures::add('country', require(FIXTURES_DIR . 'country.php'));
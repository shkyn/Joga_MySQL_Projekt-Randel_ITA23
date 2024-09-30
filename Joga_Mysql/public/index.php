<?php

use App\Service\Templating;
use DI\Container;
use Slim\Factory\AppFactory;

require('../vendor/autoload.php');

// register services
$container = new Container();

$container->set('templating', function() {
    return new Templating;
});

AppFactory::setContainer($container);

// initialise application
$app = AppFactory::create();

// define page routes
$app->get('/', '\App\Controller\DefaultController:homepage');
$app->get('/admin', '\App\Controller\AdminController:view');
$app->any('/admin/create', '\App\Controller\AdminController:create');
$app->any('/admin/{id}', '\App\Controller\AdminController:edit');

// finish
$app->run();
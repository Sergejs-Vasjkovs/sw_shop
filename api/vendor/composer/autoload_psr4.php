<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(__DIR__);
$baseDir = dirname($vendorDir);

return array(
    'GraphQL\\' => array($vendorDir . '/webonyx/graphql-php/src'),
    'FastRoute\\' => array($vendorDir . '/nikic/fast-route/src'),
    'App\\Schema\\' => array($baseDir . '/src/Schema'),
    'App\\Resolvers\\' => array($baseDir . '/src/Resolvers'),
    'App\\Controller\\' => array($baseDir . '/src/Controller'),
    'App\\Config\\' => array($baseDir . '/src/config'),
    'App\\' => array($baseDir . '/src'),
);

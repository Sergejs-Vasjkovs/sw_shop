<?php

namespace App\Type;

use App\Model\Category;
use App\Model\Product;
use App\Types;
use GraphQL\Type\Definition\ObjectType;

class QueryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Query',
            'fields' => function () {
                return [
                    'categories' => [
                        'type' => Types::listOf(Types::category()),
                        'resolve' => function ($rootValue, $args, $context) {
                            $pdo = $context["db"];
                            return (new Category($pdo))->getAll();
                        }
                    ],
                    'products' => [
                        'type' => Types::listOf(Types::product()),
                        'resolve' => function ($rootValue, $args, $context) {
                            $pdo = $context["db"];
                            return (new Product($pdo))->getAll();
                        }
                    ],
                    'product' => [
                        'type' => Types::product(),
                        'args' => [
                            'id' => Types::nonNull(Types::string())
                        ],
                        'resolve' => function ($rootValue, $args, $context) {
                            $pdo = $context["db"];
                            return (new Product($pdo))->getById($args['id']);
                        }
                    ],
                ];
            },
        ];

        parent::__construct($config);
    }
}

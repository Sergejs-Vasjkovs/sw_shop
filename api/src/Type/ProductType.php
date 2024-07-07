<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\ObjectType;
use App\Model\ProductAttributes;
use App\Model\ProductGallery;
use App\Model\ProductPrice;

class ProductType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Product',
            'fields' => function () {
                return [
                    'id' => Types::string(),
                    'name' => Types::string(),
                    'inStock' => Types::boolean(),
                    'description' => Types::string(),
                    'category_id' => Types::int(),
                    'brand' => Types::string(),
                    'attributes' => [
                        'type' => Types::listOf(Types::productAttribute()),
                        'resolve' => function ($root, $args, $context) {
                            $pdo = $context["db"];
                            $id = $root['id'];
                            return (new ProductAttributes($pdo, $id))->getAll();
                        }
                    ],
                    'gallery' => [
                        'type' => Types::listOf(Types::productGallery()),
                        'resolve' => function ($root, $args, $context) {
                            $pdo = $context["db"];
                            $id = $root['id'];
                            return (new ProductGallery($pdo, $id))->getAll();
                        }
                    ],
                    'prices' => [
                        'type' => Types::listOf(Types::productPrice()),
                        'resolve' => function ($root, $args, $context) {
                            $pdo = $context["db"];
                            $id = $root['id'];
                            return (new ProductPrice($pdo, $id))->getAll();
                        }
                    ],
                ];
            },
        ];

        parent::__construct($config);
    }
}

<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;
use App\Resolver\CategoryResolver;
use App\Resolver\ProductResolver;

class QueryType extends BaseType
{
    private CategoryResolver $categoryResolver;
    private ProductResolver $productResolver;

    public function __construct(
        CategoryResolver $categoryResolver,
        ProductResolver $productResolver
    ) {
        $this->categoryResolver = $categoryResolver;
        $this->productResolver = $productResolver;

        $config = [
            'name' => 'Query',
            'fields' => function () {
                return [
                    'categories' => [
                        'type' => Types::listOf(Types::category()),
                        'resolve' => fn($root, $args, $context) =>
                        $this->categoryResolver->resolveCategories($root, $args, $context)
                    ],
                    'products' => [
                        'type' => Types::listOf(Types::product()),
                        'resolve' => fn($root, $args, $context) =>
                        $this->productResolver->resolveProducts($root, $args, $context)
                    ],
                    'product' => [
                        'type' => Types::product(),
                        'args' => [
                            'id' => Types::nonNull(Types::string())
                        ],
                        'resolve' => fn($root, $args, $context) =>
                        $this->productResolver->resolveProduct($root, $args, $context)
                    ],
                ];
            },
        ];

        parent::__construct($config);
    }
}

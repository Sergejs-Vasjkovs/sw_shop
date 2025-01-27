<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;
use App\Resolver\ProductResolver;

class ProductType extends BaseType
{
    private ProductResolver $resolver;

    public function __construct(ProductResolver $resolver)
    {
        $this->resolver = $resolver;

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
                        'resolve' => fn($root, $args, $context) =>
                        $this->resolver->resolveAttributes($root, $args, $context)
                    ],
                    'gallery' => [
                        'type' => Types::listOf(Types::productGallery()),
                        'resolve' => fn($root, $args, $context) =>
                        $this->resolver->resolveGallery($root, $args, $context)
                    ],
                    'prices' => [
                        'type' => Types::listOf(Types::productPrice()),
                        'resolve' => fn($root, $args, $context) =>
                        $this->resolver->resolvePrices($root, $args, $context)
                    ],
                ];
            },
        ];

        parent::__construct($config);
    }
}

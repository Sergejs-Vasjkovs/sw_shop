<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;
use App\Resolver\OrderResolver;

class MutationType extends BaseType
{
    private OrderResolver $orderResolver;

    public function __construct(OrderResolver $orderResolver)
    {
        $this->orderResolver = $orderResolver;

        $config = [
            'name' => 'Mutation',
            'fields' => function () {
                return [
                    'createOrders' => [
                        'type' => Types::listOf(Types::order()),
                        'args' => [
                            'options' => Types::listOf(Types::options())
                        ],
                        'resolve' => fn($root, $args, $context) =>
                        $this->orderResolver->createOrders($root, $args, $context)
                    ],
                ];
            }
        ];

        parent::__construct($config);
    }
}

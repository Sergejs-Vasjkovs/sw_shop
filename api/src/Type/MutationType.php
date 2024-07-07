<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\ObjectType;
use App\Model\Order;

class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Mutation',
            'fields' => function () {
                return [
                    'createOrders' => [
                        'type' => Types::listOf(Types::order()),
                        'args' => [
                            'options' => Types::listOf(Types::options())
                        ],
                        'resolve' => function ($rootValue, $args, $context) {
                            $orders = $args['options'];
                            $pdo = $context["db"];
                            $results = [];
                            foreach ($orders as $options) {
                                $result = (new Order($pdo, $options['product_id'], $options['options'], $options['quantity']))->insertOrder($orders);
                                if ($result) {
                                    $results[] = [
                                        'id' => $result,
                                        'product_id' => $options['product_id'],
                                        'options' => $options['options'],
                                        'quantity' => $options['quantity'],
                                    ];
                                }
                            }
                            return $results;
                        }
                    ],
                ];
            }
        ];

        parent::__construct($config);
    }
}

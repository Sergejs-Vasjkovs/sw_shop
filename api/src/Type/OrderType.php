<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\ObjectType;

class OrderType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'order',
            'fields' => function () {
                return [
                    'id' => Types::string(),
                    'product_id' => Types::string(),
                    'options' => Types::string(),
                    'quantity' => Types::int(),
                    'created_at' => Types::string(),
                ];
            },
        ];

        parent::__construct($config);
    }
}

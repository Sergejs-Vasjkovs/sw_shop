<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use App\Types;

class ProductPriceType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'ProductPrice',
            'fields' => [
                'id' => Types::int(),
                'product_id' => Types::string(),
                'amount' => Types::float(),
                'currency' => Types::string(),
                'symbol' => Types::string(),
            ],
        ];

        parent::__construct($config);
    }
}

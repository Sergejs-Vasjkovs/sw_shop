<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;

class OrderType extends BaseType
{
    public function __construct()
    {
        $config = [
            'name' => 'Order',
            'fields' => [
                'id' => Types::string(),
                'product_id' => Types::string(),
                'options' => Types::string(),
                'quantity' => Types::int(),
                'created_at' => Types::string(),
            ],
        ];

        parent::__construct($config);
    }
}

<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;

class ProductPriceType extends BaseType
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

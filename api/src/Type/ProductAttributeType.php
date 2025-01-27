<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;

class ProductAttributeType extends BaseType
{
    public function __construct()
    {
        $config = [
            'name' => 'ProductAttribute',
            'fields' => [
                'id' => Types::int(),
                'product_id' => Types::string(),
                'attribute_name' => Types::string(),
                'attribute_value' => Types::string(),
                'attribute_display' => Types::string(),
            ],
        ];

        parent::__construct($config);
    }
}

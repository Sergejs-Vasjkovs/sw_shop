<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\ObjectType;

class AttributesType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Attributes',
            'fields' => function () {
                return [
                    'product_id' => Types::string(),
                    'attribute_name' => Types::string(),
                    'attribute_value' => Types::string()
                ];
            }
        ];

        parent::__construct($config);
    }
}

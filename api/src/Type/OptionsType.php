<?php

namespace App\Type;

use GraphQL\Type\Definition\InputObjectType;
use App\Types;

class OptionsType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'OptionsInput',
            'fields' => function () {
                return [
                    'product_id' => Types::string(),
                    'options' => Types::string(),
                    'quantity' => Types::int(),
                ];
            }
        ];

        parent::__construct($config);
    }
}

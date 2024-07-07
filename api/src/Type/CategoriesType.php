<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\ObjectType;

class CategoriesType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Category',
            'fields' => function () {
                return [
                    'name' => Types::string(),
                    'id' => Types::string(),
                ];
            }
        ];

        parent::__construct($config);
    }
}

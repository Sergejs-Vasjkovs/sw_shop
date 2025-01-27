<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;

class CategoriesType extends BaseType
{
    public function __construct()
    {
        $config = [
            'name' => 'Category',
            'fields' => [
                'id' => Types::int(),
                'name' => Types::string(),
            ],
        ];

        parent::__construct($config);
    }
}

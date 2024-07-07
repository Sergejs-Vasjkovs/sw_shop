<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use App\Types;

class ProductGalleryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'ProductGallery',
            'fields' => [
                'id' => Types::int(),
                'product_id' => Types::string(),
                'image_url' => Types::string(),
            ],
        ];

        parent::__construct($config);
    }
}

<?php

declare(strict_types=1);

namespace App\Type;

use App\Types;

class ProductGalleryType extends BaseType
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

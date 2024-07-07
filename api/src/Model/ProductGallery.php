<?php

namespace App\Model;

class ProductGallery extends AbstractProductDetails
{
    protected $table = "product_gallery";

    public function __construct($db, $id)
    {
        parent::__construct($db, $id);
    }
}

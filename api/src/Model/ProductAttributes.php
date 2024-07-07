<?php

namespace App\Model;

class ProductAttributes extends AbstractProductDetails
{
    protected $table = "product_attributes";

    public function __construct($db, $id)
    {
        parent::__construct($db, $id);
    }
}

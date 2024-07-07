<?php

namespace App\Model;

class ProductPrice extends AbstractProductDetails
{
    protected $table = "product_prices";

    public function __construct($db, $id)
    {
        parent::__construct($db, $id);
    }
}

<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class ProductPrice extends AbstractProductDetails
{
    protected string $table = "product_prices";

    public function __construct(PDO $db, string $id)
    {
        parent::__construct($db, $id);
    }
}

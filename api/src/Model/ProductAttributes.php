<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class ProductAttributes extends AbstractProductDetails
{
    protected string $table = "product_attributes";

    public function __construct(PDO $db, string $id)
    {
        parent::__construct($db, $id);
    }
}

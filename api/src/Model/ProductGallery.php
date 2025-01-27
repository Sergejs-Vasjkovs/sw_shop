<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class ProductGallery extends AbstractProductDetails
{
    protected string $table = "product_gallery";

    public function __construct(PDO $db, string $id)
    {
        parent::__construct($db, $id);
    }
}

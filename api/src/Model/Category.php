<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class Category extends AbstractModel
{
    protected string $table = "categories";

    public function __construct(PDO $db)
    {
        parent::__construct($db);
    }
}

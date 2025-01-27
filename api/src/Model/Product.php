<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class Product extends AbstractModel
{
    protected string $table = "products";

    public function __construct(PDO $db)
    {
        parent::__construct($db);
    }

    public function getById(string $id): ?array
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $statement->execute(['id' => $id]);
        return $statement->fetch();
    }
}

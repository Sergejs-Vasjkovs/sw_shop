<?php

declare(strict_types=1);

namespace App\Model;

use PDO;
use PDOException;

abstract class AbstractProductDetails
{
    protected PDO $db;
    protected string $table;
    protected string $id;

    public function __construct(PDO $db, string $id)
    {
        $this->db = $db;
        $this->id = $id;
    }

    public function getAll(): array
    {
        try {
            $statement = $this->db->prepare(
                "SELECT * FROM {$this->table} WHERE product_id = :product_id"
            );
            $statement->execute(['product_id' => $this->id]);
            return $statement->fetchAll();
        } catch (PDOException $e) {
            throw new \RuntimeException(
                "Failed to fetch {$this->table} details: " . $e->getMessage()
            );
        }
    }
}

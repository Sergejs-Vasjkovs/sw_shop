<?php

declare(strict_types=1);

namespace App\Model;

use PDO;
use PDOException;

abstract class AbstractModel implements ModelInterface
{
    protected PDO $db;
    protected string $table;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getAll(): array
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM {$this->table}");
            $statement->execute();
            return $statement->fetchAll();
        } catch (PDOException $e) {
            throw new \RuntimeException(
                "Failed to fetch {$this->table}: " . $e->getMessage()
            );
        }
    }

    public function getById(string $id): ?array
    {
        try {
            $statement = $this->db->prepare(
                "SELECT * FROM {$this->table} WHERE id = :id"
            );
            $statement->execute(['id' => $id]);
            $result = $statement->fetch();
            return $result ?: null;
        } catch (PDOException $e) {
            throw new \RuntimeException(
                "Failed to fetch {$this->table} by ID: " . $e->getMessage()
            );
        }
    }

    protected function beginTransaction(): void
    {
        $this->db->beginTransaction();
    }

    protected function commit(): void
    {
        $this->db->commit();
    }

    protected function rollback(): void
    {
        if ($this->db->inTransaction()) {
            $this->db->rollBack();
        }
    }
}

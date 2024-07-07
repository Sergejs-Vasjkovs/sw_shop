<?php

namespace App\Model;

abstract class AbstractModel
{
    protected $db;
    protected $table;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getAll()
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->table}");
        $statement->execute();
        return $statement->fetchAll();
    }
}

<?php

namespace App\Model;

abstract class AbstractProductDetails
{
    protected $db;
    protected $table;
    protected $id;

    public function __construct($db, $id)
    {
        $this->db = $db;
        $this->id = $id;
    }

    public function getAll()
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->table} WHERE product_id = :product_id");
        $statement->execute(['product_id' => $this->id]);
        return $statement->fetchAll();
    }
}

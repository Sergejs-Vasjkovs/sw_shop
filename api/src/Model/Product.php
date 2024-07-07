<?php

namespace App\Model;

class Product extends AbstractModel
{
    protected $table = "products";

    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function getById($id)
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $statement->execute(['id' => $id]);
        return $statement->fetch();
    }
}

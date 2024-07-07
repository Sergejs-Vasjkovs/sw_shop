<?php

namespace App\Model;

class Order
{
    protected $table = "orders";
    protected $db;

    protected $product_id;
    protected $options;
    protected $quantity;


    public function __construct($db, $product_id, $options, $quantity)
    {
        $this->db = $db;
        $this->product_id = $product_id;
        $this->options = $options;
        $this->quantity = $quantity;
    }

    public function insertOrder()
    {
        $statement = $this->db->prepare("INSERT INTO orders (product_id, options, quantity) VALUES (:product_id, :options, :quantity)");
        $success = $statement->execute([
            'product_id' => $this->product_id,
            'options' => $this->options,
            'quantity' => $this->quantity
        ]);
        return $success ? $this->db->lastInsertId() : null;
    }
}

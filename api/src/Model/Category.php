<?php

namespace App\Model;

class Category extends AbstractModel
{
    protected $table = "categories";

    public function __construct($db)
    {
        parent::__construct($db);
    }
}

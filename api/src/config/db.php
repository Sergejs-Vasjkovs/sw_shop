<?php

namespace App\Config;

return [
    "host" => "localhost",
    "dbname" => "shop",
    "username" => "root",
    "password" => "",
    "charset" => "utf8",
    "options" => [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
    ]
];

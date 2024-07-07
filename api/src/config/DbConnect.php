<?php

namespace App\Config;

use PDO;
use PDOException;
use Exception;

class DbConnect
{
    private static $connection = null;

    public static function connect($db_config)
    {
        if (self::$connection === null) {
            $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
            try {
                self::$connection = new PDO($dsn, $db_config['username'], $db_config['password'], $db_config['options']);
                error_log('Database connection established');
            } catch (PDOException $e) {
                throw new Exception("Database connection error: " . $e->getMessage());
            }
        }
    }

    public static function getConnection()
    {
        if (self::$connection === null) {
            throw new Exception("Database connection is not established");
        }
        return self::$connection;
    }
}

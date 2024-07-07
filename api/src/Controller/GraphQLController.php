<?php

namespace App\Controller;

use App\Config\DbConnect;
use App\Types;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use RuntimeException;
use GraphQL\Type\SchemaConfig;
use Throwable;

class GraphQLController
{
    public static function handle()
    {

        try {
            $db_config = require_once '../src/config/db.php';
            DbConnect::connect($db_config);
            $pdo = DbConnect::getConnection();

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery(Types::query())
                    ->setMutation(Types::mutation())
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
            $input = json_decode($rawInput, true);

            $query = $input['query'];
            $variableValues  = isset($input['variables']) ? $input['variables'] : null;

            $result = GraphQL::executeQuery($schema, $query, null, ["db" => $pdo], $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }
        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}

<?php

namespace App\Controller;

use App\Config\DbConnect;
use App\Types;
use App\Security\InputValidator;
use App\Security\RateLimiter;
use App\Security\RequestSanitizer;
use App\Security\CorsHandler;
use App\Security\ApiKeyHandler;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;
use Dotenv\Dotenv;
use App\Error\ErrorHandler;

class GraphQLController
{
    public static function handle()
    {
        try {
            // Handle CORS first, before any other operations
            CorsHandler::handle();

            // Load environment variables
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
            $dotenv->load();

            // Add security headers
            RequestSanitizer::sanitizeHeaders();

            // Validate API key
            ApiKeyHandler::validateApiKey();

            // Rate limiting
            $clientIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
            RateLimiter::checkLimit($clientIp);

            // Database connection
            try {
                DbConnect::connect();
                $pdo = DbConnect::getConnection();
            } catch (Throwable $e) {
                throw new RuntimeException('Database connection failed: ' . $e->getMessage());
            }

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to read request body');
            }

            $input = json_decode($rawInput, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new RuntimeException('Invalid JSON payload');
            }

            if (!isset($input['query'])) {
                throw new RuntimeException('Missing GraphQL query');
            }

            // Validate input
            InputValidator::validateQuery($input['query']);
            InputValidator::validateVariables($input['variables'] ?? null);

            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery(Types::query())
                    ->setMutation(Types::mutation())
            );

            $result = GraphQL::executeQuery(
                $schema,
                $query,
                null,
                ["db" => $pdo],
                $variableValues
            );

            $output = $result->toArray(debug: false);
        } catch (Throwable $e) {
            $output = ErrorHandler::handle($e);
        }

        http_response_code(isset($output['errors']) ? 400 : 200);
        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}

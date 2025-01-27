<?php

declare(strict_types=1);

namespace App\Resolver;

use PDO;
use GraphQL\Error\Error;
use RuntimeException;
use Throwable;

abstract class AbstractResolver
{
    protected PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }


    protected function handleError(Throwable $e, string $fieldName): Error
    {
        // Log error details
        error_log(sprintf(
            "Resolver Error: %s\nField: %s\nFile: %s\nLine: %d",
            $e->getMessage(),
            $fieldName,
            $e->getFile(),
            $e->getLine()
        ));

        // Return user-safe error message
        return new Error(
            'Failed to resolve ' . $fieldName,
            null,
            null,
            [],
            null,
            $e
        );
    }

    protected function getConnection(array $context): PDO
    {
        if (!isset($context['db']) || !($context['db'] instanceof PDO)) {
            throw new RuntimeException('Invalid database connection');
        }
        return $context['db'];
    }
}

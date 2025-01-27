<?php

namespace App\Error;

use GraphQL\Error\FormattedError;
use GraphQL\Error\Error;
use Throwable;

class ErrorHandler
{
    public static function handle(Throwable $error): array
    {
        // Log error
        error_log(sprintf(
            "Error: %s\nFile: %s\nLine: %d\nTrace: %s",
            $error->getMessage(),
            $error->getFile(),
            $error->getLine(),
            $error->getTraceAsString()
        ));

        // Convert to GraphQL Error if needed
        $graphqlError = $error instanceof Error ? $error : new Error(
            $error->getMessage(),
            null,
            null,
            [],
            null,
            $error
        );

        // Return user-safe error
        return [
            'errors' => [
                FormattedError::createFromException($graphqlError)
            ]
        ];
    }
}

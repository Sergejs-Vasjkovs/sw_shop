<?php

declare(strict_types=1);

namespace App\Security;

use GraphQL\Error\Error;
use RuntimeException;

class InputValidator
{
    private const MAX_QUERY_LENGTH = 10000;
    private const VARIABLE_PATTERN = '/^[\w-]*$/u';

    public static function validateQuery(string $query): void
    {
        if (strlen($query) > self::MAX_QUERY_LENGTH) {
            throw new Error('Query too long');
        }

        if (!$_ENV['APP_DEBUG'] && stripos($query, '__schema') !== false) {
            throw new Error('Introspection queries not allowed');
        }
    }

    public static function validateVariables(?array $variables): void
    {
        if ($variables === null) {
            return;
        }

        foreach ($variables as $key => $value) {
            if (!is_string($key) || !preg_match(self::VARIABLE_PATTERN, $key)) {
                throw new RuntimeException('Invalid characters in variable name');
            }

            if (is_string($value) && !preg_match(self::VARIABLE_PATTERN, $value)) {
                throw new RuntimeException('Invalid characters in variable value');
            }
        }
    }
}

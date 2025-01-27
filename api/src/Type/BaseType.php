<?php

declare(strict_types=1);

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Error\Error;

abstract class BaseType extends ObjectType
{
    protected function getConnection(array $context): \PDO
    {
        if (!isset($context['db'])) {
            throw new \RuntimeException('Database connection not available');
        }

        return $context['db'];
    }

    protected function withErrorHandling(
        callable $resolver,
        $root,
        array $args,
        array $context,
        $info
    ) {
        try {
            return $resolver($root, $args, $context, $info);
        } catch (\Throwable $e) {
            throw new Error(
                'Failed to resolve ' . $info->fieldName . ': ' . $e->getMessage()
            );
        }
    }
}

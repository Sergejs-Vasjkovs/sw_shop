<?php

declare(strict_types=1);

namespace App\Resolver;

use App\Model\Category;
use GraphQL\Error\Error;
use InvalidArgumentException;
use Throwable;

class CategoryResolver extends AbstractResolver
{

    public function resolveCategories(
        ?array $root,
        array $args,
        array $context
    ): array {
        try {
            $pdo = $this->getConnection($context);
            $categories = (new Category($pdo))->getAll();

            if (empty($categories)) {
                return [];
            }

            return $categories;
        } catch (Throwable $e) {
            throw $this->handleError($e, 'categories');
        }
    }


    public function resolveCategory(
        ?array $root,
        array $args,
        array $context
    ): ?array {
        try {
            if (!isset($args['id'])) {
                throw new InvalidArgumentException('Category ID is required');
            }

            $pdo = $this->getConnection($context);
            $category = (new Category($pdo))->getById($args['id']);

            if (!$category) {
                throw new Error('Category not found');
            }

            return $category;
        } catch (Throwable $e) {
            throw $this->handleError($e, 'category');
        }
    }
}

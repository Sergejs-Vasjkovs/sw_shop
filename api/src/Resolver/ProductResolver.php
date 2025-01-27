<?php

declare(strict_types=1);

namespace App\Resolver;

use App\Model\{Product, ProductAttributes, ProductGallery, ProductPrice};
use GraphQL\Error\Error;
use InvalidArgumentException;
use Throwable;

class ProductResolver extends AbstractResolver
{

    public function resolveProducts(
        ?array $root,
        array $args,
        array $context
    ): array {
        try {
            $pdo = $this->getConnection($context);
            return (new Product($pdo))->getAll();
        } catch (Throwable $e) {
            throw $this->handleError($e, 'products');
        }
    }


    public function resolveProduct(
        ?array $root,
        array $args,
        array $context
    ): ?array {
        try {
            if (!isset($args['id'])) {
                throw new InvalidArgumentException('Product ID is required');
            }

            $pdo = $this->getConnection($context);
            $product = (new Product($pdo))->getById($args['id']);

            if (!$product) {
                throw new Error('Product not found');
            }

            return $product;
        } catch (Throwable $e) {
            throw $this->handleError($e, 'product');
        }
    }


    public function resolveAttributes(
        array $root,
        array $args,
        array $context
    ): array {
        try {
            if (!isset($root['id'])) {
                throw new InvalidArgumentException('Product ID is missing');
            }

            $pdo = $this->getConnection($context);
            return (new ProductAttributes($pdo, $root['id']))->getAll();
        } catch (Throwable $e) {
            throw $this->handleError($e, 'attributes');
        }
    }


    public function resolveGallery(
        array $root,
        array $args,
        array $context
    ): array {
        try {
            if (!isset($root['id'])) {
                throw new InvalidArgumentException('Product ID is missing');
            }

            $pdo = $this->getConnection($context);
            return (new ProductGallery($pdo, $root['id']))->getAll();
        } catch (Throwable $e) {
            throw $this->handleError($e, 'gallery');
        }
    }


    public function resolvePrices(
        array $root,
        array $args,
        array $context
    ): array {
        try {
            if (!isset($root['id'])) {
                throw new InvalidArgumentException('Product ID is missing');
            }

            $pdo = $this->getConnection($context);
            return (new ProductPrice($pdo, $root['id']))->getAll();
        } catch (Throwable $e) {
            throw $this->handleError($e, 'prices');
        }
    }
}

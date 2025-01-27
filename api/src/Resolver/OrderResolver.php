<?php

declare(strict_types=1);

namespace App\Resolver;

use App\Model\Order;
use GraphQL\Error\Error;
use InvalidArgumentException;
use PDOException;
use Throwable;

class OrderResolver extends AbstractResolver
{
    public function createOrders(
        ?array $root,
        array $args,
        array $context
    ): array {
        try {
            if (!isset($args['options']) || !is_array($args['options'])) {
                throw new InvalidArgumentException('Invalid order options');
            }

            $pdo = $this->getConnection($context);
            $orders = $args['options'];
            $results = [];

            $pdo->beginTransaction();

            try {
                foreach ($orders as $options) {
                    $this->validateOrderOptions($options);

                    $order = new Order(
                        $pdo,
                        $options['product_id'],
                        $options['options'],
                        $options['quantity']
                    );

                    $id = $order->insertOrder();
                    if (!$id) {
                        throw new PDOException('Failed to insert order');
                    }

                    $results[] = [
                        'id' => $id,
                        'product_id' => $options['product_id'],
                        'options' => $options['options'],
                        'quantity' => $options['quantity'],
                    ];
                }

                $pdo->commit();
                return $results;
            } catch (Throwable $e) {
                $pdo->rollBack();
                throw $e;
            }
        } catch (Throwable $e) {
            throw $this->handleError($e, 'createOrders');
        }
    }

    private function validateOrderOptions(array $options): void
    {
        if (!isset($options['product_id'], $options['options'], $options['quantity'])) {
            throw new InvalidArgumentException('Missing required order fields');
        }

        if ($options['quantity'] < 1) {
            throw new InvalidArgumentException('Invalid quantity');
        }
    }
}

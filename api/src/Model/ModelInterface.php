<?php

declare(strict_types=1);

namespace App\Model;

interface ModelInterface
{
    public function getAll(): array;
    public function getById(string $id): ?array;
}

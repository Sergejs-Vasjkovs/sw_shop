<?php

declare(strict_types=1);

namespace App\Security;

use RuntimeException;

class ApiKeyHandler
{

    public static function validateApiKey(): void
    {
        $headers = getallheaders();
        $apiKey = (string)($headers['x-api-key'] ?? '');

        if ($apiKey !== $_ENV['API_KEY']) {
            throw new RuntimeException('Invalid API key');
        }
    }
}

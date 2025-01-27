<?php

declare(strict_types=1);

namespace App\Security;

class CorsHandler
{
    private const ALLOWED_ORIGIN = 'http://localhost:3000';
    private const ALLOWED_METHODS = 'GET, POST, OPTIONS';
    private const ALLOWED_HEADERS = 'Content-Type, X-API-Key, x-api-key';
    private const MAX_AGE = '86400';

    public static function handle(): void
    {
        // Remove any existing headers
        if (function_exists('header_remove')) {
            header_remove('Access-Control-Allow-Origin');
            header_remove('Access-Control-Allow-Methods');
            header_remove('Access-Control-Allow-Headers');
            header_remove('Access-Control-Max-Age');
        }

        // Set CORS headers
        header('Access-Control-Allow-Origin: ' . self::ALLOWED_ORIGIN);
        header('Access-Control-Allow-Methods: ' . self::ALLOWED_METHODS);
        header('Access-Control-Allow-Headers: ' . self::ALLOWED_HEADERS);
        header('Access-Control-Max-Age: ' . self::MAX_AGE);
        header('Access-Control-Allow-Credentials: true');

        // Handle preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
}

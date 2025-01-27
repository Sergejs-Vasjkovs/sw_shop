<?php

declare(strict_types=1);

namespace App\Security;

class RequestSanitizer
{
    private const SECURITY_HEADERS = [
        'X-Frame-Options' => 'DENY',
        'X-XSS-Protection' => '1; mode=block',
        'X-Content-Type-Options' => 'nosniff',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Content-Security-Policy' => "default-src 'self'",
        'Permissions-Policy' => 'geolocation=(), microphone=()'
    ];

    private const DANGEROUS_HEADERS = [
        'Server',
        'X-Powered-By'
    ];

    private const HSTS_MAX_AGE = 31536000; // 1 year in seconds

    public static function sanitizeHeaders(): void
    {
        // Remove potentially dangerous headers
        if (function_exists('header_remove')) {
            foreach (self::DANGEROUS_HEADERS as $header) {
                header_remove($header);
            }
        }

        // Set security headers
        foreach (self::SECURITY_HEADERS as $header => $value) {
            header(sprintf('%s: %s', $header, $value));
        }

        // Set HSTS if using HTTPS
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            header(sprintf(
                'Strict-Transport-Security: max-age=%d; includeSubDomains',
                self::HSTS_MAX_AGE
            ));
        }
    }

    public static function sanitizeInput($data)
    {
        if (is_array($data)) {
            return array_map([self::class, 'sanitizeInput'], $data);
        }

        if (is_string($data)) {
            return htmlspecialchars($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }

        if (is_int($data) || is_float($data) || is_bool($data) || is_null($data)) {
            return $data;
        }

        return (string)$data;
    }
}

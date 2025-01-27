<?php

declare(strict_types=1);

namespace App\Security;

use RuntimeException;
use JsonException;

class RateLimiter
{
    private const MAX_REQUESTS = 100;
    private const TIME_WINDOW = 3600; // 1 hour
    private const CACHE_PREFIX = 'rate_limit_';

    public static function checkLimit(string $clientIp): void
    {
        $cacheKey = self::CACHE_PREFIX . $clientIp;
        $currentTime = time();
        $cacheFile = sys_get_temp_dir() . '/' . $cacheKey;

        try {
            if (file_exists($cacheFile)) {
                $data = json_decode(
                    file_get_contents($cacheFile) ?: '[]',
                    true,
                    512,
                    JSON_THROW_ON_ERROR
                );

                if ($currentTime - $data['timestamp'] <= self::TIME_WINDOW) {
                    if ($data['count'] >= self::MAX_REQUESTS) {
                        throw new RuntimeException('Rate limit exceeded');
                    }
                    $data['count']++;
                } else {
                    $data = ['count' => 1, 'timestamp' => $currentTime];
                }
            } else {
                $data = ['count' => 1, 'timestamp' => $currentTime];
            }

            file_put_contents(
                $cacheFile,
                json_encode($data, JSON_THROW_ON_ERROR)
            );
        } catch (JsonException $e) {
            throw new RuntimeException('Rate limit error: ' . $e->getMessage());
        }
    }
}

<?php

namespace App;

use App\Type\ProductType;
use App\Type\ProductAttributeType;
use App\Type\ProductGalleryType;
use App\Type\ProductPriceType;
use App\Type\CategoriesType;
use App\Type\MutationType;
use App\Type\OptionsType;
use App\Type\OrderType;
use App\Type\QueryType;
use App\Resolver\CategoryResolver;
use App\Resolver\ProductResolver;
use App\Resolver\OrderResolver;
use GraphQL\Type\Definition\Type;

class Types
{
    private static $product;
    private static $productAttribute;
    private static $productGallery;
    private static $productPrice;
    private static $query;
    private static $categories;
    private static $mutation;
    private static $order;
    private static $options;

    private static function getResolvers()
    {
        $db = \App\Config\DbConnect::getConnection();
        return [
            'category' => new CategoryResolver($db),
            'product' => new ProductResolver($db),
            'order' => new OrderResolver($db)
        ];
    }

    public static function mutation()
    {
        $resolvers = self::getResolvers();
        return self::$mutation ?: (self::$mutation = new MutationType($resolvers['order']));
    }

    public static function order()
    {
        return self::$order ?: (self::$order = new OrderType());
    }

    public static function options()
    {
        return self::$options ?: (self::$options = new OptionsType());
    }

    public static function category()
    {
        return self::$categories ?: (self::$categories = new CategoriesType());
    }

    public static function product()
    {
        $resolvers = self::getResolvers();
        return self::$product ?: (self::$product = new ProductType($resolvers['product']));
    }

    public static function productAttribute()
    {
        return self::$productAttribute ?: (self::$productAttribute = new ProductAttributeType());
    }

    public static function productGallery()
    {
        return self::$productGallery ?: (self::$productGallery = new ProductGalleryType());
    }

    public static function productPrice()
    {
        return self::$productPrice ?: (self::$productPrice = new ProductPriceType());
    }

    public static function query()
    {
        $resolvers = self::getResolvers();
        return self::$query ?: (self::$query = new QueryType($resolvers['category'], $resolvers['product']));
    }

    public static function int()
    {
        return Type::int();
    }

    public static function string()
    {
        return Type::string();
    }

    public static function float()
    {
        return Type::float();
    }

    public static function boolean()
    {
        return Type::boolean();
    }

    public static function nonNull($type)
    {
        return Type::nonNull($type);
    }

    public static function listOf($type)
    {
        return Type::listOf($type);
    }
}

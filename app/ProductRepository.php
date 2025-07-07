<?php

namespace App;

use Illuminate\Http\Client\HttpClientException;
use Illuminate\Support\Facades\Http;
use Psy\Util\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductRepository implements ProductRepositoryInterface
{
    public string $apiUrl = 'https://zadatak.konovo.rs';
    public function __construct()
    {
        //
    }

    public function getAll(array $filters = [])
    {
        $token = session("jwt_token");
        $response = Http::withToken($token)->get($this->apiUrl . "/products");
        if($response->failed()){
            throw new HttpClientException("Error", 401, null);
        }
        $products = collect($response->json());
        $products = $products->map(function($product)
        {
            if(isset($product["category"]) && strtolower($product["category"]) === "monitori"){
                if(isset($product["price"]) && is_numeric($product["price"])){
                    $product["price"] = round($product["price"] * 1.1, 2);
                }
            }
            if (isset($product['description']) && is_string($product['description'])) {
                $product['description'] = preg_replace('/\bbrzina\b/i', 'performanse', $product['description']);
            }
            return $product;
        });
        if(!empty($filters["category"])){
            $products = $products->where("category", $filters["category"]);
        }
        if(!empty($filters["search"])){
            $keyword = strtolower($filters["search"]);
            $products = $products->filter(function($product) use ($keyword){
                return isset($product["name"]) && \Illuminate\Support\Str::contains(strtolower($product["name"]), $keyword);
            });
        }
        return $products;
    }
    public function find(int $id) : ?object
    {
        $products = $this->getAll();
        $product = $products->firstWhere('id', $id);
        if(!$product){
            throw new NotFoundHttpException("Product Not Found", null, 404);
        }
        return (object)$product;
    }
}

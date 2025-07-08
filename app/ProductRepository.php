<?php

namespace App;

use Illuminate\Http\Client\ConnectionException;
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

    /**
     * @throws HttpClientException
     * @throws ConnectionException
     */
    public function getAll(string $token, array $filters = [])
    {
        $response = Http::withToken($token)->get($this->apiUrl . "/products");
        if($response->failed()){
            throw new HttpClientException("Greška", 401, null);
        }
        $products = collect($response->json());
        $products = $products->map(function($product)
        {
            if(isset($product["categoryName"]) && strtolower($product["categoryName"]) === "monitori"){
                if(isset($product["price"]) && is_numeric($product["price"])){
                    $product["price"] = round($product["price"] * 1.1, 2);
                }
            }
            if (isset($product['description']) && is_string($product['description'])) {
                $product['description'] = preg_replace('/\bbrzina\b\s*:\s*(\\r\\n)?<br><br>\\r\\n/i', '<br/>Performanse:<br/>' , $product['description']);
                $product['description'] = preg_replace('/\bPovezivanje\b\s*:?\s*/i', '<br/>Povezivanje:<br/>', $product['description']);
            }
            return $product;
        });
        if(!empty($filters["category"])){
            $category = strtolower($filters["category"]);
            $products = $products->filter(function($product) use ($category){
               return isset($product["categoryName"]) && \Illuminate\Support\Str::contains(strtolower($product["categoryName"]), $category);
            });
        }
        if(!empty($filters["search"])){
            $keyword = strtolower($filters["search"]);
            $products = $products->filter(function($product) use ($keyword){
                return isset($product["naziv"]) && \Illuminate\Support\Str::contains(strtolower($product["naziv"]), $keyword);
            });
        }

        $page = isset($filters["page"]) && is_numeric($filters["page"]) ? max((int)$filters["page"], 1) : 1;
        $perPage = isset($filters["per_page"]) && is_numeric($filters["per_page"]) ? max((int)$filters["per_page"], 1) : 6;

        $total = $products->count();
        $offset = ($page - 1) * $perPage;
        $paginated = $products->slice($offset, $perPage)->values();
        return [
            "data" => $paginated,
            "total" => $total,
            "page" => $page,
            "per_page" => $perPage
        ];
    }
    public function find(string $token, int $id) : array
    {
        $products = $this->getAll($token);
        $product = $products['data']->firstWhere('sif_product', $id);
        if(!$product){
            throw new NotFoundHttpException("Proizvod nije pronađen", null, 404);
        }
        return $product;
    }
}

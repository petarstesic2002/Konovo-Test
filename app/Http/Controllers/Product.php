<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Resources\ProductResource;
use App\ProductRepository;
use App\ProductRepositoryInterface;
use Illuminate\Http\Client\HttpClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Product extends Base
{
    protected ProductRepository $productRepository;
    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function index(Request $request) : JsonResponse
    {
        $token = $request->input("jwt_token");
        try {
            $filters = $request->only(["category", "search"]);
            $products = $this->productRepository->getAll($token, $filters);
            $collection = ProductResource::collection($products);
        }catch(HttpClientException){
            return ApiResponse::sendResponse("Bad Request", 401);
        }
        return ApiResponse::sendResponse("success", 200, $collection);
    }
    public function show(Request $request) : JsonResponse
    {
        $token = $request->input("jwt_token");
        $id = $request["id"];
        $product = $this->productRepository->find($token, $id);
        if(!$product)
        {
            return ApiResponse::sendResponse("Product not found", 404);
        }
        $object = new ProductResource($product);
        return ApiResponse::sendResponse("success", 200, $object);
    }
}

<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Resources\ProductResource;
use App\ProductRepository;
use App\ProductRepositoryInterface;
use Illuminate\Http\Request;

class Product extends Base
{
    protected ProductRepository $productRepository;
    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function index(Request $request)
    {
        $filters = $request->only(["category", "search"]);
        $products = $this->productRepository->getAll($filters);
        $collection = ProductResource::collection($products);
        return ApiResponse::sendResponse("success", 200, $collection);
    }
    public function show(int $id)
    {
        $product = $this->productRepository->find($id);
        if(!$product)
        {
            return ApiResponse::sendResponse("Product not found", 404);
        }
        $object = new ProductResource($product);
        return ApiResponse::sendResponse("success", 200, $object);
    }
}

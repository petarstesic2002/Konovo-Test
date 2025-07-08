<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Resources\ProductResource;
use App\ProductRepository;
use App\ProductRepositoryInterface;
use Illuminate\Http\Client\HttpClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends BaseController
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
            $filters = $request->only(["category", "search", "page", "per_page"]);
            $response = $this->productRepository->filter($token, $filters);
            $collection = ProductResource::collection($response['data']);
        }catch(HttpClientException){
            return ApiResponse::sendResponse("Nepravilan Zahtev", 401);
        }
        return ApiResponse::sendResponse("Uspešno", 200, [
            "data" => $collection,
            "total" => $response['total'],
            "perPage" => $response['per_page'],
            "page" => $response['page']
        ]);
    }
    public function show(Request $request, $id) : JsonResponse
    {
        $token = $request->input("jwt_token");
        $product = $this->productRepository->find($token, $id);
        if(!$product)
        {
            return ApiResponse::sendResponse("Proizvod nije pronađen", 404);
        }
        $object = new ProductResource($product);
        return ApiResponse::sendResponse("Uspešno", 200, $object);
    }
}

<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use League\Uri\Http;

class Auth extends Base
{
    public function login(\App\Http\Requests\Auth $request) : JsonResponse
    {
        $response = \Illuminate\Support\Facades\Http::post
        (
        $this->baseUrl . '/login',
            [
                'username' => $request['username'],
                'password' => $request['password']
            ]
        );
        if($response->failed())
        {
            return ApiResponse::sendResponse("Invalid credentials", 401);
        }
        $token = $response->json()['token'];
        session(["jwt_token" => $token]);
        return ApiResponse::sendResponse("Login success", 200, ["token" => $token]);
    }
    public function logout() : JsonResponse
    {
        session()->forget('jwt_token');
        return ApiResponse::sendResponse("Logout success", 204);
    }
}

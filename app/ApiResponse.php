<?php

namespace App;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ApiResponse
{
    public function __construct()
    {
        //
    }
    public function rollback() : JsonResponse
    {
        DB::rollback();
        self::sendResponse("Server error", 500);
    }
    public static function sendResponse(string $message = "success", int $statusCode = 200, mixed $data = null) : JsonResponse
    {
        $response = [];
        if(isset($data)){
            $response['data'] = $data;
        }
        $response['message'] = $message;
        $response['status_code'] = $statusCode;
        return response()->json($response, $statusCode);
    }
}

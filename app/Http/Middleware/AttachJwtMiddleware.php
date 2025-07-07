<?php

namespace App\Http\Middleware;

use App\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AttachJwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');
        if(!$authHeader || !str_starts_with($authHeader, "Bearer ")) {
            return ApiResponse::sendResponse('Unauthorized', 401);
        }
        $token = substr($authHeader, 7);
        $request->merge(["jwt_token" => $token]);
        return $next($request);
    }
}

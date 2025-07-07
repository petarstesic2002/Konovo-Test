<?php

namespace App\Http\Middleware;

use App\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!session()->has('jwt_token'))
        {
            return ApiResponse::sendResponse("Unauthorized", 401);
        }
        return $next($request);
    }
    public function logout(){
        session()->forget('jwt_token');
        return ApiResponse::sendResponse("Logged Out");
    }
}

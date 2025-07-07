<?php

namespace App\Http\Middleware;

use App\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AlreadyLoggedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(session()->has('jwt_token'))
        {
            return ApiResponse::sendResponse("Already Logged In", 403);
        }
        return $next($request);
    }
}

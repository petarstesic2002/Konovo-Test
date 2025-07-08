<?php

use App\Http\Middleware\AlreadyLoggedIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->middleware(AlreadyLoggedIn::class);
Route::middleware('attach.jwt')->group(function ()
{
    Route::get("/products", [\App\Http\Controllers\ProductController::class, 'index']);
    Route::get("/products/{id}", [\App\Http\Controllers\ProductController::class, 'show']);
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

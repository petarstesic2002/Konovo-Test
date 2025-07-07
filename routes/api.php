<?php

use App\Http\Middleware\AlreadyLoggedIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\Auth::class, 'login'])->middleware(AlreadyLoggedIn::class);
Route::middleware(\App\Http\Middleware\Auth::class)->group(function ()
{
    Route::get("/products", [\App\Http\Controllers\Product::class, 'index']);
    Route::get("/products/{id}", [\App\Http\Controllers\Product::class, 'show']);
    Route::post('/logout', [\App\Http\Controllers\Auth::class, 'logout']);
});

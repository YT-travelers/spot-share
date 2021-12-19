<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\TourismController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('web')

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('routes', RouteController::class);
    Route::apiResource('restaurants', RestaurantController::class);
    Route::apiResource('hotels', HotelController::class);
    Route::apiResource('tourisms', TourismController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::get('countries', 'App\Http\Controllers\CountryController@index');
    Route::get('codes', 'App\Http\Controllers\CodeController@index');
});

Route::post("auth/login", 'App\Http\Controllers\AuthController@login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

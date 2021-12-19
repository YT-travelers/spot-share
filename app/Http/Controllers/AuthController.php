<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthService;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class AuthController extends Controller
{
    #[Pure] public function __construct(private AuthService $authService)
    {

    }

    public function login(Request $request)
    {
        $isSuccess = (new \App\Http\Services\AuthService)->auth($request->get('email'), $request->get('password'));
        $statusCode = $isSuccess ? 200 : 401;
        return response(compact('isSuccess'), $statusCode);
    }
}

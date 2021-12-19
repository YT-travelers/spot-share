<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function register(string $name, string $email, string $password): User
    {
        $user = new User([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        $user->save();

        return $user;
    }

    public function auth(string $email, $password): bool
    {
        return Auth::attempt(['email' => $email, 'password' => $password]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Services\RouteService;
use App\Models\Route;

class RouteController extends Controller
{
    public function index(RouteService $routeService): array
    {
        $routeList = $routeService->listRoute();

        return $routeList->map(function (Route $route) {
            return [
                'routeId' => $route->route_id,
                'routeName' => $route->route_name
            ];
        })->toArray();
    }

    public function show(Route $route, ResponseConverter\ResponseFormatter $formatter): array
    {
        return $formatter->convertRoute($route);
    }


}

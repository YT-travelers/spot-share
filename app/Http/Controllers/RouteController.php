<?php

namespace App\Http\Controllers;

use App\Http\Requests\RouteRequest;
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

    public function show(Route $route, ResponseConverter\RouteConverter $converter): array
    {
        return $converter->convertRoute($route);
    }

    public function store(RouteRequest $request, RouteService $routeService, ResponseConverter\RouteConverter $converter): array
    {
        $route = $routeService->saveRoute($request->validated());
        return $converter->convertRoute($route);
    }
}

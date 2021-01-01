<?php

namespace App\Http\Services;


use App\Models\Route;
use Illuminate\Database\Eloquent\Collection;

class RouteService
{
    public function __construct(private Route $routeModel)
    {
    }

    /**
     * @return Collection
     */
    public function listRoute(): Collection
    {
        return $this->routeModel->all('route_id', 'route_name');
    }
}

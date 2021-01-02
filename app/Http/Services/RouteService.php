<?php

namespace App\Http\Services;

use App\Models\Route;
use App\Models\RouteDetail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

    public function saveRoute(array $_routeData, ?int $routeId = null): Route
    {
        $routeData = makeArraySnakeRecursively($_routeData);

        $route = $this->routeModel->findOrNew($routeId);
        $route->route_name= $routeData['route_name'];
        $routeDetailDataList = $routeData['route_details'];
        DB::transaction(function () use ($route, $routeDetailDataList) {
            $route->save();
            if (isset($routeDetailDataList)) {
                $route->routeDetails()->createMany($routeDetailDataList)->each(function (RouteDetail $routeDetail, int $index) use ($routeDetailDataList) {
                    $routeDetailData = $routeDetailDataList[$index];
                    $relevantModel = $routeDetail->relevantModel();
                    $className = (new \ReflectionClass($relevantModel->newModelInstance()))->getShortName();
                    $key = Str::snake($className);
                    $relevantModel->create($routeDetailData[$key]);
                });
            }
        });

        return $route;
    }
}

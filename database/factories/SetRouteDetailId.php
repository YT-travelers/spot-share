<?php


namespace Database\Factories;


trait SetRouteDetailId
{
    public function setRouteDetailId(int $routeDetailId, int $routeId)
    {
        return $this->state(function () use ($routeDetailId, $routeId) {
            return [
                'route_detail_id' => $routeDetailId,
                'route_id' => $routeId,
            ];
        });
    }
}

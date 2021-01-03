<?php


namespace Database\Factories;


trait SetRouteDetailId
{
    public function setRouteDetailId(int $routeDetailId)
    {
        return $this->state(function () use ($routeDetailId) {
            return [
                'route_detail_id' => $routeDetailId,
            ];
        });
    }
}

<?php

namespace App\Http\Services;

use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Route;
use App\Models\RouteDetail;
use App\Models\Tourism;
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
                    $this->saveRouteDetailBean($routeDetail, $routeDetailData);
                });
            }
        });

        return $route;
    }

    private function saveRouteDetailBean(RouteDetail $routeDetail, array $routeDetailData)
    {
        $beanKind = $routeDetail->beanKind;
        if ($beanKind->isTourism()) {
            $data = $routeDetailData['route_detail_tourism'];
            $tourismId = $data['tourism']['tourism_id'] ?? null;
            $tourism = Tourism::findOrNew($tourismId);
            $tourism->fill($data['tourism'])->save();
            $data['tourism_id'] = $tourism['tourism_id'];
            $routeDetail->routeDetailTourism()->create($data);
        }
        if ($beanKind->isRestaurant()) {
            $data = $routeDetailData['route_detail_restaurant'];
            $restaurantId = $data['restaurant']['restaurant_id'] ?? null;
            $restaurant = Restaurant::findOrNew($restaurantId);
            $restaurant->fill($data['restaurant'])->save();
            $data['restaurant_id'] = $restaurant['restaurant_id'];
            $routeDetail->routeDetailRestaurant()->create($data);
        }
        if ($beanKind->isHotel()) {
            $data = $routeDetailData['route_detail_hotel'];
            $hotelId = $data['hotel']['hotel_id'] ?? null;
            $hotel = Hotel::findOrNew($hotelId);
            $hotel->fill($data['hotel'])->save();
            $data['hotel_id'] = $hotel['hotel_id'];
            $routeDetail->routeDetailHotel()->create($data);
        }
        if ($beanKind->isActivity()) {
            $data = $routeDetailData['route_detail_activity'];
            $activityId = $data['activity']['activity_id'] ?? null;
            $activity = Activity::findOrNew($activityId);
            $activity->fill($data['activity'])->save();
            $data['activity_id'] = $activity['activity_id'];
            $routeDetail->routeDetailActivity()->create($data);
        }
        if ($beanKind->isMeal()) {
            $data = $routeDetailData['route_detail_meal'];
            $routeDetail->routeDetailMeal()->create($data);
        }
        if ($beanKind->isMove()) {
            $data = $routeDetailData['route_detail_move'];
            $routeDetail->routeDetailMove()->create($data);
        }
        if ($beanKind->isTime()) {
            $data = $routeDetailData['route_detail_time'];
            $routeDetail->routeDetailTime()->create($data);
        }
        if ($beanKind->isChecklist()) {
            $data = $routeDetailData['route_detail_checklist'];
            $routeDetail->routeDetailChecklist()->create($data);
        }
        if ($beanKind->isMemo()) {
            $data = $routeDetailData['route_detail_memo'];
            $routeDetail->routeDetailMemo()->create($data);
        }
    }
}

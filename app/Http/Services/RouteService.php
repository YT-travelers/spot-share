<?php

namespace App\Http\Services;

use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Route;
use App\Models\RouteDetail;
use App\Models\RouteDetailActivity;
use App\Models\RouteDetailHotel;
use App\Models\RouteDetailTourism;
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

    /**
     * ルート情報の保存処理を行う
     * $routeIdがnullの場合は新規作成、nullで無かった場合は更新処理となる
     * 更新処理では元のデータを全て削除して新規作成を行う
     * ルート詳細を削除した後で参照が無い各マスタデータも削除を行う
     *
     * @param array $_routeData
     * @param int|null $routeId
     * @return Route
     * @throws \Throwable
     */
    public function saveRoute(array $_routeData, ?int $routeId = null): Route
    {
        $route = $this->routeModel->newInstance();
        DB::transaction(function () use ($route, $_routeData, $routeId) {
            if ($routeId !== null) {
                $this->deleteRoute($routeId);
            }
            $routeData = makeArraySnakeRecursively($_routeData);

            $route->route_name= $routeData['route_name'];
            $routeDetailDataList = $routeData['route_details'];
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

    public function deleteRoute(int $routeId)
    {
        $route = $this->routeModel->findOrFail($routeId);

        //NOTE: この後の処理でroute_detailsテーブルを削除する為、先にメモリへロードしておく
        $route->load(
            'routeDetails',
            'routeDetails.beanKind',
            'routeDetails.routeDetailTourism',
            'routeDetails.routeDetailHotel',
            'routeDetails.routeDetailActivity',
        );
        $route->delete();

        $route->routeDetails->each(function (RouteDetail $routeDetail) {
            $beanKind = $routeDetail->beanKind;
            if ($beanKind->isTourism()) {
                $tourismId = $routeDetail->routeDetailTourism->tourism_id;
                $tourismCount = RouteDetailTourism::where('tourism_id', $tourismId)
                                                    ->count();
                if ($tourismCount === 0) {
                    Tourism::where('tourism_id', $tourismId)
                            ->delete();
                }
            }
            if ($beanKind->isHotel()) {
                $hotelId = $routeDetail->routeDetailHotel->hotel_id;
                $hotelCount = RouteDetailHotel::where('hotel_id', $hotelId)
                                                ->count();
                if ($hotelCount === 0) {
                    Hotel::where('hotel_id', $hotelId)
                        ->delete();
                }
            }
            if ($beanKind->isActivity()) {
                $activityId = $routeDetail->routeDetailActivity->activity_id;
                $activityCount = RouteDetailActivity::where('activity_id', $activityId)
                    ->count();
                if ($activityCount === 0) {
                    Activity::where('activity_id', $activityId)
                        ->delete();
                }
            }
        });
    }
}

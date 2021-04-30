<?php

namespace App\Http\Services;

use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Route;
use App\Models\RouteDetail;
use App\Models\RouteDetailActivity;
use App\Models\RouteDetailHotel;
use App\Models\RouteDetailTourism;
use App\Models\Tourism;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
        return DB::transaction(function () use ($_routeData, $routeId) {
            $route = $this->routeModel->firstOrNew(['route_id' => $routeId]);
            $route->routeDetails()->delete();
            $routeData = makeArraySnakeRecursively($_routeData);

            $route->route_name= $routeData['route_name'];
            $route->save();
            //route_detail_idを配列の順番に採番
            if (isset($routeData['route_details'])) {
                $routeDetailDataList = Collection
                    ::make($routeData['route_details'])
                    ->map(function (array $routeDetailData, int $index) {
                        $routeDetailData['route_detail_id'] = $index + 1;
                        return $routeDetailData;
                    })->toArray();
                $route->routeDetails()->createMany($routeDetailDataList)->each(function (RouteDetail $routeDetail, int $index) use ($routeDetailDataList) {
                    $routeDetailData = $routeDetailDataList[$index];
                    $this->saveRouteDetailBean($routeDetail, $routeDetailData);
                });
            }

            return $route;
        });
    }

    private function saveRouteDetailBean(RouteDetail $routeDetail, array $routeDetailData)
    {
        $data['route_id'] = $routeDetail->route_id;
        $beanKind = $routeDetail->beanKind;
        if ($beanKind->isTourism()) {
            $data += $routeDetailData['route_detail_tourism'];
            $routeDetail->routeDetailTourism()->create($data);
        }
        if ($beanKind->isRestaurant()) {
            $data += $routeDetailData['route_detail_restaurant'];
            $routeDetail->routeDetailRestaurant()->create($data);
        }
        if ($beanKind->isHotel()) {
            $data += $routeDetailData['route_detail_hotel'];
            $routeDetail->routeDetailHotel()->create($data);
        }
        if ($beanKind->isActivity()) {
            $data += $routeDetailData['route_detail_activity'];
            $routeDetail->routeDetailActivity()->create($data);
        }
        if ($beanKind->isMeal()) {
            $data += $routeDetailData['route_detail_meal'];
            $routeDetail->routeDetailMeal()->create($data);
        }
        if ($beanKind->isMove()) {
            $data += $routeDetailData['route_detail_move'];
            $routeDetail->routeDetailMove()->create($data);
        }
        if ($beanKind->isTime()) {
            $data += $routeDetailData['route_detail_time'];
            $routeDetail->routeDetailTime()->create($data);
        }
        if ($beanKind->isChecklist()) {
            $data += $routeDetailData['route_detail_checklist'];
            $routeDetail->routeDetailChecklist()->create($data);
        }
        if ($beanKind->isMemo()) {
            $data += $routeDetailData['route_detail_memo'];
            $routeDetail->routeDetailMemo()->create($data);
        }
    }

    public function deleteRoute(int $routeId)
    {
        $route = $this->routeModel->findOrFail($routeId);
        $route->delete();
    }
}

<?php

namespace App\Models;

use App\Models\Code\BeanKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RouteDetail extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    public function route(): BelongsTo
    {
        return $this->belongsTo(Route::class, 'route_id', 'route_id');
    }

    public function beanKind(): BelongsTo
    {
        return $this->belongsTo(BeanKindDiv::class, 'bean_kind_div', 'div_value');
    }

    public function routeDetailTourism(): HasOne
    {
        return $this->hasOne(RouteDetailTourism::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailRestaurant(): HasOne
    {
        return $this->hasOne(RouteDetailRestaurant::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailHotel(): HasOne
    {
        return $this->hasOne(RouteDetailHotel::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailActivity(): HasOne
    {
        return $this->hasOne(RouteDetailActivity::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailMeal(): HasOne
    {
        return $this->hasOne(RouteDetailMeal::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailMove(): HasOne
    {
        return $this->hasOne(RouteDetailMove::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailTime(): HasOne
    {
        return $this->hasOne(RouteDetailTime::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailChecklist(): HasOne
    {
        return $this->hasOne(RouteDetailChecklist::class, 'route_detail_id', 'route_detail_id');
    }

    public function routeDetailMemo(): HasOne
    {
        return $this->hasOne(RouteDetailMemo::class, 'route_detail_id', 'route_detail_id');
    }

    /**
     * @param array $data
     * @return Model
     * @throws \Exception
     */
    public function createRelevantModel(array $data): Model
    {
        $relevantModel = $this->newRelevantModel();
        return $relevantModel->fill($data);
    }

    /**
     * @return Model
     * @throws \Exception
     */
    public function newRelevantModel(): Model
    {
        return match ($this->bean_kind_div) {
            BeanKindDiv::Tourism_DIV_VALUE => new RouteDetailTourism(),
            BeanKindDiv::Restaurant_DIV_VALUE => new RouteDetailRestaurant(),
            BeanKindDiv::Hotel_DIV_VALUE => new RouteDetailHotel(),
            BeanKindDiv::Activity_DIV_VALUE => new RouteDetailActivity(),
            BeanKindDiv::Meal_DIV_VALUE => new RouteDetailMeal(),
            BeanKindDiv::Move_DIV_VALUE => new RouteDetailMove(),
            BeanKindDiv::Time_DIV_VALUE => new RouteDetailTime(),
            BeanKindDiv::Checklist_DIV_VALUE => new RouteDetailChecklist(),
            BeanKindDiv::Memo_DIV_VALUE => new RouteDetailMemo(),
            default => new RouteDetailChecklist()
        };
    }
}

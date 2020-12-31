<?php

namespace App\Models;

use App\Models\Code\BeanKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteDetail extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    public function route()
    {
        return $this->belongsTo(Route::class, 'route_id', 'route_id');
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

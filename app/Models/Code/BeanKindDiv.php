<?php

namespace App\Models\Code;

class BeanKindDiv extends Code
{
    const Tourism_DIV_VALUE = 0;
    const Restaurant_DIV_VALUE = 1;
    const Hotel_DIV_VALUE = 2;
    const Activity_DIV_VALUE = 3;
    const Meal_DIV_VALUE = 4;
    const Move_DIV_VALUE = 5;
    const Time_DIV_VALUE = 6;
    const Checklist_DIV_VALUE = 7;
    const Memo_DIV_VALUE = 8;

    protected static $division = 'BeanKindDiv';

    public function isTourism(): bool
    {
        return $this->div_value === 0;
    }

    public function isRestaurant(): bool
    {
        return $this->div_value === 1;
    }

    public function isHotel(): bool
    {
        return $this->div_value === 2;
    }

    public function isActivity(): bool
    {
        return $this->div_value === 3;
    }

    public function isMeal(): bool
    {
        return $this->div_value === 4;
    }

    public function isMove(): bool
    {
        return $this->div_value === 5;
    }

    public function isTime(): bool
    {
        return $this->div_value === 6;
    }

    public function isChecklist(): bool
    {
        return $this->div_value === 7;
    }

    public function isMemo(): bool
    {
        return $this->div_value === 8;
    }

}

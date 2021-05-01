<?php

namespace App\Http\Controllers\ResponseConverter;

use App\Models\Route;
use App\Models\RouteDetail;
use App\Models\RouteDetailActivity;
use App\Models\RouteDetailChecklist;
use App\Models\RouteDetailHotel;
use App\Models\RouteDetailMeal;
use App\Models\RouteDetailMemo;
use App\Models\RouteDetailMove;
use App\Models\RouteDetailRestaurant;
use App\Models\RouteDetailTime;
use App\Models\RouteDetailTourism;

class RouteConverter
{
    public function convertRoute(Route $route): array
    {
        $routeDetails = $route->routeDetails->map(function (RouteDetail $routeDetail) {
            return $this->convertRouteDetail($routeDetail);
        });

        return [
            'routeId' => $route->route_id,
            'routeName' => $route->route_name,
            'routeDetails' => $routeDetails
        ];
    }

    public function convertRouteDetail(RouteDetail $routeDetail): array
    {
        $routeDetailTourism = $routeDetail->routeDetailTourism === null ? null : $this->convertRouteDetailTourism($routeDetail->routeDetailTourism);
        $routeDetailRestaurant = $routeDetail->routeDetailRestaurant === null ? null : $this->convertRouteDetailRestaurant($routeDetail->routeDetailRestaurant);
        $routeDetailHotel = $routeDetail->routeDetailHotel === null ? null : $this->convertRouteDetailHotel($routeDetail->routeDetailHotel);
        $routeDetailActivity = $routeDetail->routeDetailActivity === null ? null : $this->convertRouteDetailActivity($routeDetail->routeDetailActivity);
        $routeDetailMeal = $routeDetail->routeDetailMeal === null ? null : $this->convertRouteDetailMeal($routeDetail->routeDetailMeal);
        $routeDetailMove = $routeDetail->routeDetailMove === null ? null : $this->convertRouteDetailMove($routeDetail->routeDetailMove);
        $routeDetailTime = $routeDetail->routeDetailTime === null ? null : $this->convertRouteDetailTime($routeDetail->routeDetailTime);
        $routeDetailChecklist = $routeDetail->routeDetailChecklist === null ? null : $this->convertRouteDetailChecklist($routeDetail->routeDetailChecklist);
        $routeDetailMemo = $routeDetail->routeDetailMemo === null ? null : $this->convertRouteDetailMemo($routeDetail->routeDetailMemo);


        return [
            'routeId' => $routeDetail->route_id,
            'routeDetailId' => $routeDetail->route_detail_id,
            'beanKindDiv' => $routeDetail->beanKind->div_value,
            'beanKindDivName' => $routeDetail->beanKind->div_key_name,
            'routeDetailTourism' => $routeDetailTourism,
            'routeDetailRestaurant' => $routeDetailRestaurant,
            'routeDetailHotel' => $routeDetailHotel,
            'routeDetailActivity' => $routeDetailActivity,
            'routeDetailMeal' => $routeDetailMeal,
            'routeDetailMove' => $routeDetailMove,
            'routeDetailTime' => $routeDetailTime,
            'routeDetailChecklist' => $routeDetailChecklist,
            'routeDetailMemo' => $routeDetailMemo,
        ];
    }

    public function convertRouteDetailTourism(RouteDetailTourism $routeDetailTourism): array
    {
        $tourism = $routeDetailTourism->tourism;
        return [
            'routeId' => $routeDetailTourism->route_id,
            'routeDetailId' => $routeDetailTourism->route_detail_id,
            'tourismId' => $routeDetailTourism->tourism_id,
            'tourismRate' => $routeDetailTourism->tourism_rate,
            'tourismMinutes' => $routeDetailTourism->tourism_minutes,
            'tourismCost' => $routeDetailTourism->tourism_cost,
            'tourism' => [
                'tourismId' => $tourism->tourism_id,
                'tourismName' => $tourism->tourism_name,
                'country' => [
                    'countryCode' => $tourism->country->country_code,
                    'countryName' => $tourism->country->country_name,
                    //TODO: cityCodeを入れる？
                    'currency' => $tourism->country->currency,
                    'timezone' => $tourism->country->timezone,
                ],
                'tourismOpenTimeHours' => $tourism->tourism_open_time_hours,
                'tourismOpenTimeMinutes' => $tourism->tourism_open_time_minutes,
                'tourismCloseTimeHours' => $tourism->tourism_close_time_hours,
                'tourismCloseTimeMinutes' => $tourism->tourism_close_time_minutes,
                'tourismSummary' => $tourism->tourism_summary,
                'tourismAddress' => $tourism->tourism_address,
                'tourismUrl' => $tourism->tourism_url,
            ],
        ];
    }

    public function convertRouteDetailRestaurant(RouteDetailRestaurant $routeDetailRestaurant): array
    {
        $restaurant = $routeDetailRestaurant->restaurant;
        return [
            'routeId' => $routeDetailRestaurant->route_id,
            'routeDetailId' => $routeDetailRestaurant->route_detail_id,
            'restaurantId' => $routeDetailRestaurant->restaurant_id,
            'restaurantRate' => $routeDetailRestaurant->restaurant_rate,
            'restaurantMinutes' => $routeDetailRestaurant->restaurant_minutes,
            'restaurantMealKindDiv' => $routeDetailRestaurant->restaurant_meal_kind_div,
            'restaurantMealKindDivName' => $routeDetailRestaurant->mealKind->div_key_name,
            'restaurantCost' => $routeDetailRestaurant->restaurant_cost,
            'restaurant' => [
                'restaurantId' => $restaurant->restaurant_id,
                'restaurantName' => $restaurant->restaurant_name,
                'cuisineGenreDiv' => $restaurant->cuisine_genre_div,
                'cuisineGenreDivName' => $restaurant->cuisineGenre->div_key_name,
                'restaurantKindDiv' => $restaurant->restaurant_kind_div,
                'restaurantKindDivName' => $restaurant->restaurantKind->div_key_name,
                'restaurantOpenTime' => $restaurant->restaurant_open_time,
                'restaurantCloseTime' => $restaurant->restaurant_close_time,
                'restaurantSummary' => $restaurant->restaurant_summary,
                'restaurantAddress' => $restaurant->restaurant_address,
                'restaurantUrl' => $restaurant->restaurant_url,
            ],
        ];
    }

    public function convertRouteDetailHotel(RouteDetailHotel $routeDetailHotel): array
    {
        $hotel = $routeDetailHotel->hotel;

        return [
            'routeId' => $routeDetailHotel->route_id,
            'routeDetailId' => $routeDetailHotel->route_detail_id,
            'hotelId' => $routeDetailHotel->hotel_id,
            'hotelRate' => $routeDetailHotel->hotel_rate,
            'hotelMinutes' => $routeDetailHotel->hotel_minutes,
            'hotelCheckInTimeHours' => $routeDetailHotel->hotel_check_in_time_hours,
            'hotelCheckInTimeMinutes' => $routeDetailHotel->hotel_check_in_time_minutes,
            'hotelCheckOutTimeHours' => $routeDetailHotel->hotel_check_out_time_hours,
            'hotelCheckOutTimeMinutes' => $routeDetailHotel->hotel_check_out_time_minutes,
            'hotelBreakfastYesNoDiv' => $routeDetailHotel->hotel_breakfast_yes_no_div,
            'hotelBreakfastYesNoDivName' => $routeDetailHotel->hotelBreakfastYesNo->div_key_name,
            'hotelDinnerYesNoDiv' => $routeDetailHotel->hotel_dinner_yes_no_div,
            'hotelDinnerYesNoDivName' => $routeDetailHotel->hotelDinnerYesNo->div_key_name,
            'hotelCost' => $routeDetailHotel->hotel_cost,
            'hotel' => [
                'hotelId' => $hotel->hotel_id,
                'hotelName' => $hotel->hotel_name,
                'hotelKindDiv' => $hotel->hotel_kind_div,
                'hotelKindDivName' => $hotel->hotelKind->div_key_name,
                'hotelSummary' => $hotel->hotel_summary,
                'hotelAddress' => $hotel->hotel_address,
                'hotelUrl' => $hotel->hotel_url
            ]
        ];
    }

    public function convertRouteDetailActivity(RouteDetailActivity $routeDetailActivity): array
    {
        $activity = $routeDetailActivity->activity;

        return [
            'routeId' => $routeDetailActivity->route_id,
            'routeDetailId' => $routeDetailActivity->route_detail_id,
            'activityId' => $routeDetailActivity->activity_id,
            'activityRate' => $routeDetailActivity->activity_rate,
            'activityMinutes' => $routeDetailActivity->activity_minutes,
            'activityCost' => $routeDetailActivity->activity_cost,
            'activity' => [
                'activityId' => $activity->activity_id,
                'activityName' => $activity->activity_name,
                'activityOpenTime' => $activity->activity_open_time,
                'activityCloseTime' => $activity->activity_close_time,
                'activitySummary' => $activity->activity_summary,
                'activityAddress' => $activity->activity_address,
                'activityUrl' => $activity->activity_url,
            ]
        ];
    }

    public function convertRouteDetailMeal(RouteDetailMeal $routeDetailMeal): array
    {
        return [
            'routeId' => $routeDetailMeal->route_id,
            'routeDetailId' => $routeDetailMeal->route_detail_id,
            'mealMinutes' => $routeDetailMeal->meal_minutes,
            'mealKindDiv' => $routeDetailMeal->meal_kind_div,
            'mealKindDivName' => $routeDetailMeal->mealKind->div_key_name,
            'mealCost' => $routeDetailMeal->meal_cost,
        ];
    }

    public function convertRouteDetailMove(RouteDetailMove $routeDetailMove): array
    {
        return [
            'routeId' => $routeDetailMove->route_id,
            'routeDetailId' => $routeDetailMove->route_detail_id,
            'moveMinutes' => $routeDetailMove->move_minutes,
            'moveWayDiv' => $routeDetailMove->move_way_div,
            'moveWayDivName' => $routeDetailMove->moveWay->div_key_name,
            'moveCost' => $routeDetailMove->move_cost,
        ];
    }

    public function convertRouteDetailTime(RouteDetailTime $routeDetailTime): array
    {
        return [
            'routeId' => $routeDetailTime->route_id,
            'routeDetailId' => $routeDetailTime->route_detail_id,
            'scheduleDateTime' => $routeDetailTime->schedule_date_time,
        ];
    }

    public function convertRouteDetailChecklist(RouteDetailChecklist $routeDetailChecklist): array
    {
        return [
            'routeId' => $routeDetailChecklist->route_id,
            'routeDetailId' => $routeDetailChecklist->route_detail_id,
            'checkStatus' => $routeDetailChecklist->check_status,
            'checkContent' => $routeDetailChecklist->check_content,
        ];
    }

    public function convertRouteDetailMemo(RouteDetailMemo $routeDetailMemo): array
    {
        return [
            'routeId' => $routeDetailMemo->route_id,
            'routeDetailId' => $routeDetailMemo->route_detail_id,
            'memoContent' => $routeDetailMemo->memo_content,
        ];
    }
}

<?php


namespace App\Http\Services;


class ImageUrlGenerator
{
    public function generate(string $key)
    {
        if (env('IS_MOCK_IMAGE')) {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Il_Duomo_Florence_Italy.JPG/300px-Il_Duomo_Florence_Italy.JPG";
        }
    }
}

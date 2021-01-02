<?php

if (! function_exists('makeArraySnakeRecursively')) {
    function makeArraySnakeRecursively(array $array)
    {
        $results = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results[Illuminate\Support\Str::snake($key)] = makeArraySnakeRecursively($value);
            } else {
                $results[Illuminate\Support\Str::snake($key)] = $value;
            }
        }
        return $results;
    }
}

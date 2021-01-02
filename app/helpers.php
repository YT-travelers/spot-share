<?php

if (! function_exists('camelizeArrayRecursive')) {
    function camelizeArrayRecursive(array $array)
    {
        $results = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results[Illuminate\Support\Str::camel($key)] = camelizeArrayRecursive($value);
            } else {
                $results[Illuminate\Support\Str::camel($key)] = $value;
            }
        }
        return $results;
    }
}

<?php


namespace App\Models;


use Illuminate\Support\Str;

class Model extends \Illuminate\Database\Eloquent\Model
{
    public function toArray(): array
    {
        //HACK: mapを使ってkeyを変えることが出来なかったのでforEachを使用
        //WARNING: 一階層のキーのみを置換している
        $array = parent::toArray();
        $converted = [];
        foreach ($array as $key => $value) {
            $converted[Str::camel($key)] = $value;
        }

        return $converted;
    }
}

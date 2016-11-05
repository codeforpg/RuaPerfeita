<?php

namespace App\Classes;

class GoogleMaps
{
    private static $Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
    private static $Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator

    /* main function */
    public static function findDistance($position1, $position2) {
        // get values for lat1, lon1, lat2, and lon2
        $t1 = $position1->lat;
        $n1 = $position1->lon;
        $t2 = $position2->lat;
        $n2 = $position2->lon;
        // convert coordinates to radians
        $lat1 = GoogleMaps::deg2rad($t1);
        $lon1 = GoogleMaps::deg2rad($n1);
        $lat2 = GoogleMaps::deg2rad($t2);
        $lon2 = GoogleMaps::deg2rad($n2);
        // find the differences between the coordinates
        $dlat = $lat2 - $lat1;
        $dlon = $lon2 - $lon1;
        // here's the heavy lifting
        $a = pow(sin($dlat / 2), 2) + cos($lat1) * cos($lat2) * pow(sin($dlon / 2), 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a)); // great circle distance in radians
        $dm = $c * GoogleMaps::$Rm; // great circle distance in miles
        $dk = $c * GoogleMaps::$Rk; // great circle distance in km
        // round the results down to the nearest 1/1000
        $mi = GoogleMaps::round($dm);
        $km = GoogleMaps::round($dk);
        return [
            'mi' => $mi,
            'km' => $km
        ];
    }

    // convert degrees to radians
    private static function deg2rad($deg) {
        $rad = $deg * pi() / 180; // radians = degrees * pi/180
        return $rad;
    }

    // round to the nearest 1/1000
    private static function round($x) {
        return round($x * 1000) / 1000;
    }
}
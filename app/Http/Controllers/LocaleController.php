<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    public function setLocale(Request $request, $locale)
    {
        if (!in_array($locale, config('app.available_locales', ['en']))) {
            abort(400);
        }
        
        $request->session()->put('locale', $locale);
        App::setLocale($locale);
        
        return redirect()->back();
    }
}
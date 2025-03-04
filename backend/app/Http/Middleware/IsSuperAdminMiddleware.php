<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class IsSuperAdminMiddleware
{

       public function handle(Request $request, Closure $next)
       {
              $user = JWTAuth::parseToken()->authenticate();

              // s'il est SuperAdministrateur
              if ($user->id_role == 1) {
                     return $next($request);
              }

              return response()->json(['error' => 'Vous n\'êtes pas autorisé à accéder à cette route.'], Response::HTTP_FORBIDDEN);
       }
}

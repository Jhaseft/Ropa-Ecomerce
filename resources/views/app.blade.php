<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" translate="no">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Título dinámico -->
        <title inertia>{{ config('app.name', 'Todo sobre Exclusive') }}</title>

        <!-- Favicon -->
        <link rel="icon" href="https://res.cloudinary.com/dnbklbswg/image/upload/v1765267450/exclusive-removebg-preview_x68ft5.png" type="image/png">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
        <!-- Meta Open Graph para redes sociales -->
        <meta property="og:title" content="Exclusive" />
        <meta property="og:description" content="Ropa de calidad" />
        <meta property="og:image" content="https://res.cloudinary.com/dnbklbswg/image/upload/v1765267450/exclusive-removebg-preview_x68ft5.png" />
        <meta property="og:url" content="{{ url('/') }}" />
        <meta property="og:type" content="website" />

        <!-- Meta para Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exclusive" />
        <meta name="twitter:description" content="Ofrecemos Ropa de calidad" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dnbklbswg/image/upload/v1765267450/exclusive-removebg-preview_x68ft5.png" />

        <!-- Fuentes -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts Laravel + Inertia + React -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

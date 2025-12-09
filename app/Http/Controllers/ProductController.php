<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $search = $request->query('search', '');
    $categorySlug = $request->query('category', '');

    $categoriesQuery = Category::with([
        'products' => function ($query) use ($search) {
            $query->where('available', 1)
                  ->when($search, fn($q) =>
                       $q->where('name', 'like', "%$search%")
                         ->orWhere('description', 'like', "%$search%"))
                  ->with(['variants.values.attribute', 'multimedia']);
        },
        'children.products' => function ($query) use ($search) {
            $query->where('available', 1)
                  ->when($search, fn($q) =>
                       $q->where('name', 'like', "%$search%")
                         ->orWhere('description', 'like', "%$search%"))
                  ->with(['variants.values.attribute', 'multimedia']);
        }
    ]);

    if ($categorySlug) {
        $categoriesQuery->where('slug', $categorySlug);
    }

    try {
        $categories = $categoriesQuery
            ->whereNull('parent_id')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'products' => $category->products->map(fn($p) => [
                        'id' => $p->id,
                        'name' => $p->name,
                        'description' => $p->description,
                        'price' => $p->price,
                        'available' => $p->available,
                        'image' => $p->multimedia->first()?->url,
                        'variants' => $p->variants->map(fn($v) => [
                            'id' => $v->id,
                            'stock' => $v->stock,
                            'sku' => $v->sku,
                            'price' => $v->price,
                            'values' => $v->values->map(fn($val) => [
                                'attribute' => $val->attribute->name,
                                'value' => $val->value
                            ])
                        ])
                    ]),
                    'children' => $category->children->map(fn($child) => [
                        'id' => $child->id,
                        'name' => $child->name,
                        'products' => $child->products->map(fn($p) => [
                            'id' => $p->id,
                            'name' => $p->name,
                            'description' => $p->description,
                            'price' => $p->price,
                            'available' => $p->available,
                            'image' => $p->multimedia->first()?->url,
                            'variants' => $p->variants->map(fn($v) => [
                                'id' => $v->id,
                                'stock' => $v->stock,
                                'sku' => $v->sku,
                                'price' => $v->price,
                                'values' => $v->values->map(fn($val) => [
                                    'attribute' => $val->attribute->name,
                                    'value' => $val->value
                                ])
                            ])
                        ])
                    ])
                ];
            });

        return response()->json($categories);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al cargar productos',
            'message' => $e->getMessage()
        ], 500);
    }
}
}

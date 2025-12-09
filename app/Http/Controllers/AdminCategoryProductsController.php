<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\ProductMultimedia;
use Inertia\Inertia;
use Cloudinary\Api\Upload\UploadApi;

class AdminCategoryProductsController extends Controller
{
 public function index($categoryId)
{
    $category = Category::select('id', 'name', 'description')
        ->findOrFail($categoryId);

    $products = Product::where('category_id', $categoryId)
        ->with([
            'multimedia',
            'variants.values.attribute'
        ])
        ->select('id', 'name', 'description', 'price', 'available')
        ->paginate(6)
        ->onEachSide(1);

    return Inertia::render('Admin/CategoryProducts', [
        'category' => $category,
        'products' => $products
    ]);
}

    // Guardar un producto nuevo
   public function store(Request $request)
{
    $request->validate([
        'category_id' => 'required|exists:categories,id',
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'image' => 'nullable|image|max:5120',
    ]);

    $product = Product::create([
        'category_id' => $request->category_id,
        'name' => $request->name,
        'description' => $request->description,
        'price' => $request->price,
        'available' => 1,
    ]);

    // Guardar multimedia si hay imagen
    if ($request->hasFile('image')) {
        $upload = (new UploadApi())->upload(
            $request->file('image')->getRealPath(),
            ['folder' => "products/$product->id"]
        );

        ProductMultimedia::create([
            'product_id' => $product->id,
            'url' => $upload['secure_url'],
            'type' => 'image'
        ]);
    }

    return response()->json([
    'status' => 'success',
    'product' => $product->load('multimedia')
]);
}

  public function update(Request $request, Product $product)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'image' => 'nullable|image|max:5120',
    ]);
 
    $product->update($request->only('name', 'description', 'price'));

   if ($request->hasFile('image')) {
    $upload = (new UploadApi())->upload(
        $request->file('image')->getRealPath(),
        ['folder' => "products/$product->id"]
    );

    // Si ya existe imagen, actualizarla; si no, crear
    $media = $product->multimedia()->where('type', 'image')->first();
    if ($media) {
        $media->update([
            'url' => $upload['secure_url'],
        ]);
    } else {
        $product->multimedia()->create([
            'url' => $upload['secure_url'],
            'type' => 'image'
        ]);
    }
}

   return response()->json([
    'status' => 'success',
    'product' => $product->load('multimedia')
]);
}

  public function destroy(Product $product)
{
    // Eliminar multimedia
    $product->multimedia()->delete();

    // Eliminar variantes y desvincular valores
    foreach ($product->variants as $variant) {

        // Importante: eliminar del pivote, NO borrar attribute_values
        $variant->values()->detach();

        // borrar la variante
        $variant->delete();
    }

    // Finalmente borrar el producto
    $product->delete();

    return response()->json(['status' => 'success']);
}
}

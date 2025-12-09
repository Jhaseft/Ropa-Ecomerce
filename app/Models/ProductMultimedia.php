<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMultimedia extends Model
{
    protected $fillable = [
        'product_id',
        'url',
        'type',
        'sort_order'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

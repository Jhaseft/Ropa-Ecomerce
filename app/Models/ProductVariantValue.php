<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariantValue extends Model
{
    protected $fillable = [
        'variant_id',
        'attribute_value_id'
    ];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function value()
    {
        return $this->belongsTo(ProductAttributeValue::class, 'attribute_value_id');
    }
}

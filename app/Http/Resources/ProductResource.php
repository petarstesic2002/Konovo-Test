<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sku' => $this['sku'],
            'name' => $this['naziv'],
            'price' => $this['price'],
            'description' => str_ireplace('brzina', 'performanse', $this['description']),
            'imgSrc' => $this['imgsrc'],
            'category' => $this['categoryName'],
            'brand' => $this['brandName'],
            'sifProduct' => $this['sif_product'],
            'vat' => $this['vat'],
            'ean' => $this['ean'],
            'stock' => $this['stock']
        ];
    }
}

<?php

namespace App;

interface ProductRepositoryInterface
{
    public function getAll(array $filters = []);
    public function find(int $id);
}

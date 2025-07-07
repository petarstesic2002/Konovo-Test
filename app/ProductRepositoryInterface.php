<?php

namespace App;

interface ProductRepositoryInterface
{
    public function getAll(string $token, array $filters = []);
    public function find(string $token, int $id);
}

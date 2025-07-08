<?php

namespace App;

interface ProductRepositoryInterface
{
    public function filter(string $token, array $filters = []);
    public function find(string $token, int $id);
    public function getAll(string $token);
}

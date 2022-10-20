<?php
declare(strict_types=1);

namespace App\Api;

use Symfony\Component\Routing\Annotation\Route;

/**
 * @Annotation
 */
class ApiRoute extends Route
{
    public function getDefaults()
    {
        return \array_merge(
            parent::getDefaults(),
            ['_is_api' => true]
        );
    }
}

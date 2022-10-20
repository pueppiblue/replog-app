<?php

namespace App\Controller;

use App\Entity\RepLog;
use App\Repository\RepLogRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class LiftController extends BaseController
{
    /**
     * @Route("/lift", name="lift")
     */
    public function indexAction(
        Request $request,
        RepLogRepository $replogRepo,
        UserRepository $userRepo,
        TranslatorInterface $translator
    ) {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $replogAppProps = [
            'withHeart' => true,
            'itemOptions' => [],
        ];

        foreach (RepLog::getThingsYouCanLiftChoices() as $transKey => $value) {
            $replogAppProps['itemOptions'][] = [
                'id' => $value,
                'text' => $translator->trans($transKey)
            ];
        }

        return $this->render('lift/index.html.twig', array(
            'leaderboard' => $this->getLeaders($replogRepo, $userRepo),
            'replogAppProps' => $replogAppProps,
        ));
    }

    /**
     * Returns an array of leader information
     *
     * @return array
     */
    private function getLeaders(RepLogRepository $replogRepo, UserRepository $userRepo)
    {
        $leaderboardDetails = $replogRepo->getLeaderboardDetails();

        $leaderboard = array();
        foreach ($leaderboardDetails as $details) {
            if (!$user = $userRepo->find($details['user_id'])) {
                // interesting, this user is missing...
                continue;
            }

            $leaderboard[] = array(
                'username' => $user->getUsername(),
                'weight' => $details['weightSum'],
                'in_cats' => number_format($details['weightSum']/RepLog::WEIGHT_FAT_CAT),
            );
        }

        return $leaderboard;
    }
}

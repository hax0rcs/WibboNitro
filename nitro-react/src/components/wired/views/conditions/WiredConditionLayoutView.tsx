import { WiredConditionlayout } from '../../../../api';
import { WiredConditionActorCompareHightScore } from './WiredConditionActorCompareHightScore';
import { WiredConditionActorHasHandItemView } from './WiredConditionActorHasHandItem';
import { WiredConditionActorHasPositionHightScore } from './WiredConditionActorHasPositionHightScore';
import { WiredConditionActorHasRotiation } from './WiredConditionActorHasRotiation';
import { WiredConditionActorIsGroupMemberView } from './WiredConditionActorIsGroupMemberView';
import { WiredConditionActorIsOnFurniView } from './WiredConditionActorIsOnFurniView';
import { WiredConditionActorIsTeamMemberView } from './WiredConditionActorIsTeamMemberView';
import { WiredConditionActorIsWearingBadgeView } from './WiredConditionActorIsWearingBadgeView';
import { WiredConditionActorIsWearingEffectView } from './WiredConditionActorIsWearingEffectView';
import { WiredConditionAltitudeView } from './WiredConditionAltitudeView';
import { WiredConditionChronoView } from './WiredConditionChronoView';
import { WiredConditionComparatorNonIdView } from './WiredConditionComparatorNonIdView';
import { WiredConditionDateRangeView } from './WiredConditionDateRangeView';
import { WiredConditionFreezeView } from './WiredConditionFreezeView';
import { WiredConditionFurniHasAvatarOnView } from './WiredConditionFurniHasAvatarOnView';
import { WiredConditionFurniHasColourView } from './WiredConditionFurniHasColourView';
import { WiredConditionFurniHasFurniOnView } from './WiredConditionFurniHasFurniOnView';
import { WiredConditionFurniHasNotFurniOnView } from './WiredConditionFurniHasNotFurniOnView';
import { WiredConditionFurniIsOfTypeView } from './WiredConditionFurniIsOfTypeView';
import { WiredConditionFurniMatchesSnapshotView } from './WiredConditionFurniMatchesSnapshotView';
import { WiredConditionFurniNotMatchesSnapshotView } from './WiredConditionFurniNotMatchesSnapshotView';
import { WiredConditionTeamHasPositionView } from './WiredConditionTeamHasPositionView';
import { WiredConditionTeamHasScoreView } from './WiredConditionTeamHasScoreView';
import { WiredConditionTimeElapsedLessView } from './WiredConditionTimeElapsedLessView';
import { WiredConditionTimeElapsedMoreView } from './WiredConditionTimeElapsedMoreView';
import { WiredConditionUserCountInRoomView } from './WiredConditionUserCountInRoomView';

export const WiredConditionLayoutView = (code: number) =>
{
    switch(code)
    {
        case WiredConditionlayout.ACTOR_HAS_HANDITEM:
            return <WiredConditionActorHasHandItemView />;
        case WiredConditionlayout.ACTOR_IS_GROUP_MEMBER:
        case WiredConditionlayout.NOT_ACTOR_IN_GROUP:
            return <WiredConditionActorIsGroupMemberView />;
        case WiredConditionlayout.ACTOR_IS_ON_FURNI:
        case WiredConditionlayout.NOT_ACTOR_ON_FURNI:
            return <WiredConditionActorIsOnFurniView />;
        case WiredConditionlayout.ACTOR_IS_IN_TEAM:
        case WiredConditionlayout.NOT_ACTOR_IN_TEAM:
            return <WiredConditionActorIsTeamMemberView />;
        case WiredConditionlayout.ACTOR_IS_WEARING_BADGE:
        case WiredConditionlayout.NOT_ACTOR_WEARS_BADGE:
            return <WiredConditionActorIsWearingBadgeView />;
        case WiredConditionlayout.ACTOR_IS_WEARING_EFFECT:
        case WiredConditionlayout.NOT_ACTOR_WEARING_EFFECT:
            return <WiredConditionActorIsWearingEffectView />;
        case WiredConditionlayout.DATE_RANGE_ACTIVE:
            return <WiredConditionDateRangeView />;
        case WiredConditionlayout.FURNIS_HAVE_AVATARS:
        case WiredConditionlayout.FURNI_NOT_HAVE_HABBO:
            return <WiredConditionFurniHasAvatarOnView />;
        case WiredConditionlayout.HAS_STACKED_FURNIS:
            return <WiredConditionFurniHasFurniOnView />;
        case WiredConditionlayout.NOT_HAS_STACKED_FURNIS:
            return <WiredConditionFurniHasNotFurniOnView />;
        case WiredConditionlayout.STUFF_TYPE_MATCHES:
        case WiredConditionlayout.NOT_FURNI_IS_OF_TYPE:
            return <WiredConditionFurniIsOfTypeView />;
        case WiredConditionlayout.STATES_MATCH:
            return <WiredConditionFurniMatchesSnapshotView />;
        case WiredConditionlayout.NOT_STATES_MATCH:
            return <WiredConditionFurniNotMatchesSnapshotView />;
        case WiredConditionlayout.TIME_ELAPSED_LESS:
            return <WiredConditionTimeElapsedLessView />;
        case WiredConditionlayout.TIME_ELAPSED_MORE:
            return <WiredConditionTimeElapsedMoreView />;
        case WiredConditionlayout.USER_COUNT_IN:
        case WiredConditionlayout.NOT_USER_COUNT_IN:
            return <WiredConditionUserCountInRoomView />;
        case WiredConditionlayout.ACTOR_COMPARE_HIGHSCORE:
            return <WiredConditionActorCompareHightScore />;
        case WiredConditionlayout.CHRONO_COMPARE:
            return <WiredConditionChronoView />   
        case WiredConditionlayout.ACTOR_COMPARE_ROTATION:
            return <WiredConditionActorHasRotiation />    
        case WiredConditionlayout.TEAM_HAS_RANK:
            return <WiredConditionTeamHasPositionView />   
        case WiredConditionlayout.TEAM_HAS_SCORE:
            return <WiredConditionTeamHasScoreView />  
        case WiredConditionlayout.FURNI_ALTITUDE:
            return <WiredConditionAltitudeView />
        case WiredConditionlayout.USER_POSITION:
            return <WiredConditionActorHasPositionHightScore />
        case WiredConditionlayout.FURNI_HAS_COLOUR:
            return <WiredConditionFurniHasColourView />
        case WiredConditionlayout.COMPARATOR_NON_ID:
            return <WiredConditionComparatorNonIdView />
        case WiredConditionlayout.HAS_FREEZE:
            return <WiredConditionFreezeView />
    }

    return null;
}

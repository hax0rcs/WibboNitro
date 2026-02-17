import { WiredActionLayoutCode } from '../../../../api';
import { WiredActionActorMoveRotateView } from './WiredActionActorMoveRotateView';
import { WiredActionAltitudeView } from './WiredActionAltitudeView';
import { WiredActionBotActionView } from './WiredActionBotActionView';
import { WiredActionBotChangeFigureView } from './WiredActionBotChangeFigureView';
import { WiredActionBotDanceView } from './WiredActionBotDanceView';
import { WiredActionBotEnableView } from './WiredActionBotEnableView';
import { WiredActionBotFollowAvatarView } from './WiredActionBotFollowAvatarView';
import { WiredActionBotFreezeView } from './WiredActionBotFreezeView';
import { WiredActionBotGiveHandItemView } from './WiredActionBotGiveHandItemView';
import { WiredActionBotHanditemView } from './WiredActionBotHanditemView';
import { WiredActionBotMoveView } from './WiredActionBotMoveView';
import { WiredActionBotTalkToAvatarView } from './WiredActionBotTalkToAvatarView';
import { WiredActionBotTalkView } from './WiredActionBotTalkView';
import { WiredActionBotTeleportView } from './WiredActionBotTeleportView';
import { WiredActionCallAnotherStackView } from './WiredActionCallAnotherStackView';
import { WiredActionChangeColourView } from './WiredActionChangeColourView';
import { WiredActionChaseView } from './WiredActionChaseView';
import { WiredActionChatView } from './WiredActionChatView';
import { WiredActionCollsionCaseView } from './WiredActionCollisionCaseView';
import { WiredActionControlChronoView } from './WiredActionControlChrono';
import { WiredActionDanceView } from './WiredActionDanceView';
import { WiredActionEnableView } from './WiredActionEnableView';
import { WiredActionFleeView } from './WiredActionFleeView';
import { WiredActionFreezeView } from './WiredActionFreezeview';
import { WiredActionGiveLifView } from './WiredActionGiveLifView';
import { WiredActionGivePointsHighScore } from './WiredActionGivePointsHighScore';
import { WiredActionGiveRewardView } from './WiredActionGiveRewardView';
import { WiredActionGiveScoreToPredefinedTeamView } from './WiredActionGiveScoreToPredefinedTeamView';
import { WiredActionGiveScoreView } from './WiredActionGiveScoreView';
import { WiredActionHanditemView } from './WiredActionHanditemView';
import { WiredActionJoinTeamView } from './WiredActionJoinTeamView';
import { WiredActionKickFromRoomView } from './WiredActionKickFromRoomView';
import { WiredActionLeaveTeamView } from './WiredActionLeaveTeamView';
import { WiredActionMoveAndRotateFurniView } from './WiredActionMoveAndRotateFurniView';
import { WiredActionMoveFurniToView } from './WiredActionMoveFurniToView';
import { WiredActionMoveFurniView } from './WiredActionMoveFurniView';
import { WiredActionMuteUserView } from './WiredActionMuteUserView';
import { WiredActionResetView } from './WiredActionResetView';
import { WiredActionRotationView } from './WiredActionRotationView';
import { WiredActionSetFurniStateToView } from './WiredActionSetFurniStateToView';
import { WiredActionTeleportView } from './WiredActionTeleportView';
import { WiredActionToggleFurniStateView } from './WiredActionToggleFurniStateView';
import { WiredActionTridimensionView } from './WiredActionTridimensionView';

export const WiredActionLayoutView = (code: number) =>
{
    switch(code)
    {
        case WiredActionLayoutCode.BOT_CHANGE_FIGURE:
            return <WiredActionBotChangeFigureView />;
        case WiredActionLayoutCode.BOT_FOLLOW_AVATAR:
            return <WiredActionBotFollowAvatarView />;
        case WiredActionLayoutCode.BOT_GIVE_HAND_ITEM:
            return <WiredActionBotGiveHandItemView />;
        case WiredActionLayoutCode.BOT_MOVE:
            return <WiredActionBotMoveView />;
        case WiredActionLayoutCode.BOT_TALK:
            return <WiredActionBotTalkView />;
        case WiredActionLayoutCode.BOT_TALK_DIRECT_TO_AVTR:
            return <WiredActionBotTalkToAvatarView />;
        case WiredActionLayoutCode.BOT_TELEPORT:
            return <WiredActionBotTeleportView />;
        case WiredActionLayoutCode.CALL_ANOTHER_STACK:
            return <WiredActionCallAnotherStackView />;
        case WiredActionLayoutCode.CHASE:
            return <WiredActionChaseView />;
        case WiredActionLayoutCode.CHAT:
            return <WiredActionChatView />;
        case WiredActionLayoutCode.FLEE:
            return <WiredActionFleeView />;
        case WiredActionLayoutCode.GIVE_REWARD:
            return <WiredActionGiveRewardView />;
        case WiredActionLayoutCode.GIVE_SCORE:
            return <WiredActionGiveScoreView />;
        case WiredActionLayoutCode.GIVE_SCORE_TO_PREDEFINED_TEAM:
            return <WiredActionGiveScoreToPredefinedTeamView />;
        case WiredActionLayoutCode.JOIN_TEAM:
            return <WiredActionJoinTeamView />;
        case WiredActionLayoutCode.KICK_FROM_ROOM:
            return <WiredActionKickFromRoomView />;
        case WiredActionLayoutCode.LEAVE_TEAM:
            return <WiredActionLeaveTeamView />;
        case WiredActionLayoutCode.MOVE_FURNI:
            return <WiredActionMoveFurniView />;
        case WiredActionLayoutCode.MOVE_AND_ROTATE_FURNI:
            return <WiredActionMoveAndRotateFurniView />;
        case WiredActionLayoutCode.MOVE_FURNI_TO:
            return <WiredActionMoveFurniToView />;
        case WiredActionLayoutCode.MUTE_USER:
            return <WiredActionMuteUserView />;
        case WiredActionLayoutCode.RESET:
            return <WiredActionResetView />;
        case WiredActionLayoutCode.SET_FURNI_STATE:
            return <WiredActionSetFurniStateToView />;
        case WiredActionLayoutCode.TELEPORT:
            return <WiredActionTeleportView />;
        case WiredActionLayoutCode.TOGGLE_FURNI_STATE:
            return <WiredActionToggleFurniStateView />;
        case WiredActionLayoutCode.TRI_DIMENSION:
            return <WiredActionTridimensionView />;
        case WiredActionLayoutCode.COLLISION_CASE:
            return <WiredActionCollsionCaseView />;
        case WiredActionLayoutCode.GIVE_POINTS_HIGHSCORE:
            return <WiredActionGivePointsHighScore />;
        case WiredActionLayoutCode.GIVE_LIFES:
            return <WiredActionGiveLifView/>
        case WiredActionLayoutCode.CONTROL_CHRONO:
            return <WiredActionControlChronoView />
        case WiredActionLayoutCode.USER_ROTATION:
            return <WiredActionRotationView />
        case WiredActionLayoutCode.ALTITUDE:
            return <WiredActionAltitudeView />
        case WiredActionLayoutCode.USER_MOV_ROT:
            return <WiredActionActorMoveRotateView />
        case WiredActionLayoutCode.FURNI_COLOUR:
            return <WiredActionChangeColourView />
        case WiredActionLayoutCode.FREEZE:
            return <WiredActionFreezeView />
        case WiredActionLayoutCode.HANDITEM:
            return <WiredActionHanditemView />
        case WiredActionLayoutCode.ENABLE:
            return <WiredActionEnableView />
        case WiredActionLayoutCode.DANCE:
            return <WiredActionDanceView />        
        case WiredActionLayoutCode.BOT_GENERIC_ACTION:
            return <WiredActionBotActionView />
        case WiredActionLayoutCode.BOT_DANCE:
            return <WiredActionBotDanceView />
        case WiredActionLayoutCode.BOT_EFFECT:
            return <WiredActionBotEnableView />
        case WiredActionLayoutCode.BOT_HANDITEM:
            return <WiredActionBotHanditemView />
        case WiredActionLayoutCode.BOT_FREEZE:
            return <WiredActionBotFreezeView />            
    }

    return null;
}

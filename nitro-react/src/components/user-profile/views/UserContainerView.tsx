import { FriendlyTime, RequestFriendComposer, UserProfileParser } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { GetSessionDataManager, LocalizeFormattedNumber, LocalizeText, SendMessageComposer } from '../../../api';
import { Column, Flex, LayoutAvatarImageView, LayoutBadgeImageView, Text } from '../../../common';

interface UserContainerViewProps
{
    userProfile: UserProfileParser;
}

export const UserContainerView: FC<UserContainerViewProps> = props =>
{
    const { userProfile = null } = props;
    const [ requestSent, setRequestSent ] = useState(userProfile.requestSent);
    const isOwnProfile = (userProfile.id === GetSessionDataManager().userId);
    const canSendFriendRequest = !requestSent && (!isOwnProfile && !userProfile.isMyFriend && !userProfile.requestSent);

    const addFriend = () =>
    {
        setRequestSent(true);

        SendMessageComposer(new RequestFriendComposer(userProfile.username));
    }

    useEffect(() =>
    {
        setRequestSent(userProfile.requestSent);
    }, [ userProfile ])

    return (
        <Flex gap={ 2 }>
            <Column center className="avatar-container">
                <LayoutAvatarImageView figure={ userProfile.figure } direction={ 2 } />
            </Column>
            <Column>
                <Column gap={ 0 }>
                <Flex alignItems='center' gap={5} justifyContent='between'>
                     <Flex>
                    <Text bold small>{ userProfile.username }</Text>
                    </Flex>
                    { userProfile.rank > 1 &&
                        <Flex>
                        <LayoutBadgeImageView className="absolute profile-rank" badgeCode={ userProfile.rank == 2 ? 'VIP' : userProfile.rank >= 5 ? 'ADM' : userProfile.rank >= 11 ? 'ADM' : ''} isGroup={ false }/>
                    </Flex>
                    }
                    </Flex>
                    <Text italics textBreak small>{ userProfile.motto }&nbsp;</Text>
                </Column>
                <Column gap={ 1 }>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.created') }</b> { userProfile.registration.replaceAll('/', '-') }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.last.login') }</b> { FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2) }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.achievementscore') }</b> { LocalizeFormattedNumber(userProfile.achievementPoints) }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.games.win') }</b> { LocalizeFormattedNumber(userProfile.eventWins) }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.respects') }</b> { LocalizeFormattedNumber(userProfile.respects) }
                    </Text>
                </Column>
                <Flex gap={ 1 }>
                    { userProfile.isOnline &&
                        <i className="icon icon-pf-online" /> }
                    { !userProfile.isOnline &&
                        <i className="icon icon-pf-offline" /> }
                    <Flex alignItems="center" gap={ 1 }>
                        { canSendFriendRequest &&
                            <Text small underline pointer onClick={ addFriend }>{ LocalizeText('extendedprofile.addasafriend') }</Text> }
                        { !canSendFriendRequest &&
                            <>
                                <i className="icon icon-pf-tick" />
                                { isOwnProfile &&
                                    <Text bold small>{ LocalizeText('extendedprofile.me') }</Text> }
                                { userProfile.isMyFriend &&
                                    <Text>{ LocalizeText('extendedprofile.friend') }</Text> }
                                { (requestSent || userProfile.requestSent) &&
                                    <Text>{ LocalizeText('extendedprofile.friendrequestsent') }</Text> }
                            </> }
                    </Flex>
                </Flex>
            </Column>
        </Flex>
    )
}

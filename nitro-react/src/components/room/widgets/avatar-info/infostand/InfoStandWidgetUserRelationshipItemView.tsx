import { RelationshipStatusEnum, RelationshipStatusInfo } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { GetUserProfile, LocalizeText } from '../../../../../api';
import { Flex, Text } from '../../../../../common';

interface InfoStandWidgetUserRelationshipsRelationshipItemViewProps {
    type: number;
    relationship: RelationshipStatusInfo;
}

export const InfoStandWidgetUserRelationshipsRelationshipItemView: FC<InfoStandWidgetUserRelationshipsRelationshipItemViewProps> = props => {
    const { type = -1, relationship = null } = props;

    const relationshipName = type >= 0 && RelationshipStatusEnum.RELATIONSHIP_NAMES[type]
        ? RelationshipStatusEnum.RELATIONSHIP_NAMES[type].toLowerCase()
        : 'empty';

    return (
        <>
            { !relationship ? (
                <Flex alignItems="center" gap={1}>
                    <i className="nitro-friends-spritesheet icon-empty" />
                    <Flex alignItems="center" gap={0}>
                        <Text small variant="white">
                            <u></u>
                        </Text>
                    </Flex>
                </Flex>
            ) : (
                <Flex alignItems="center" gap={1}>
                    <i className={`nitro-friends-spritesheet icon-${relationshipName}`} />
                    <Flex alignItems="center" gap={0}>
                        <Text small variant="white" onClick={event => GetUserProfile(relationship.randomFriendId)}>
                            <u>{relationship.randomFriendName}</u>
                            {relationship.friendCount > 1 && 
                            <Text className="friends-count" variant='white' small>
                                 { LocalizeText(`extendedprofile.relstatus.others.${relationshipName}`, ['count'], [(relationship.friendCount - 1).toString()])}
                            </Text>}
                        </Text>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

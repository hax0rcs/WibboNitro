import { CatalogGroupsComposer } from '@nitrots/nitro-renderer';
import { StringDataType } from '@nitrots/nitro-renderer/src';
import { FC, useEffect, useMemo, useState } from 'react';
import { LocalizeText, SendMessageComposer, WiredFurniType } from '../../../../api';
import { Column, Flex, LayoutBadgeImageView, Text } from '../../../../common';
import { useCatalog, useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionActorIsGroupMemberView: FC<{}> = props => {

    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string>('none'); 

    const { trigger = null, setIntParams = null } = useWired();
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const { catalogOptions = null } = useCatalog();
    const groups = catalogOptions?.groups || [];

    const save = () => setIntParams([selectedGroupIndex, selectedOption === 'member' ? 1 : 0, selectedOption === 'admin' ? 1 : 0, selectedOption === 'owner' ? 1 : 0]);

    const previewStuffData = useMemo(() => {
        if (!groups.length) return null;

        const group = groups[selectedGroupIndex];

        if (!group) return null;

        const stuffData = new StringDataType();

        stuffData.setValue(['0', group.groupId.toString(), group.badgeCode, group.colorA, group.colorB]);

        return stuffData;
    }, [selectedGroupIndex, groups]);

    useEffect(() => {
        if (trigger.intData.length > 0) setSelectedGroupIndex(trigger.intData[0]);
        const isMember = (trigger.intData.length > 1) ? trigger.intData[1] === 1 : false;
        const isAdmin = (trigger.intData.length > 1) ? trigger.intData[2] === 1 : false;
        const isOwner = (trigger.intData.length > 2) ? trigger.intData[3] === 1 : false;

        if(isMember || isAdmin || isOwner)
        {
            setMoreOptions(true);
        }
        
        setSelectedOption(isMember ? 'member' : isAdmin ? 'admin' : isOwner ? 'owner' : 'none');
    }, [trigger]);

    useEffect(() => {
        SendMessageComposer(new CatalogGroupsComposer());
    }, []);

    return (
        <WiredConditionBaseView requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={false} save={save}>
            <Text bold>{LocalizeText('wired.params.groups.selectgroups')}</Text>
            <Column gap={1}>
                <Flex alignItems="center" gap={2}>
                    <select className="form-select form-select-sm" value={selectedGroupIndex} onChange={event => setSelectedGroupIndex(parseInt(event.target.value))}>
                        {groups.map((group, index) => (
                            <option key={index} value={index}>{group.groupName}</option>
                        ))}
                    </select>
                    <div className="selected-group">
                        {groups[selectedGroupIndex] && <LayoutBadgeImageView badgeCode={groups[selectedGroupIndex].badgeCode} isGroup={true} />}
                    </div>
                </Flex>
            </Column>
            <Flex justifyContent='center'><Text underline onClick={() => setMoreOptions(!moreOptions)}>{LocalizeText('wired.params.groups.moreoptions')}</Text></Flex>
            {moreOptions &&
                <Column gap={1}>
                    <Text bold>{LocalizeText('wired.params.groups.user_status')}</Text>
                    <Flex alignItems="center" gap={2}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="groupStatus"
                            id="memberOption"
                            checked={selectedOption === 'member'}
                            onChange={() => setSelectedOption('member')}
                        />
                        <Text>{LocalizeText('wiredfurni.params.groups.is_member')}</Text>
                    </Flex>
                    <Flex alignItems="center" gap={2}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="groupStatus"
                            id="adminOption"
                            checked={selectedOption === 'admin'}
                            onChange={() => setSelectedOption('admin')}
                        />
                        <Text>{LocalizeText('wiredfurni.params.groups.is_admin')}</Text>
                    </Flex>
                    <Flex alignItems="center" gap={2}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="groupStatus"
                            id="ownerOption"
                            checked={selectedOption === 'owner'}
                            onChange={() => setSelectedOption('owner')}
                        />
                        <Text>{LocalizeText('wiredfurni.params.groups.is_owner')}</Text>
                    </Flex>
                </Column>
            }
        </WiredConditionBaseView>
    );
}

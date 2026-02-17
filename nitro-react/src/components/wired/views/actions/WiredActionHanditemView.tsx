import { FC, useEffect, useState } from 'react';
import { GetUserCurrentCarryItem, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionHanditemView: FC<{}> = props =>
{
    const [ handItemId, setHandItemId ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ handItemId ]);

    useEffect(() =>
    {
        if(trigger.intData.length == 1)
        {
            setHandItemId(trigger.intData[0] || 0);
        }
    }, [ trigger ]);

    const handleCustomizeClick = () => {
        const currentEffect = GetUserCurrentCarryItem();
        setHandItemId(currentEffect);
    };

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{LocalizeText('wiredfurni.params.handitem.options')}</Text><Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.handitem.get_my_carryitm')}</Button>
                        <input type='number' className="form-control form-control-sm" value={ handItemId } onChange={event => setHandItemId(parseInt(event.target.value))}></input>
                    </Flex>
            </Column>
        </WiredActionBaseView>
    );
}

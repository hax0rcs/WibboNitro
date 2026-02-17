import { FC, useEffect, useState } from 'react';
import { GetUserCurrentCarryItem, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionBotHanditemView: FC<{}> = props =>
{
    const [ botName, setBotName ] = useState<string>('');
    const [ handItemId, setHandItemId ] = useState<number>(0);
    const { trigger = null, setIntParams = null, setStringParam } = useWired();

    const save = (() =>
    {
        setStringParam(botName);
        setIntParams([ handItemId ]);
    });


    useEffect(() =>
    {
        if(trigger)
        {
            setBotName(trigger.stringData);
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
                <Text bold>{LocalizeText('wiredfurni.params.handitem.options')}</Text>
                <Text bold>{ LocalizeText('wiredfurni.params.bot.name') }</Text>
                <Flex alignItems="center" gap={2}>
                    <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ botName } onChange={ event => setBotName(event.target.value) } />
                    </Flex>
                    <Flex alignItems="center" gap={2}>

                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.handitem.get_my_carryitm')}</Button>
                        <input type='number' className="form-control form-control-sm" value={ handItemId } onChange={event => setHandItemId(parseInt(event.target.value))}></input>
                        </Flex>
            </Column>
        </WiredActionBaseView>
    );
}

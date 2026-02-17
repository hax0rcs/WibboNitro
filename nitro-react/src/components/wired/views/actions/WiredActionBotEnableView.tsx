import { FC, useEffect, useState } from 'react';
import { GetUserCurrentEffect, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionBotEnableView: FC<{}> = props =>
{
    const [ botName, setBotName ] = useState<string>('');
    const [ enableId, setEnableId ] = useState<number>(0);
    const { trigger = null, setIntParams = null, setStringParam = null } = useWired();

    const save = (() => 
    {
        setStringParam(botName);
        setIntParams([ enableId ]);
    }
    );

    useEffect(() =>
    {
        if(trigger)
        {
            setBotName(trigger.stringData);
            setEnableId(trigger.intData[0] || 0);
        }
    }, [ trigger ]);

    const handleCustomizeClick = () => {
        const currentEffect = GetUserCurrentEffect();
        setEnableId(currentEffect);
    };

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{LocalizeText('wiredfurni.params.enable.options')}</Text>
                <Text bold>{ LocalizeText('wiredfurni.params.bot.name') }</Text>
                <Flex alignItems="center" gap={2}>
                        <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ botName } onChange={ event => setBotName(event.target.value) } />
                        </Flex>
                        <hr className="m-0 bg-dark" />
                        <Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.enable.get_my_effectid')}</Button>
                        <input type='number' className="form-control form-control-sm" value={ enableId } onChange={event => setEnableId(parseInt(event.target.value))}></input>
                        </Flex>
            </Column>
        </WiredActionBaseView>
    );
}

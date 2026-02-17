import { FC, useEffect, useState } from 'react';
import { GetUserCurrentEffect, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionEnableView: FC<{}> = props =>
{
    const [ enableId, setEnableId ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ enableId ]);

    useEffect(() =>
    {
        if(trigger.intData.length == 1)
        {
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
                <Text bold>{LocalizeText('wiredfurni.params.enable.options')}</Text><Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.enable.get_my_effectid')}</Button>
                        <input type='number' className="form-control form-control-sm" value={ enableId } onChange={event => setEnableId(parseInt(event.target.value))}></input>
                    </Flex>
            </Column>
        </WiredActionBaseView>
    );
}

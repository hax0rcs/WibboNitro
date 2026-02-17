import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionToggleFurniStateView: FC<{}> = props =>
{
    const [ stateFlag, setStateFlag ] = useState<number>(-1);
    const [ randomize, setRandomize ] = useState<number>(-1);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ stateFlag, randomize ]);

    useEffect(() =>
    {
        setStateFlag(trigger.getBoolean(0) ? 1 : 0);
        setRandomize(trigger.getBoolean(1) ? 1 : 0);
    }, [ trigger ]);
    
    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT } hasSpecialInput={ false } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.action') }</Text>
                <Flex gap={ 1 } alignItems='center'>
                    <input className="form-check-input" type="checkbox" name="reverse" id="selectedMode0" checked={ (stateFlag === 1) } onChange={ event => setStateFlag(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.toggle.reverse') }</Text>
                </Flex>
                <Flex gap={ 1 } alignItems='center'>
                    <input className="form-check-input" type="checkbox" name="randomize" id="selectedMode1" checked={ (randomize === 1) } onChange={ event => setRandomize(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.toggle.randomize') }</Text>
                </Flex>
                </Column>
        </WiredActionBaseView>
    );
}

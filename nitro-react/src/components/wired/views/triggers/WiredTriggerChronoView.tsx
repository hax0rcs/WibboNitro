import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerChronoView: FC<{}> = props => 
{
    const [ selectedMinutes, setSelectedMinutes ] = useState<number>(0);
    const [ selectedSeconds, setSelectedSeconds ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => 
    {
        setIntParams([ selectedMinutes, selectedSeconds ]);
    }

    useEffect(() => 
    {
        if (trigger && trigger.intData.length > 0) 
        {
            setSelectedMinutes(trigger.intData[0]);
            setSelectedSeconds(trigger.intData[1]);
        }
    }, [ trigger ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.minutes') }</Text>
                <Text>{ LocalizeText('wiredfurni.params.minutes.left').replace('%minutes%', selectedMinutes.toString()) } : { selectedMinutes }</Text>
                <Slider
                    min={ 0 }
                    max={ 99 }
                    value={ selectedMinutes }
                    onChange={ event => setSelectedMinutes(event) } />
                <Text bold>{ LocalizeText('wiredfurni.params.secounds') }</Text>
                <Text>{ LocalizeText('wiredfurni.params.secounds.left').replace('%secounds%', selectedMinutes.toString()) } : { selectedSeconds }</Text>
                <Slider
                    min={ 0 }
                    max={ 59 }
                    value={ selectedSeconds }
                    onChange={ event => setSelectedSeconds(event) } />
            </Column>
        </WiredTriggerBaseView>
    );
}

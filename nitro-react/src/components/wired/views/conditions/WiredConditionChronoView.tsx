import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionChronoView: FC<{}> = props =>
{
    const [ selectedChronoOption, setSelectedChronoOption ] = useState<number>(0);

    const [ selectedChronoMinutes, setSelectedChronoMinutes ] = useState<number>(0);
    const [ selectedChronoSeconds, setSelectedChronoSeconds ] = useState<number>(0);

    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ selectedChronoOption, selectedChronoMinutes, selectedChronoSeconds ]);

    useEffect(() =>
    {
        if(trigger.intData.length > 0) 
        {
            setSelectedChronoOption(trigger.intData[0])
            setSelectedChronoMinutes(trigger.intData[1]);
            setSelectedChronoSeconds(trigger.intData[2]);
        }
    }, [ trigger ]);

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.chrono.options') }</Text>
                { [ 0, 1, 2, 3 ].map(chrono =>
                {
                    return (
                        <Flex key={ chrono } gap={ 1 }>
                            <input className="form-check-input" type="radio" name="selectedChrono" id={ `selectedChrono${ chrono }` } checked={ (selectedChronoOption === chrono) } onChange={ event => setSelectedChronoOption(chrono) } />
                            <Text>{ LocalizeText(`wiredfurni.params.chrono.option.${ chrono }`) }</Text>
                        </Flex>
                    )
                }) }
            </Column>
            <Column>
                <Text bold>{ LocalizeText('wiredfurni.params.minutes') }</Text>
                <Text>{ LocalizeText('wiredfurni.params.minutes.left').replace('%minutess%', selectedChronoMinutes.toString()) } : { selectedChronoMinutes }</Text>
                <Slider
                    min={ 0 }
                    max={ 99 }
                    value={ selectedChronoMinutes }
                    onChange={ event => setSelectedChronoMinutes(event) } />
                <Text bold>{ LocalizeText('wiredfurni.params.secounds') }</Text>
                <Text>{ LocalizeText('wiredfurni.params.secounds.left').replace('%secounds%', selectedChronoSeconds.toString()) } : { selectedChronoSeconds }</Text>
                <Slider
                    min={ 0 }
                    max={ 59 }
                    value={ selectedChronoSeconds }
                    onChange={ event => setSelectedChronoSeconds(event) } />
            </Column>
        </WiredConditionBaseView>
    );
}

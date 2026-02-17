import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionAltitudeView: FC<{}> = props =>
{
    const [ height, setHeight ] = useState<number>(1.00);
    const [ modeFlag, setModeFlag ] = useState<number>(0);

    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ modeFlag, Math.round(height * 100) ]);

    useEffect(() =>
    {
        if(trigger.intData.length > 0)
        {
            setModeFlag(trigger.intData[0]);
            setHeight(trigger.intData[1] / 100.0);
        }
    }, [ trigger ]);

    const handleHeightChange = (value: number) => 
    {
        if(value < 0) value = 0;
        if(value > 40) value = 40;
        setHeight(parseFloat(value.toFixed(2)));
    }

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.altitude.alti_ude') }</Text>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode0" checked={ (modeFlag === 0) } onChange={ () => setModeFlag(0) } />
                    <Text>{ LocalizeText('wiredfurni.params.altitude.0') }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode1" checked={ (modeFlag === 1) } onChange={ () => setModeFlag(1) } />
                    <Text>{ LocalizeText('wiredfurni.params.altitude.1') }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode2" checked={ (modeFlag === 2) } onChange={ () => setModeFlag(2) } />
                    <Text>{ LocalizeText('wiredfurni.params.altitude.2') }</Text>
                </Flex>
                <hr className="m-0 bg-dark" />
                <Flex gap={ 3 } justifyContent="between" alignItems="center">
                    <Flex>
                        <Text bold>{ LocalizeText('wiredfurni.params.altitude.height', [ 'height' ], [ height.toFixed(2) ]) }</Text>
                    </Flex>
                    <Flex>
                        <input
                            style={ { width: 60, height: 20 } }
                            type="number"
                            className="form-control form-control-sm"
                            max={ 40 }
                            min={ 0 }
                            step={ 0.01 }
                            value={ height }
                            onChange={ event => handleHeightChange(parseFloat(event.target.value)) } />
                    </Flex>
                </Flex>
                <Slider
                    min={ 0.0 }
                    max={ 40.0 }
                    step={ 0.01 }
                    value={ height }
                    onChange={ event => handleHeightChange(event) } />
            </Column>
        </WiredActionBaseView>
    );
}

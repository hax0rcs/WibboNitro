import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionAltitudeView: FC<{}> = props =>
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

    const handleHeightChange = (value: number) => {
        if(value < 0) value = 0;
        if(value > 40) value = 40;
        setHeight(parseFloat(value.toFixed(2)));
    }

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.altitude.alti_ude') }</Text>
                <Grid columnCount={ 3 } gap={ 1 }>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode0" checked={ (modeFlag === 0) } onChange={ () => setModeFlag(0) } />
                    <Text>{ `>` }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode1" checked={ (modeFlag === 1) } onChange={ () => setModeFlag(1) } />
                    <Text>{ `<` }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode2" checked={ (modeFlag === 2) } onChange={ () => setModeFlag(2) } />
                    <Text>{ `>=` }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode3" checked={ (modeFlag === 3) } onChange={ () => setModeFlag(3) } />
                    <Text>{ `<=` }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode4" checked={ (modeFlag === 4) } onChange={ () => setModeFlag(4) } />
                    <Text>{ `==` }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedMode" id="selectedMode5" checked={ (modeFlag === 5) } onChange={ () => setModeFlag(5) } />
                    <Text>{ `!=` }</Text>
                </Flex>
                </Grid>
                <hr className="m-0 bg-dark" />
                <Flex gap={ 3 } justifyContent="between" alignItems="center">
                    <Flex>
                        <Text bold>{ LocalizeText('wiredfurni.params.altitude.height', [ 'height' ], [ height.toFixed(2) ]) }</Text>
                    </Flex>
                    <Flex>
                        <input
                            style={{ width: 60, height: 20 }}
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
        </WiredConditionBaseView>
    );
}

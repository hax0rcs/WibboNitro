import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionControlChronoView: FC<{}> = props =>
{
    const [ selectedChrono, setSelectedChrono ] = useState(-1);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ selectedChrono ]);

    useEffect(() =>
    {
        setSelectedChrono((trigger.intData.length > 0) ? trigger.intData[0] : 0);
    }, [ trigger ]);

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.chrono.options') }</Text>
                { [0, 1, 2, 3 ].map(chrono =>
                {
                    return (
                        <Flex key={ chrono } gap={ 1 }>
                            <input className="form-check-input" type="radio" name="selectedChrono" id={ `selectedChrono${ chrono }` } checked={ (selectedChrono === chrono) } onChange={ event => setSelectedChrono(chrono) } />
                            <Text>{ LocalizeText(`wiredfurni.params.chrono.option.${ chrono }`) }</Text>
                        </Flex>
                    )
                }) }
            </Column>
        </WiredActionBaseView>
    );
}

import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerAchievedLifeView: FC<{}> = props =>
{
    const [ operatorId, setOperatorId ] = useState<number>(0);
    const [ compareValue, setCompareValue ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () =>
    {
        setIntParams([ operatorId, compareValue ]);
    }

    useEffect(() =>
    {
        if (trigger && trigger.intData && trigger.intData.length > 0)
        {
            setOperatorId(trigger.intData[0] || 0);
            setCompareValue(trigger.intData[1] || 0);
        }
    }, [ trigger ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Escolha uma opção </Text>
                <select className="form-select form-select-sm" value={ operatorId } onChange={ event => setOperatorId(parseInt(event.target.value) || 0) }>
                    <option value={ 0 }>Ganhou Vidas</option>
                    <option value={ 1 }>Perdeu Vidas</option>
                    <option value={ 5 }>Substitui as Vidas</option>
                    <option value={ 6 }>Morreu</option>
                </select>
            </Column>
            <Column gap={ 1 }>
                <Text bold>Quantidade</Text>
                <input type="number" className="form-control form-control-sm" value={ compareValue } onChange={ event => setCompareValue(parseInt(event.target.value) || 0) } />
            </Column>
        </WiredTriggerBaseView>
    );
}

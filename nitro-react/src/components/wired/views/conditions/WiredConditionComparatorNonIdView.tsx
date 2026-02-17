import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionComparatorNonIdView: FC<{}> = props =>
{
    const [ operatorId, setOperatorId ] = useState(0);
    const [ compareValue, setCompareValue ] = useState('');
    const { trigger = null, setIntParams = null, setStringParam = null } = useWired();

    const save = () =>
    {
        setStringParam(compareValue);
        setIntParams([ operatorId ]);
    }

    useEffect(() =>
    {
        setCompareValue(trigger.stringData);
        setOperatorId((trigger.intData.length > 0) ? trigger.intData[0] : 0);
    }, [ trigger ]);

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Escolha uma opção</Text>
                <select className="form-select form-select-sm" value={ operatorId } onChange={ event => setOperatorId(parseInt(event.target.value)) }>
                    <option value={ 0 }>É igual</option>
                    <option value={ 1 }>Diferente</option>
                    <option value={ 2 }>Menor ou Igual</option>
                    <option value={ 3 }>Menor</option>
                    <option value={ 4 }>Maior ou Igual</option>
                    <option value={ 5 }>Maior</option>
                </select>
            </Column>
            <Column gap={ 1 }>
                <Text bold>Quantidade</Text>
                <input type="text" className="form-control form-control-sm" value={ compareValue } onChange={ event => setCompareValue(event.target.value) } />
            </Column>
        </WiredConditionBaseView>
    );
}

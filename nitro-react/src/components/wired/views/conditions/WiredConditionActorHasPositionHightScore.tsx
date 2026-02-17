import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionActorHasPositionHightScore: FC<{}> = props =>
{
    const [ operatorId, setOperatorId ] = useState<number>(-1);
    const [ compareValue, setCompareValue ] = useState<number>(0);
    const { trigger = null, setIntParams = null, setStringParam = null } = useWired();

    const save = () =>
    {
        setIntParams([ operatorId, compareValue ]);
    }

    useEffect(() =>
    {
        setOperatorId((trigger.intData.length > 0) ? trigger.intData[0] : 0);
        setCompareValue((trigger.intData.length > 0) ? trigger.intData[1] : 0);
    }, [ trigger ]);

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.condition.select_operator') }</Text>
                <select className="form-select form-select-sm" value={ operatorId } onChange={ event => setOperatorId(parseInt(event.target.value)) }>
                    <option value={ 0 }>==</option>
                    <option value={ 1 }>!=</option>
                    <option value={ 2 }>{ `<=` }</option>
                    <option value={ 3 }>{ `<` }</option>
                    <option value={ 4 }>{ `>=` }</option>
                    <option value={ 5 }>{ `>` }</option>
                    <option value={ 7 }>{ LocalizeText('wiredfurni.params.condition.in_highscore') }</option>
                    <option value={ 8 }>{ LocalizeText('wiredfurni.params.condition.not_in_highscore') }</option>
                </select>
            </Column>
            <Column gap={ 1 }>
            <Flex gap={ 3 } justifyContent="between" alignItems="center">
                    <Flex>
                    <Text bold>{ LocalizeText('wiredfurni.params.condition.team_hasrank') }</Text>
                    </Flex>
                    <Flex>
                    <input style={{ width: 36, height: 26  }} className="form-control" type="number" name="selectedRank" id="selectedRank4" value={ compareValue } onChange={ event => setCompareValue(parseInt(event.target.value)) } />
                    </Flex>
                </Flex>
                <Grid columnCount={ 4 } gap={ 2 }>
                    <Flex gap={ 1 }>
                        <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank1" checked={ (compareValue === 1) } onChange={ () => setCompareValue(1) } />
                        <Text>1 º</Text>
                    </Flex>
                    <Flex gap={ 1 }>
                        <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank2" checked={ (compareValue === 2) } onChange={ () => setCompareValue(2) } />
                        <Text>2 º</Text>
                    </Flex>
                    <Flex gap={ 1 }>
                        <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank3" checked={ (compareValue === 3) } onChange={ () => setCompareValue(3) } />
                        <Text>3 º</Text>
                    </Flex>
                    <Flex gap={ 1 }>
                        <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank4" checked={ (compareValue === 4) } onChange={ () => setCompareValue(4) } />
                        <Text>4 º</Text>
                    </Flex>
                </Grid>
            </Column>
        </WiredConditionBaseView>
    );
}

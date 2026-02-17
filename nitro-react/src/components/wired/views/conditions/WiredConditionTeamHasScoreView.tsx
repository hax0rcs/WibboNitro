import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionTeamHasScoreView: FC<{}> = props =>
{
    const [ teamFlag, setTeamFlag ] = useState<number>(0);
    const [ mathOperator, setMathOperator ] = useState<number>(1);
    const [ scores, setScores ] = useState<number>(1);
    const { trigger, setIntParams } = useWired();

    useEffect(() => {
        if (trigger) {
            setTeamFlag(trigger.intData[0]);
            setMathOperator(trigger.intData[1]);
            setScores(trigger.intData[2]);
        }
    }, [trigger]);

    const save = () => setIntParams([ teamFlag, mathOperator, scores ]);

    return <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={ true } save={ save }>
        <Column gap={ 1 }>
            <Text bold>{ LocalizeText('wiredfurni.params.condition.team_has') }</Text>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedTeam" id="selectedTeam0" checked={ (teamFlag === 0) } onChange={ () => setTeamFlag(0) } />
                <Text>{ LocalizeText('wiredfurni.params.team.0') }</Text>
            </Flex>
            <Grid columnCount={ 2 } gap={ 1 }>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedTeam" id="selectedTeam1" checked={ (teamFlag === 1) } onChange={ () => setTeamFlag(1) } />
                    <Text>{ LocalizeText('wiredfurni.params.team.1') }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedTeam" id="selectedTeam2" checked={ (teamFlag === 2) } onChange={ () => setTeamFlag(2) } />
                    <Text>{ LocalizeText('wiredfurni.params.team.2') }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedTeam" id="selectedTeam3" checked={ (teamFlag === 3) } onChange={ () => setTeamFlag(3) } />
                    <Text>{ LocalizeText('wiredfurni.params.team.3') }</Text>
                </Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="selectedTeam" id="selectedTeam4" checked={ (teamFlag === 4) } onChange={ () => setTeamFlag(4) } />
                    <Text>{ LocalizeText('wiredfurni.params.team.4') }</Text>
                </Flex>
            </Grid>
        </Column>
        <Column gap={ 2 }>
        <Text bold>{ LocalizeText('wiredfurni.params.condition.team_hasrank') }</Text>
        <Grid columnCount={ 3 } gap={ 2 }>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank1" checked={ (mathOperator === 0) } onChange={ () => setMathOperator(0) } />
                <Text small>{ `>` }</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank2" checked={ (mathOperator === 1) } onChange={ () => setMathOperator(1) } />
                <Text small>{ `<` }</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank3" checked={ (mathOperator === 2) } onChange={ () => setMathOperator(2) } />
                <Text small>{ `>=` }</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank4" checked={ (mathOperator === 3) } onChange={ () => setMathOperator(3) } />
                <Text small>{ `<=` }</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank4" checked={ (mathOperator === 4) } onChange={ () => setMathOperator(4) } />
                <Text small>{ `==` }</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank4" checked={ (mathOperator === 5) } onChange={ () => setMathOperator(5) } />
                <Text small>{ `!=` }</Text>
            </Flex>
            </Grid>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.condition.team_scores') } : { scores.toString() }</Text>
                <Slider
                    min={ 1 }
                    max={ 100 }
                    value={ scores }
                    onChange={ event => setScores(event) } />
            </Column>
        </Column>
    </WiredConditionBaseView>;
}

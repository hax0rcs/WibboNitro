import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Slider, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggeScoreAchievedView: FC<{}> = props =>
{
    const [ points, setPoints ] = useState<number>(1);
    const [ teamFlag, setTeamFlag ] = useState<number>(0);

    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ teamFlag, points ]);

    useEffect(() =>
    {
        if(trigger.intData.length > 0)
        {
            setTeamFlag(trigger.intData[0]);
            setPoints(trigger.intData[1]);
        }
    }, [ trigger ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
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
            <hr className="m-0 bg-dark" />
                <Text bold>{ LocalizeText('wiredfurni.params.setscore', [ 'points' ], [ points.toString() ]) }</Text>
                <Slider
                    min={ 1 }
                    max={ 1000 }
                    value={ points }
                    onChange={ event => setPoints(event) } />
            </Column>
        </WiredTriggerBaseView>
    );
}

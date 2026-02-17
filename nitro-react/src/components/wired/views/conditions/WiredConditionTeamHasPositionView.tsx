import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionTeamHasPositionView: FC<{}> = props =>
{
    const [ teamFlag, setTeamFlag ] = useState<number>(0);
    const [ position, setPosition ] = useState<number>(1);
    const { trigger, setIntParams } = useWired();

    useEffect(() => {
        if (trigger) {
            setTeamFlag(trigger.intData[0]);
            setPosition(trigger.intData[1]);
        }
    }, [trigger]);

    const save = () => setIntParams([ teamFlag, position ]);

    return <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
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
        <Column gap={ 1 }>
        <Text bold>{ LocalizeText('wiredfurni.params.condition.team_hasrank') }</Text>
        <Grid columnCount={ 4 } gap={ 2 }>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank1" checked={ (position === 1) } onChange={ () => setPosition(1) } />
                <Text>1 º</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank2" checked={ (position === 2) } onChange={ () => setPosition(2) } />
                <Text>2 º</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank3" checked={ (position === 3) } onChange={ () => setPosition(3) } />
                <Text>3 º</Text>
            </Flex>
            <Flex gap={ 1 }>
                <input className="form-check-input" type="radio" name="selectedRank" id="selectedRank4" checked={ (position === 4) } onChange={ () => setPosition(4) } />
                <Text>4 º</Text>
            </Flex>
            </Grid>
        </Column>
    </WiredConditionBaseView>;
}

import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Grid, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionActorMoveRotateView: FC<{}> = props =>
{
    const directionOptions: { value: number, icon: string }[] = [
        {
            value: 0,
            icon: 'ne'
        },
        {
            value: 2,
            icon: 'se'
        },
        {
            value: 4,
            icon: 'sw'
        },
        {
            value: 6,
            icon: 'nw'
        },
        {
            value: 3,
            icon: 'south'
        },
        {
            value: 1,
            icon: 'east'
        },
        {
            value: 7,
            icon: 'north'
        },
        {
            value: 5,
            icon: 'west'
        },
        {
            value: 8,
            icon: 'rot-1'
        },
        {
            value: 9,
            icon: 'rot-2'
        }
    ];

    const movOptions: { value: number, icon: string }[] = [
        {
            value: 0,
            icon: 'ne'
        },
        {
            value: 2,
            icon: 'se'
        },
        {
            value: 4,
            icon: 'sw'
        },
        {
            value: 6,
            icon: 'nw'
        },
        {
            value: 3,
            icon: 'south'
        },
        {
            value: 1,
            icon: 'east'
        },
        {
            value: 7,
            icon: 'north'
        },
        {
            value: 5,
            icon: 'west'
        },
    ];

    const [ rotation, setRotation ] = useState<number>(0);
    const [ mov, setMov ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ mov, rotation ]);

    useEffect(() => 
    {
        if(trigger && trigger.intData.length > 0) 
        {
            setMov(trigger.intData[0]);
            setRotation(trigger.intData[1]);
        }
    }, [ trigger ]);

    return <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
        <Column>
            <Column gap={ 1 } >
                <Text bold>{ LocalizeText('wiredfurni.params.actions.movrot.mov') }</Text>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="mov" checked={ (mov === 10) } onChange={ () => setMov(10) } /><Text>{ LocalizeText('wiredfurni.params.actions.movrot.movnone') }</Text>
                </Flex>
                <Grid columnCount={ 5 } gap={ 1 }>
                    { movOptions.map(option => (
                        <Flex alignItems="center" key={ option.value } gap={ 1 }>
                            <input className="form-check-input" type="radio" name="mov" id={ `movement${ option.value }` } checked={ (mov === option.value) } onChange={ () => setMov(option.value) } />
                            <i style={ { filter: 'contrast(0.1)' } } className={ `icon icon-${ option.icon }` } />
                        </Flex>
                    )) }
                </Grid>
                <div className="col" />
            </Column>
            <Column gap={ 1 }>
                <Flex><Text bold>{ LocalizeText('wiredfurni.params.action.movrot.rot') }</Text></Flex>
                <Flex gap={ 1 }>
                    <input className="form-check-input" type="radio" name="rot" checked={ (rotation === 10) } onChange={ () => setRotation(10) } /><Text>{ LocalizeText('wiredfurni.params.actions.movrot.rotnone') }</Text>
                </Flex>
                <Grid columnCount={ 5 } gap={ 1 }>
                    { directionOptions.map(option => (
                        <Flex alignItems="center" key={ option.value } gap={ 1 }>
                            <input className="form-check-input" type="radio" name="direction" id={ `movement${ option.value }` } checked={ (rotation === option.value) } onChange={ () => setRotation(option.value) } />
                            <i style={ { filter: 'contrast(0.1)' } } className={ `icon icon-${ option.icon }` } />
                        </Flex>
                    )) }
                </Grid>
            </Column>
        </Column>
    </WiredActionBaseView>
}

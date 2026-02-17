import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerActionsView: FC<{}> = props =>
{
    const [ selectedAction, setSelectedAction ] = useState(0);
    const [ filterEnabled, setFilterEnabled ] = useState(false);
    const [ filterValue, setFilterValue ] = useState(0);
    const { trigger = null, setStringParam = null } = useWired();

    const save = () =>
    {
        const stringParam = `${selectedAction};${filterEnabled};${filterValue}`;
        setStringParam(stringParam);
    }

    useEffect(() =>
    {
        if(trigger)
        {
            const [ action, filter, value ] = trigger.stringData.split(';');
            setSelectedAction(parseInt(action));
            setFilterEnabled(filter === 'true');
            setFilterValue(parseInt(value));
        }
    }, [ trigger ]);

    const renderFilterOptions = () => {
        if (selectedAction === 10) {
            return (
                <select className="form-control form-control-sm" value={ filterValue } onChange={ event => setFilterValue(parseInt(event.target.value)) } disabled={!filterEnabled}>
                    <option value={ 0 }>{ LocalizeText('wiredfurni.params.signal.1') }</option>
                    <option value={ 1 }>{ LocalizeText('wiredfurni.params.signal.1') }</option>
                    <option value={ 2 }>{ LocalizeText('wiredfurni.params.signal.2') }</option>
                    <option value={ 3 }>{ LocalizeText('wiredfurni.params.signal.3') }</option>
                    <option value={ 4 }>{ LocalizeText('wiredfurni.params.signal.4') }</option>
                    <option value={ 5 }>{ LocalizeText('wiredfurni.params.signal.5') }</option>
                    <option value={ 6 }>{ LocalizeText('wiredfurni.params.signal.6') }</option>
                    <option value={ 7 }>{ LocalizeText('wiredfurni.params.signal.7') }</option>
                    <option value={ 8 }>{ LocalizeText('wiredfurni.params.signal.8') }</option>
                    <option value={ 9 }>{ LocalizeText('wiredfurni.params.signal.9') }</option>
                    <option value={ 10 }>{ LocalizeText('wiredfurni.params.signal.10') }</option>
                    <option value={ 11 }>{ LocalizeText('wiredfurni.params.signal.11') }</option>
                    <option value={ 12 }>{ LocalizeText('wiredfurni.params.signal.12') }</option>
                    <option value={ 13 }>{ LocalizeText('wiredfurni.params.signal.13') }</option>
                    <option value={ 15 }>{ LocalizeText('wiredfurni.params.signal.14') }</option>
                    <option value={ 14 }>{ LocalizeText('wiredfurni.params.signal.15') }</option>
                    <option value={ 16 }>{ LocalizeText('wiredfurni.params.signal.16') }</option>
                    <option value={ 17 }>{ LocalizeText('wiredfurni.params.signal.17') }</option>
                    <option value={ 16 }>{ LocalizeText('wiredfurni.params.signal.16') }</option>


                </select>
            );
        } else if (selectedAction === 11) {
            return (
                <select className="form-control form-control-sm" value={ filterValue } onChange={ event => setFilterValue(parseInt(event.target.value)) } disabled={!filterEnabled}>
                    <option value={ 1 }>{ LocalizeText('wiredfurni.params.dance.1') }</option>
                    <option value={ 2 }>{ LocalizeText('wiredfurni.params.dance.2') }</option>
                    <option value={ 3 }>{ LocalizeText('wiredfurni.params.dance.3') }</option>
                    <option value={ 4 }>{ LocalizeText('wiredfurni.params.dance.4') }</option>
                </select>
            );
        } else {
            return (
                <input type="number" className="form-control form-control-sm" value={ filterValue } onChange={ event => setFilterValue(parseInt(event.target.value)) } disabled={!filterEnabled} />
            );
        }
    };

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.action') }</Text>
                <select className="form-control form-control-sm" value={ selectedAction } onChange={ event => setSelectedAction(parseInt(event.target.value)) }>
                    <option value={ 1 }>{ LocalizeText('wiredfurni.params.action.wave') }</option>
                    <option value={ 2 }>{ LocalizeText('wiredfurni.params.action.blowkiss') }</option>
                    <option value={ 3 }>{ LocalizeText('wiredfurni.params.action.laugh') }</option>
                    <option value={ 5 }>{ LocalizeText('wiredfurni.params.action.wake') }</option>
                    <option value={ 5 }>{ LocalizeText('wiredfurni.params.action.sleep') }</option>
                    <option value={ 7 }>{ LocalizeText('wiredfurni.params.action.sit') }</option>
                    <option value={ 8 }>{ LocalizeText('wiredfurni.params.action.stand') }</option>
                    <option value={ 9 }>{ LocalizeText('wiredfurni.params.action.lay') }</option>
                    <option value={ 10 }>{ LocalizeText('wiredfurni.params.action.signal') }</option>
                    <option value={ 11 }>{ LocalizeText('wiredfurni.params.action.dance') }</option>
                </select>
            </Column>
            <Column gap={ 1 }>
                <Flex alignItems="center" gap={ 1 }>
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="filterEnabled" 
                        checked={ filterEnabled } 
                        onChange={ event => setFilterEnabled(event.target.checked) } 
                        disabled={ selectedAction !== 10 && selectedAction !== 11 } />
                    <Text>{ LocalizeText('wiredfurni.params.enable_filter') }</Text>
                </Flex>
            </Column>
            { filterEnabled && 
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.filter_value') }</Text>
                { renderFilterOptions() }
            </Column>
            }
        </WiredTriggerBaseView>
    );
}

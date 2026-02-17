import { FC, useEffect, useState } from 'react';
import { GetUserCurrentDanceId, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionDanceView: FC<{}> = props =>
{
    const [ danceId, setDanceId ] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ danceId ]);

    useEffect(() =>
    {
        if(trigger.intData.length == 1)
        {
            setDanceId(trigger.intData[0] || 1);
        }
    }, [ trigger ]);

    const options = [
        { id: 1, label: LocalizeText('wiredfurni.params.dance.1') },
        { id: 2, label: LocalizeText('wiredfurni.params.dance.2') },
        { id: 3, label: LocalizeText('wiredfurni.params.dance.3') },
        { id: 4, label: LocalizeText('wiredfurni.params.dance.4') },
    ];

    const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        setDanceId(selectedId);
    };

    const handleCustomizeClick = () => {
        const danceId = GetUserCurrentDanceId();
        setDanceId(danceId);
    };

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.dance.options') }</Text>
                <Flex alignItems="center" gap={ 2 }>
                    <select
                        className="form-select form-select-sm"
                        value={ danceId }
                        onChange={ handleSelectChange }
                    >
                        { options.map(option => (
                            <option key={ option.id } value={ option.id }>
                                { option.label }
                            </option>
                        )) }
                    </select>
                </Flex>
                <>
                 <hr className="m-0 bg-dark" />
                <Text bold>{LocalizeText('wiredfurni.params.dance.options2')}</Text><Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.dance.get_my_danceid')}</Button>
                        <input type='number' className="form-control form-control-sm" value={danceId} onChange={event => setDanceId(parseInt(event.target.value))}></input>
                    </Flex>
                    <hr className="m-0 bg-dark" />
                    </>
            </Column>
        </WiredActionBaseView>
    );
}

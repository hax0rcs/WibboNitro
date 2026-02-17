import { FC, useEffect, useState } from 'react';
import { GetUserCurrentEffect, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionBotFreezeView: FC<{}> = props =>
{
    const [ botName, setBotName ] = useState<string>('');
    const [ effectId, setEffectId ] = useState<number>(0);
    const [ teleport, setTeleport ] = useState<boolean>(false);
    const { trigger = null, setIntParams = null, setStringParam = null } = useWired();

    const save = (() => 
    {
        setStringParam(botName);
        setIntParams([ effectId, teleport ? 1 : 0 ]);
    });

    useEffect(() =>
    {
        if(trigger)
        {
            setEffectId(trigger.intData[0] || 0);
            setTeleport(trigger.intData[1] == 1);
            setBotName(trigger.stringData || '');
        }
    }, [ trigger ]);

    const options = [
        { id: 0, label: LocalizeText('wiredfurni.params.effect.option1') },
        { id: 1, label: LocalizeText('wiredfurni.params.effect.option2') },
        { id: 2, label: LocalizeText('wiredfurni.params.effect.option3') },
        { id: 3, label: LocalizeText('wiredfurni.params.effect.option4') },
        { id: 4, label: LocalizeText('wiredfurni.params.effect.option5') },
        { id: 5, label: LocalizeText('wiredfurni.params.customize') }
    ];

    const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        setEffectId(selectedId);
    };

    const handleCustomizeClick = () => {
        const currentEffect = GetUserCurrentEffect();
        setEffectId(currentEffect);
    };

    useEffect(() => {
        if(effectId > 5) {
        }
    }, [effectId]);

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.freeze.options') }</Text>
                <Text bold>{ LocalizeText('wiredfurni.params.bot.name') }</Text>
                        <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ botName } onChange={ event => setBotName(event.target.value) } />
                        <hr className="m-0 bg-dark" />
                        <Text bold>{LocalizeText('wiredfurni.params.freeze.options3')}</Text>
                <Flex alignItems="center" gap={ 2 }>
                    <select
                        className="form-select form-select-sm"
                        value={ effectId > 5 ? 5 : effectId }
                        onChange={ handleSelectChange }
                    >
                        { options.map(option => (
                            <option key={ option.id } value={ option.id }>
                                { option.label }
                            </option>
                        )) }
                    </select>
                </Flex>
                {effectId >= 5 &&

                <>
                 <hr className="m-0 bg-dark" />
                <Text bold>{LocalizeText('wiredfurni.params.freeze.options')}</Text><Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.freeze.get_my_effect')}</Button>
                        <input type='number' className="form-control form-control-sm" value={effectId} onChange={event => setEffectId(parseInt(event.target.value))}></input>
                    </Flex>
                    <hr className="m-0 bg-dark" />
                    </>
                }
                <Flex alignItems="center" gap={ 2 }>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={ teleport }
                        onChange={ () => setTeleport(!teleport) }
                    />
                    <Text>{ LocalizeText('wiredfurni.params.freeze.teleportuf') }</Text>
                </Flex>
            </Column>
        </WiredActionBaseView>
    );
}

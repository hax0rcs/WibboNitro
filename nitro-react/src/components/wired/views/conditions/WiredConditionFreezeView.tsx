import { FC, useEffect, useState } from 'react';
import { GetUserCurrentEffect, LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionFreezeView: FC<{}> = props =>
{
    const [ effectId, setEffectId ] = useState<number>(0);
    const [ filter, setFilter ] = useState<boolean>(false);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ filter ? 1 : 0, effectId, ]);

    useEffect(() =>
    {
        if(trigger.intData.length > 1)
        {
            setFilter(trigger.intData[0] == 1);
            setEffectId(trigger.intData[1] || 0);
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

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
            <Flex alignItems="center" gap={ 2 }>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={ filter }
                        onChange={ () => setFilter(!filter) }
                    />
                    <Text>{ LocalizeText('wiredfurni.params.cnd.filter_byeffect') }</Text>
                </Flex>
                { filter &&
                <>
                <Text bold>{LocalizeText('wiredfurni.params.freeze.options')}</Text><Flex alignItems="center" gap={2}>
                        <select
                            className="form-select form-select-sm"
                            value={effectId > 5 ? 5 : effectId}
                            onChange={handleSelectChange}
                        >
                            {options.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </Flex>
                    </>
                }
                { filter && effectId >= 5 &&
                 <>
                 <hr className="m-0 bg-dark" /><Text bold>{LocalizeText('wiredfurni.params.freeze.options')}</Text><Flex alignItems="center" gap={2}>
                        <Button className="wired-button" onClick={handleCustomizeClick}>{LocalizeText('wiredfurni.params.freeze.get_my_effect')}</Button>
                        <input type='number' className="form-control form-control-sm" value={effectId} onChange={event => setEffectId(parseInt(event.target.value))}></input>
                    </Flex><hr className="m-0 bg-dark" />
                    </>
                }
            </Column>
        </WiredConditionBaseView>
    );
}

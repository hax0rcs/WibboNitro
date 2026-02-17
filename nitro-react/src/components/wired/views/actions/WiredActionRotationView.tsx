import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionRotationView: FC<{}> = props => {
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
        }
    ];

    const [rotation, setRotation] = useState<number>(0);
    const [headOnly, setHeadOnly] = useState<number>(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([rotation, headOnly]);

    useEffect(() => {
        if(trigger && trigger.intData.length >= 2) {
            setRotation(trigger.intData[0]);
            setHeadOnly(trigger.intData[1]);
        }
    }, [trigger]);

    return <WiredActionBaseView requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={false} save={save}>
        <Column gap={1}>
            <Text bold>{LocalizeText('wiredfurni.params.action.rotation.direction')}</Text>
            <Flex gap={2} alignItems='center' className="dir-options">
                {directionOptions.map(option => (
                    <Flex alignItems="center" key={option.value} gap={1}>
                        <input className="form-check-input" type="radio" name="direction" id={`movement${option.value}`} checked={(rotation === option.value)} onChange={() => setRotation(option.value)} />
                        <i style={{ filter: 'contrast(0.1)' }} className={`icon icon-${option.icon}`} />
                    </Flex>
                ))}
                <div className="col" />
            </Flex>
        </Column>
        <Column gap={1}>
            <Text bold>{LocalizeText('wiredfurni.params.action.rotation')}</Text>
            <Flex alignItems="center" gap={1}>
                <input className="form-check-input" type="checkbox" id="headOnly" checked={headOnly === 1} onChange={event => setHeadOnly(event.target.checked ? 1 : 0)} />
                <Text>{LocalizeText('wiredfurni.params.action.rotation.head_only')}</Text>
            </Flex>
        </Column>
    </WiredActionBaseView>;
}

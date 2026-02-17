import { ColorPicker } from 'primereact/colorpicker';
import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

const convertToHex = (color: string | any): string => {
    if (typeof color === 'string') {
        if (/^#?[0-9A-Fa-f]{6}$/.test(color)) {
            return color.startsWith('#') ? color.slice(1) : color;
        }
        return 'FFFFFF';
    }
    
    if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
        return ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase();
    }
    
    return 'FFFFFF';
}

export const WiredConditionFurniHasColourView: FC<{}> = props =>
{
    const [colour1Hex, setColour1Hex] = useState<string>('ffffff');
    const [colour2Hex, setColour2Hex] = useState<string>('ffffff');

    const [isColour1Checked, setIsColour1Checked] = useState<boolean>(false);
    const [isColour2Checked, setIsColour2Checked] = useState<boolean>(false);

    const { trigger = null, setStringParam = null } = useWired();

    const save = () => setStringParam(`${isColour1Checked === true ? 1 : 0};${isColour2Checked === true ? 1 : 0};${colour1Hex};${colour2Hex}`);

    useEffect(() => {
        if (trigger?.stringData.includes(';'))
        {
            const parts = trigger.stringData.split(';');
    
            if (parts.length === 4)
            {
                setIsColour1Checked(parts[0] === '1');
                setIsColour2Checked(parts[1] === '1');
                
                setColour1Hex(parts[2] || 'ffffff');
                setColour2Hex(parts[3] || 'ffffff');
            }
        }
    }, [trigger]);

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={save}>
            <Column gap={1}>
                <Text bold>{LocalizeText('wiredfurni.params.condition.change.colour')}</Text>
                <Flex alignItems="center" gap={2}>
                    <ColorPicker value={colour1Hex} onChange={(e) => setColour1Hex(convertToHex(e.value))} />
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isColour1Checked}
                        onChange={() => setIsColour1Checked(!isColour1Checked)}
                    />
                    <Text small>{LocalizeText('wiredfurni.params.condition.changecl.op1')}</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                    <ColorPicker value={colour2Hex} onChange={(e) => setColour2Hex(convertToHex(e.value))} />
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isColour2Checked}
                        onChange={() => setIsColour2Checked(!isColour2Checked)}
                    />
                    <Text small>{LocalizeText('wiredfurni.params.condition.changecl.op2')}</Text>
                </Flex>
                <hr className="m-0 bg-dark" />
                <Text bold>{LocalizeText('wiredfurni.params.condition.change_colours')}</Text>
                <Flex column={true}>
                    <Text>{ LocalizeText('wiredfurni.params.condition.change_col1') }</Text>
                    <input
                        type='text'
                        value={colour1Hex}
                        onChange={(e) => setColour1Hex(convertToHex(e.target.value))}
                    />
                    <Text>{ LocalizeText('wiredfurni.params.condition.change_col2') }</Text>
                    <input
                        type='text'
                        value={colour2Hex}
                        onChange={(e) => setColour2Hex(convertToHex(e.target.value))}
                    />
                </Flex>
            </Column>
        </WiredConditionBaseView>
    );
};

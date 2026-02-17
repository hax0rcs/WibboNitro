import { RoomObjectVariable } from '@nitrots/nitro-renderer';
import { GetOwnRoomObject } from '../room';

export function GetUserCurrentEffect(): number
{
    const roomObject = GetOwnRoomObject();

    if(!roomObject) return 0;
    
    const model = roomObject.model;
    const effectId = model.getValue<number>(RoomObjectVariable.FIGURE_EFFECT);

    return effectId;
}

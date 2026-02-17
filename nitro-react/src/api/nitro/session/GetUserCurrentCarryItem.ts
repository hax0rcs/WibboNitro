import { RoomObjectVariable } from '@nitrots/nitro-renderer';
import { GetOwnRoomObject } from '../room';

export function GetUserCurrentCarryItem(): number
{
    const roomObject = GetOwnRoomObject();

    if(!roomObject) return 0;
    
    const model = roomObject.model;
    const handItemId = model.getValue<number>(RoomObjectVariable.FIGURE_CARRY_OBJECT);

    return handItemId;
}

import { RoomObjectVariable } from '@nitrots/nitro-renderer';
import { GetOwnRoomObject } from '../room';

export function GetUserCurrentDanceId(): number
{
    const roomObject = GetOwnRoomObject();

    if(!roomObject) return 0;
    
    const model = roomObject.model;
    const danceId = model.getValue<number>(RoomObjectVariable.FIGURE_DANCE);

    return danceId;
}

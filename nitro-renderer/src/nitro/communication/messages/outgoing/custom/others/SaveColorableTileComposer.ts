import { IMessageComposer } from '../../../../../../api';

export class SaveColorableTileComposer implements IMessageComposer<ConstructorParameters<typeof SaveColorableTileComposer>>
{
    private _data: ConstructorParameters<typeof SaveColorableTileComposer>;

    constructor(itemId: number, colour1: string, colour2: string)
    {
        this._data = [ itemId, colour1, colour2 ];
    }

    public dispose(): void
    {
        return;
    }

    public getMessageArray()
    {
        return this._data;
    }
}

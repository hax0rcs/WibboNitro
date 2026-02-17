import { IMessageComposer } from '../../../../../api';

export class GiveStarComposer implements IMessageComposer<ConstructorParameters<typeof GiveStarComposer>>
{
    private _data: ConstructorParameters<typeof GiveStarComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}

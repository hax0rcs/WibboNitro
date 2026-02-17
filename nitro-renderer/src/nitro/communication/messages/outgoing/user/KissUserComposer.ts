import { IMessageComposer } from '../../../../../api';

export class KissUserComposer implements IMessageComposer<ConstructorParameters<typeof KissUserComposer>>
{
    private _data: ConstructorParameters<typeof KissUserComposer>;

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

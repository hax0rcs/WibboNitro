import { IMessageDataWrapper } from '../../../../../api';

export class ChatCommandsData
{
    private _name: string;
    private _description: string;
    private _minRank: number;
    private _vip: boolean;
    private _special: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        this._minRank = wrapper.readInt();
        this._vip = wrapper.readBoolean();
        this._special = wrapper.readBoolean();
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get minRank(): number
    {
        return this._minRank;
    }

    public get isVip(): boolean
    {
        return this._vip;
    }

    public get isSpecial(): boolean
    {
        return this._special;
    }
}

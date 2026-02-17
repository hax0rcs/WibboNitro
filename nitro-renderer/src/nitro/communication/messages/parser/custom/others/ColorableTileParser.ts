import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class ColorableTileParser implements IMessageParser
{
    itemId: number;

    public flush(): boolean
    {
        this.itemId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.itemId = wrapper.readInt();

        return true;
    }
}

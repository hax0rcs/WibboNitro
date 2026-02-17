import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { ChatCommandsData } from '../../parser';

export class ChatCommandsListEventParser implements IMessageParser
{
    private _commands: ChatCommandsData[];

    public flush(): boolean
    {
        this._commands = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._commands.push(new ChatCommandsData(wrapper));

            count--;
        }

        return true;
    }

    public get commands(): ChatCommandsData[]
    {
        return this._commands;
    }
}

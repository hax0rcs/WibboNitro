import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ChatCommandsListEventParser } from '../../parser';

export class ChatCommandsListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatCommandsListEventParser);
    }

    public getParser(): ChatCommandsListEventParser
    {
        return this.parser as ChatCommandsListEventParser;
    }
}

import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { YouTubeParser } from '../../../parser';

export class YouTubeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YouTubeParser);
    }

    getParser(): YouTubeParser
    {
        return this.parser as YouTubeParser;
    }
}

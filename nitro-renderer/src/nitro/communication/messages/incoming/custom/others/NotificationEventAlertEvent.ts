import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { NotificationEventAlertParser } from '../../../parser';

export class NotificationEventAlertEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NotificationEventAlertParser);
    }

    getParser(): NotificationEventAlertParser
    {
        return this.parser as NotificationEventAlertParser;
    }
}

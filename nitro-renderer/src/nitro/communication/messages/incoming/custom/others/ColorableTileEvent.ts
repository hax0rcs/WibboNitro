import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ColorableTileParser } from '../../../parser';

export class ColorableTileEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ColorableTileParser);
    }

    getParser(): ColorableTileParser
    {
        return this.parser as ColorableTileParser;
    }
}

import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class YouTubeParser implements IMessageParser
{
    videoId: string;

    public flush(): boolean
    {
        this.videoId = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.videoId = wrapper.readString();

        return true;
    }
}

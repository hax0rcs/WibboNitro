import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class EventoAlertParser implements IMessageParser
{
    image: string;
    title: string;
    authorName: string;
    figure: string;
    msgTxt: string;
    btnTxt: string;
    roomId: number;

    public flush(): boolean
    {
        this.image = '';
        this.title = '';
        this.authorName = '';
        this.figure = '';
        this.msgTxt = '';
        this.btnTxt = '';
        this.roomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.image = wrapper.readString();
        this.title = wrapper.readString();
        this.authorName = wrapper.readString();
        this.figure = wrapper.readString();
        this.msgTxt = wrapper.readString();
        this.btnTxt = wrapper.readString();
        this.roomId = wrapper.readInt();

        return true;
    }
}

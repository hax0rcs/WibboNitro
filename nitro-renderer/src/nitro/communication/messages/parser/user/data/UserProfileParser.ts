import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { HabboGroupEntryData } from '../HabboGroupEntryData';

export class UserProfileParser implements IMessageParser
{
    private _id: number;
    private _username: string;
    private _figure: string;
    private _motto: string;
    private _registration: string;
    private _achievementPoints: number;
    private _receivedDuckets: number;
    private _level: number;
    private _rank: number
    private _eventWins: number;
    private _respects: number;
    private _friendsCount: number;
    private _isMyFriend: boolean;
    private _requestSent: boolean;
    private _isOnline: boolean;
    private _groups: HabboGroupEntryData[];
    private _secondsSinceLastVisit: number;
    private _openProfileWindow: boolean;

    public flush(): boolean
    {
        this._id = 0;
        this._username = null;
        this._figure = null;
        this._motto = null;
        this._registration = null;
        this._achievementPoints = 0;
        this._receivedDuckets = 0;
        this._level = 0;
        this._rank = 0;
        this._eventWins = 0;
        this._respects = 0;
        this._friendsCount = 0;
        this._isMyFriend = false;
        this._requestSent = false;
        this._isOnline = false;
        this._groups = [];
        this._secondsSinceLastVisit = 0;
        this._openProfileWindow = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._motto = wrapper.readString();
        this._registration = wrapper.readString();
        this._achievementPoints = wrapper.readInt();
        this._receivedDuckets= wrapper.readInt();
        this._level = wrapper.readInt();
        this._rank = wrapper.readInt();
        this._eventWins = wrapper.readInt();
        this._respects = wrapper.readInt();
        this._friendsCount = wrapper.readInt();
        this._isMyFriend = wrapper.readBoolean();
        this._requestSent = wrapper.readBoolean();
        this._isOnline = wrapper.readBoolean();
        const groupsCount = wrapper.readInt();

        for(let i = 0; i < groupsCount; i++)
        {
            this._groups.push(new HabboGroupEntryData(wrapper));
        }

        this._secondsSinceLastVisit = wrapper.readInt();
        this._openProfileWindow = wrapper.readBoolean();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get registration(): string
    {
        return this._registration;
    }

    public get achievementPoints(): number
    {
        return this._achievementPoints;
    }

    public get receivedDucket(): number
    {
        return this._receivedDuckets;
    }

    public get level(): number
    {
        return this._level;
    }

    public get rank(): number
    {
        return this._rank;
    }

    public get eventWins(): number
    {
        return this._eventWins;
    }

    public get respects(): number
    {
        return this._respects;
    }

    public get friendsCount(): number
    {
        return this._friendsCount;
    }

    public get isMyFriend(): boolean
    {
        return this._isMyFriend;
    }

    public get requestSent(): boolean
    {
        return this._requestSent;
    }

    public get isOnline(): boolean
    {
        return this._isOnline;
    }

    public get groups(): HabboGroupEntryData[]
    {
        return this._groups;
    }

    public get secondsSinceLastVisit(): number
    {
        return this._secondsSinceLastVisit;
    }

    public get openProfileWindow(): boolean
    {
        return this._openProfileWindow;
    }
}

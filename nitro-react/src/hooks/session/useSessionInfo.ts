import { ChatCommandsData, ChatCommandsListEvent, ColorConverter, FigureUpdateEvent, RoomUnitChatStyleComposer, UserInfoDataParser, UserInfoEvent } from '@nitrots/nitro-renderer';
import { ColorPickerHSBType, ColorPickerRGBType } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { GetLocalStorage, GetSessionDataManager, SendMessageComposer } from '../../api';
import { useMessageEvent } from '../events';
import { useLocalStorage } from '../useLocalStorage';

const useSessionInfoState = () =>
{
    const [ userInfo, setUserInfo ] = useState<UserInfoDataParser>(null);
    const [ userFigure, setUserFigure ] = useState<string>(null);
    const [ chatStyleId, setChatStyleId ] = useLocalStorage<number>('chatStyleId', 0);
    const [ chatColour, setChatColour ] = useLocalStorage<string>('chatColour', '');
    const [ userRespectRemaining, setUserRespectRemaining ] = useState<number>(0);
    const [ userKissesRemaining, setUserKissesRemaining ] = useState<number>(0);
    const [ petRespectRemaining, setPetRespectRemaining ] = useState<number>(0);
    const [ screenSize, setScreenSize ] = useLocalStorage('nitroScreensize', { width: window.innerWidth, height: window.innerHeight });

    const [ chatCommands, setChatCommands ] = useState<ChatCommandsData[]>([]);

    useMessageEvent<ChatCommandsListEvent>(ChatCommandsListEvent, event =>
        {
            const parser = event.getParser();
            const newCommands = parser.commands;
        
            setChatCommands(currentCommands => {
                const updatedCommands = [...currentCommands];
        
                newCommands.forEach(newCommand => {
                    const commandExists = updatedCommands.some(command => command.name === newCommand.name);
        
                    if (!commandExists) {
                        updatedCommands.push(newCommand);
                    }
                });
        
                return updatedCommands;
            });
        });

    const updateChatStyleId = (styleId: number) =>
    {
        setChatStyleId(styleId);

        SendMessageComposer(new RoomUnitChatStyleComposer(styleId));
    }

    const updateChatColour = (value: string | ColorPickerRGBType | ColorPickerHSBType) => {    
        let rgbString = "";
    
        if (typeof value === "string") {
            rgbString = value;
        } else if ("r" in value && "g" in value && "b" in value) {
            const { r, g, b } = value as ColorPickerRGBType;
            rgbString = `${r},${g},${b}`;
        } else {
            return;
        }
        
        try {
            const hexColor = ColorConverter.rgb2Hex(`rgb(${rgbString})`);
            setChatColour(hexColor);
        } catch (error) {
            //
        }
    };

    const respectUser = (userId: number) =>
    {
        GetSessionDataManager().giveRespect(userId);

        setUserRespectRemaining(GetSessionDataManager().respectsLeft);
    }

    const giveStar = (userId: number) =>
    {
        GetSessionDataManager().giveStar(userId);
    }

    const kissUser = (userId: number) =>
    {
        GetSessionDataManager().giveKiss(userId);
            
        setUserKissesRemaining(GetSessionDataManager().kissesLeft);
    }

    const respectPet = (petId: number) =>
    {
        GetSessionDataManager().givePetRespect(petId);

        setPetRespectRemaining(GetSessionDataManager().respectsPetLeft);
    }

    useMessageEvent<UserInfoEvent>(UserInfoEvent, event =>
    {
        const parser = event.getParser();

        setUserInfo(parser.userInfo);
        setUserFigure(parser.userInfo.figure);
        setUserRespectRemaining(parser.userInfo.respectsRemaining);
        setUserKissesRemaining(parser.userInfo.kissesRemaining);
        setPetRespectRemaining(parser.userInfo.respectsPetRemaining);
    });
    
    useMessageEvent<FigureUpdateEvent>(FigureUpdateEvent, event =>
    {
        const parser = event.getParser();

        setUserFigure(parser.figure);
    });

    // useMessageEvent<UserSettingsEvent>(UserSettingsEvent, event =>
    // {
    //     const parser = event.getParser();

    //     setChatStyleId(parser.chatType);
    // });

    useEffect(() =>
    {
        const currentScreenSize = <{ width: number, height: number }>GetLocalStorage('nitroScreensize');

        if(currentScreenSize && ((currentScreenSize.width !== window.innerWidth) || (currentScreenSize.height !== window.innerHeight)))
        {
            let i = window.localStorage.length;

            while(i > 0)
            {
                const key = window.localStorage.key(i);
    
                if(key && key.startsWith('nitro.window')) window.localStorage.removeItem(key);
    
                i--;
            }
        }

        const onResize = (event: UIEvent) => setScreenSize({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener('resize', onResize);

        return () =>
        {
            window.removeEventListener('resize', onResize);
        }
    }, [ setScreenSize ]);

    return { userInfo, userFigure, chatStyleId, userRespectRemaining, userKissesRemaining, petRespectRemaining, respectUser, kissUser, giveStar, respectPet, updateChatStyleId, chatCommands, updateChatColour, chatColour };
}

export const useSessionInfo = () => useBetween(useSessionInfoState);

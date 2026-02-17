import { FollowFriendMessageComposer, FriendlyTime, IMention, MentionEvent } from '@nitrots/nitro-renderer';
import { FC, useEffect, useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaExternalLinkSquareAlt, FaTimes } from 'react-icons/fa';
import { PlaySound, SendMessageComposer } from '../../api';
import { DraggableWindow, DraggableWindowPosition, Flex, LayoutAvatarImageView } from '../../common';
import { useLocalStorage, useMessageEvent } from '../../hooks';

export const MentionBubbleView: FC<{}> = props =>
{
    const [mentionList, setMentionList] = useLocalStorage<IMention[]>('mentionList', []);
    const [lastSoundTime, setLastSoundTime] = useState<number>(0);
    const [timeNow, setTimeNow] = useState<number>(0);
    const [currentIndexes, setCurrentIndexes] = useState<Record<number, number>>({});

    // Agrupa as menções por userId
    const groupedMentions = useMemo(() => {
        return mentionList.reduce((acc, mention) => {
            if (!acc[mention.userId]) acc[mention.userId] = [];
            acc[mention.userId].push(mention);
            return acc;
        }, {} as Record<number, IMention[]>);
    }, [mentionList]);

    const playSoundIfNeeded = () => {
        if (lastSoundTime <= timeNow) {
            setLastSoundTime(timeNow + 5);
            PlaySound('mention_beep');
        }
    };

    useEffect(() =>
    {
        const interval = window.setInterval(() => setTimeNow(Date.now() / 1000), 1000);
        return () => clearInterval(interval);
    }, []);

    useMessageEvent<MentionEvent>(MentionEvent, event =>
    {
        const parser = event.getParser();

        setMentionList((prevValue) => {
            const updatedList = [...prevValue, parser.mention];
            playSoundIfNeeded();
            return updatedList;
        });
    });

    const close = (userId: number) => {
        setMentionList((prevValue) => prevValue.filter(m => m.userId !== userId));
        setCurrentIndexes((prev) => {
            const newIndexes = { ...prev };
            delete newIndexes[userId];
            return newIndexes;
        });
    };

    const followUser = (userId: number) => {
        SendMessageComposer(new FollowFriendMessageComposer(userId));
        close(userId);
    };

    const navigateMentions = (userId: number, direction: 'next' | 'previous') => {
        setCurrentIndexes((prev) => {
            const currentIndex = prev[userId] || 0;
            const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
            const maxIndex = (groupedMentions[userId]?.length || 1) - 1;
            return {
                ...prev,
                [userId]: Math.max(0, Math.min(newIndex, maxIndex)),
            };
        });
    };

    return (
        <>
            {Object.entries(groupedMentions).map(([userId, mentions], index) => {
                const currentMentionIndex = currentIndexes[userId] || 0;
                const currentMention = mentions[currentMentionIndex];

                return (
                    <DraggableWindow 
                        key={userId} 
                        offsetTop={100 + (index * 200)}
                        windowPosition={DraggableWindowPosition.TOP_LEFT} 
                        uniqueKey={`mention-card-${userId}`}>
                        <div className="mention-card">
                            <div className="mention-card__header">
                                <LayoutAvatarImageView className="mention-card__avatar" figure={currentMention.look} direction={2} headOnly={true} draggable="false" />
                                <div className="mention-card__info">
                                    <Flex>
                                        <span className="mention-card__username">{currentMention.username}</span>
                                        <FaExternalLinkSquareAlt className="mention-card__follow-icon" onClick={() => followUser(Number(userId))} />
                                    </Flex>
                                    <span className="mention-card__time">
                                        {FriendlyTime.format((Date.now() / 1000) - currentMention.time, '.ago', 1)}
                                    </span>
                                </div>
                                <FaTimes className="mention-card__close-icon" onClick={() => close(Number(userId))} />
                            </div>
                            <div className="mention-card__content">
                                <p className="mention-card__message">{currentMention.msg}</p>
                            </div>
                            {mentions.length > 1 && (
                                <div className="mention-card__navigation">
                                    <FaArrowLeft 
                                        className="mention-card__nav-icon" 
                                        onClick={() => navigateMentions(Number(userId), 'previous')} 
                                        style={{ visibility: currentMentionIndex === 0 ? 'hidden' : 'visible' }}
                                    />
                                    <FaArrowRight 
                                        className="mention-card__nav-icon" 
                                        onClick={() => navigateMentions(Number(userId), 'next')} 
                                        style={{ visibility: currentMentionIndex === mentions.length - 1 ? 'hidden' : 'visible' }}
                                    />
                                </div>
                            )}
                        </div>
                    </DraggableWindow>
                );
            })}
        </>
    );
}

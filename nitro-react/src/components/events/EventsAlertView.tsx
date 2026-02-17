import { NotificationEventAlertEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { GetConfiguration } from '../../api';
import { Button, Text } from '../../common';
import { useMessageEvent } from '../../hooks';
import './EventsAlertView.scss'; // Importa o SCSS para o design

interface IAlert {
    image: string;
    title: string;
    author: string;
    authorFigure: string;
    msgTxt: string;
    btnTxt: string;
    roomId: number;
}

export const EventsAlertView: FC<{}> = () => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useMessageEvent<NotificationEventAlertEvent>(NotificationEventAlertEvent, event => {
        const parser = event.getParser();

        const newAlert: IAlert = {
            image: parser.image,
            title: parser.title,
            author: parser.authorName,
            authorFigure: parser.figure,
            msgTxt: parser.msgTxt,
            btnTxt: parser.btnTxt,
            roomId: parser.roomId,
        };

        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
        setCurrentIndex(alerts.length);
        setIsVisible(true);
    });

    const close = useCallback(() => {
        setIsVisible(false);
    }, []);

    const navigateAlerts = useCallback((direction: 'next' | 'previous') => {
        setCurrentIndex(prevIndex => {
            const newIndex = direction === 'next'
                ? Math.min(prevIndex + 1, alerts.length - 1)
                : Math.max(prevIndex - 1, 0);
            return newIndex;
        });
    }, [alerts.length]);

    useEffect(() => {
        if (!isVisible || alerts.length === 0) return;

    }, [isVisible, alerts.length]);

    const currentAlert = alerts[currentIndex];
    const imageUrl = useMemo(() => GetConfiguration<string>('image.library.notifications.url', '').replace('%image%', currentAlert?.image.replace(/\./g, '_')), [currentAlert]);

    if (!isVisible || !currentAlert) return null;

    return (
        <div className={`notification-alert ${isVisible ? 'slide-in' : 'slide-out'}`}>
            <div className="alert-header d-flex justify-content-between align-items-center">
                <FaTimes className="close-button" onClick={close} />
                <h3 className="alert-title">{currentAlert.title}</h3>
            </div>
            {imageUrl && <img src={imageUrl} className="alert-image" alt="Notification" />}
            <div className="alert-body">
                <Text className="alert-message" dangerouslySetInnerHTML={{ __html: currentAlert.msgTxt }} />
                <Button className="alert-button">
                    {currentAlert.btnTxt}
                </Button>
            </div>
            <div className="alert-footer d-flex align-items-center">
                <img src={currentAlert.authorFigure} className="author-avatar" alt="Author" />
                <span className="author-name">{currentAlert.author}</span>
            </div>
            <div className="alert-navigation d-flex justify-content-between">
                {alerts.length > 1 && (
                    <>
                        <FaArrowLeft
                            className="nav-icon"
                            onClick={() => navigateAlerts('previous')}
                            style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
                        />
                        <FaArrowRight
                            className="nav-icon"
                            onClick={() => navigateAlerts('next')}
                            style={{ visibility: currentIndex === alerts.length - 1 ? 'hidden' : 'visible' }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

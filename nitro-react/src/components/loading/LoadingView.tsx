import { FC } from 'react';
import { Base, Column, Text } from '../../common';

interface LoadingViewProps
{
    isError: boolean;
    message: string;
    percent: number;
}

export const LoadingView: FC<LoadingViewProps> = props =>
    {
        const { isError = false, message = '', percent = 0 } = props;
    
        return (
            <Column fullHeight position="relative" className="nitro-loading">
                <Base fullHeight className="container h-100">
                    <Column fullHeight alignItems="center" justifyContent="center">
                        <Column size={ 6 } className="text-center py-4">
                            { isError && (message && message.length) ?
                                <Base className="fs-4 text-shadow">{ message }</Base>
                                :
                                <>
                                    <div className="spinner"></div> {}
                                    <Text fontSize={ 4 } variant="white" className="text-shadow mt-2 font-loading">{ percent.toFixed() }%</Text>
                                </>
                            }
                        </Column>
                    </Column>
                </Base>
            </Column>
        );
    }

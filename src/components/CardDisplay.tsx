import { getScryfallImage } from '@/util/api';
import { Card } from '@/util/types';
import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';

interface ICardDisplayProps {
    card: Card;
    fontSize?: number;
}
export const CardDisplay = (props: ICardDisplayProps) => {
    const { card, fontSize } = props;

    return (
        <Tooltip
            title={
                <div style={{ width: 250 }}>
                    <img
                        alt=''
                        width='100%'
                        src={
                            card?.set && card?.number
                                ? getScryfallImage(card.set, card.number)
                                : ''
                        }
                    />
                </div>
            }
        >
            <Typography
                style={{
                    fontSize: fontSize,
                    padding: '0px 5px',
                }}
            >
                {card.name}
            </Typography>
        </Tooltip>
    );
};

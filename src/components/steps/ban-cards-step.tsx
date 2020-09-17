import { Card } from '@/util/types';
import {
    Button,
    Grid,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useCubeContext } from '../CubeContext';
import DeleteIcon from '@material-ui/icons/Delete';

export const BanCardsStep = () => {
    const {
        selectedSets,
        setCardsToBan,
        cardsToBan,
        cardsToInclude,
    } = useCubeContext();

    let options: Card[] = [];

    selectedSets?.forEach((set) => {
        options = [...options, ...set?.cards];
    });

    options = options.filter(
        (option) => !cardsToInclude.find((card) => card.name === option.name)
    );

    options = options.reduce(
        (cards, card) =>
            cards.find((x) => x.name === card.name)
                ? [...cards]
                : [...cards, card],
        []
    );
    const [selectedCard, setSelectedCard] = React.useState<Card>(options[0]);

    return (
        <div>
            <Autocomplete
                id='ban-cards-combo'
                value={selectedCard || options[0]}
                onChange={(event, newValue: Card) => {
                    if (newValue?.uuid !== '') {
                        setSelectedCard(newValue);
                    }
                }}
                options={options}
                getOptionLabel={(card: Card) => card.name}
                renderInput={(params) => (
                    <TextField {...params} label='Card' variant='outlined' />
                )}
            />
            <Button
                style={{ marginTop: 20 }}
                color='primary'
                variant='outlined'
                onClick={() => {
                    if (
                        !cardsToBan.find(
                            (cardToBan) => cardToBan === selectedCard
                        )
                    )
                        setCardsToBan((prev) => [...prev, selectedCard]);
                }}
            >
                Add Card
            </Button>

            {cardsToBan?.map((card, index) => {
                return (
                    <Grid item key={`${card.name}${index}`}>
                        <ListItem>
                            <ListItemText primary={card.name} />
                            <Button
                                style={{ maxWidth: '20px' }}
                                onClick={() => {
                                    setCardsToBan(
                                        cardsToBan.filter(
                                            (c) => c.uuid !== card.uuid
                                        )
                                    );
                                }}
                            >
                                <DeleteIcon color='secondary' />
                            </Button>
                        </ListItem>
                    </Grid>
                );
            })}
        </div>
    );
};

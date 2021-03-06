import { Card } from '@/util/types';
import {
    Button,
    Grid,
    ListItem,

    TextField,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { CardDisplay } from '../CardDisplay';
import { useCubeContext } from '../CubeContext';

export const IncludeCardsStep = () => {
    const {
        selectedSets,
        setCardsToInclude,
        cardsToInclude,
        cardsToBan,
    } = useCubeContext();

    let options: Card[] = [];

    selectedSets?.forEach((set) => {
        options = [...options, ...set?.cards];
    });

    options = options.filter(
        (option) => !cardsToBan.find((card) => card.name === option.name)
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
            <Typography style={{ fontSize: '1.5rem', marginBottom: 10 }}>
                Include Cards
            </Typography>
            <Autocomplete
                id='include-cards-combo'
                value={selectedCard || options[0]}
                onChange={(event, newValue: Card) => {
                    if (newValue?.uuid !== '') setSelectedCard(newValue);
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
                    setCardsToInclude((prev) => [...prev, selectedCard]);
                }}
            >
                Add Card
            </Button>

            {cardsToInclude?.map((card, index) => {
                return (
                    <Grid item key={`${card.name}${index}`}>
                        <ListItem>
                            <CardDisplay card={card} />
                            <Button
                                style={{ maxWidth: '20px' }}
                                onClick={() => {
                                    setCardsToInclude(
                                        cardsToInclude.filter(
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

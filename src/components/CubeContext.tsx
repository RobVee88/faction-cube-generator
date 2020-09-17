import { useContext, createContext, useState } from 'react';
import React from 'react';
import { SetDescription, RarityDistribution, Filter, Card } from '@/util/types';

export interface ICubeContext {
    setList: SetDescription[] | undefined;
    setSetList: (setList) => void;
    selectedSets: SetDescription[] | undefined;
    setSelectedSets: (setList) => void;
    cubeSize: number;
    setCubeSize: (size: number) => void;
    cubeFilters: Filter[];
    setCubeFilters: (filters) => void;
    cardsToInclude: Card[];
    setCardsToInclude: (cards: Card[]) => void;
    cardsToBan: Card[];
    setCardsToBan: (cards: Card[]) => void;
    cube: Card[];
    setCube: (cards: Card[]) => void;
    selectedSet: SetDescription | undefined;
    setSelectedSet: (selectedSet: SetDescription) => void;
    rarityDistribution: RarityDistribution;
    setRarityDistribution: (rarityDistribution: RarityDistribution) => void;
}

const CubeContext = createContext<ICubeContext | undefined>(undefined);

export function useCubeContext() {
    const context = useContext(CubeContext);
    if (!context) {
        throw new Error('Cube Context is not available.');
    }

    return context;
}

export const CubeContextProvider = ({ children }) => {
    const [setList, setSetList] = React.useState<SetDescription[] | undefined>(
        undefined
    );
    const [selectedSets, setSelectedSets] = React.useState<SetDescription[]>(
        []
    );
    const [cubeSize, setCubeSize] = React.useState<number>(360);
    const [cube, setCube] = React.useState<Card[]>([]);
    const [cubeFilters, setCubeFilters] = React.useState<Filter[]>([]);
    const [cardsToInclude, setCardsToInclude] = React.useState<Card[]>([]);
    const [cardsToBan, setCardsToBan] = React.useState<Card[]>([]);
    const [selectedSet, setSelectedSet] = React.useState<
        SetDescription | undefined
    >(undefined);
    const [rarityDistribution, setRarityDistribution] = React.useState<
        RarityDistribution
    >({ rare: 1, uncommon: 4, common: 10 });

    return (
        <CubeContext.Provider
            value={{
                setList,
                setSetList,
                selectedSets,
                setSelectedSets,
                cubeSize,
                setCubeSize,
                cube,
                setCube,
                cubeFilters,
                setCubeFilters,
                cardsToInclude,
                setCardsToInclude,
                cardsToBan,
                setCardsToBan,
                selectedSet,
                setSelectedSet,
                rarityDistribution,
                setRarityDistribution,
            }}
        >
            {children}
        </CubeContext.Provider>
    );
};

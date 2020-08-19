export enum Rarity {
    mythic = 'mythic',
    rare = 'rare',
    uncommon = 'uncommon',
    common = 'common',
}

export interface RarityDistribution {
    rare: number;
    uncommon: number;
    common: number;
}

export interface SetDescription {
    code: string;
    name: string;
    cards?: Card[];
}

export interface Card {
    artist: string;
    availability: string[];
    borderColor: string;
    colorIdentity: string[];
    colors: string[];
    convertedManaCost: number;
    edhrecRank: number;
    foreignData: ForeignDatum[];
    frameVersion: string;
    hasFoil: boolean;
    hasNonFoil: boolean;
    identifiers: Identifiers;
    isReprint: boolean;
    layout: string;
    legalities: Legalities;
    manaCost: string;
    name: string;
    number: string;
    originalText: string;
    originalType: string;
    printings: string[];
    purchaseUrls: PurchaseUrls;
    rarity: string;
    rulings: Ruling[];
    subtypes: any[];
    supertypes: any[];
    text: string;
    type: string;
    types: string[];
    uuid: string;
}

interface Ruling {
    date: string;
    text: string;
}

interface PurchaseUrls {
    cardKingdom: string;
    cardKingdomFoil: string;
    cardmarket: string;
    tcgplayer: string;
}

interface Legalities {
    commander: string;
    duel: string;
    legacy: string;
    modern: string;
    vintage: string;
}

interface Identifiers {
    cardKingdomFoilId: string;
    cardKingdomId: string;
    mcmId: string;
    mcmMetaId: string;
    mtgjsonV4Id: string;
    mtgoFoilId: string;
    mtgoId: string;
    multiverseId: string;
    scryfallId: string;
    scryfallIllustrationId: string;
    scryfallOracleId: string;
    tcgplayerProductId: string;
}

interface ForeignDatum {
    language: string;
    multiverseId: number;
    name: string;
    text: string;
    type: string;
}

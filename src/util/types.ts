export enum Rarity {
    mythic = 'mythic',
    rare = 'rare',
    uncommon = 'uncommon',
    common = 'common',
}

export enum FilterTypes {
    cardTypeFilter = 'Card type filters',
    cmcFilter = 'CMC filters',
    colorFilter = 'Color filters',
}

export interface Filter {
    id: string | number;
    desc: string;
    filterType: FilterTypes;
}

export const Filters: Filter[] = [
    {
        id: 'Land',
        desc: 'Exclude lands',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Creature',
        desc: 'Exclude creatures',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Instant',
        desc: 'Exclude instants',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Sorcery',
        desc: 'Exclude sorceries',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Artifact',
        desc: 'Exclude Artifacts',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Enchantment',
        desc: 'Exclude Enchantments',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 'Planeswalker',
        desc: 'Exclude planeswalkers (recommended)',
        filterType: FilterTypes.cardTypeFilter,
    },
    {
        id: 0,
        desc: 'Exclude cmc 0',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 1,
        desc: 'Exclude cmc 1',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 2,
        desc: 'Exclude cmc 2',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 3,
        desc: 'Exclude cmc 3',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 4,
        desc: 'Exclude cmc 4',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 5,
        desc: 'Exclude cmc 5',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 6,
        desc: 'Exclude cmc 6',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 7,
        desc: 'Exclude cmc 7',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 8,
        desc: 'Exclude cmc 8+',
        filterType: FilterTypes.cmcFilter,
    },
    {
        id: 'W',
        desc: 'Exclude white cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'U',
        desc: 'Exclude blue cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'B',
        desc: 'Exclude black cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'R',
        desc: 'Exclude red cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'G',
        desc: 'Exclude green cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'C',
        desc: 'Exclude colorless cards',
        filterType: FilterTypes.colorFilter,
    },
    {
        id: 'M',
        desc: 'Exclude multicolor cards',
        filterType: FilterTypes.colorFilter,
    },
];

export enum CardType {
    Creature = 'Creatures',
    Sorcery = 'Sorceries',
    Instant = 'Instants',
    Enchantment = 'Enchantments',
    Artifact = 'Artifacts',
    Planeswalker = 'Planeswalkers',
    Land = 'Lands',
}

export const COLOR_COMBO_NAMES = {
    BG: 'Golgari',
    RU: 'Izzet',
    RW: 'Boros',
    GU: 'Simic',
    BW: 'Orzhov',
    GW: 'Selesnya',
    GR: 'Gruul',
    UW: 'Azorius',
    BU: 'Dimir',
    BR: 'Rakdos',
    GRW: 'Naya',
    BGR: 'Jund',
    GUW: 'Bant',
    BRU: 'Grixis',
    BUW: 'Esper',
    BGU: 'Sultai',
    GRU: 'Temur',
    BGW: 'Abzan',
    BRW: 'Mardu',
    RUW: 'Jeskai',
    UBRG: 'UBRG',
    BRGW: 'BRGW',
    RGWU: 'RGWU',
    GWUB: 'GWUB',
    WUBR: 'WUBR',
    WUBRG: 'WUBRG',
};

export interface CubeStep {
    id: number;
    label: string;
    component: React.ReactNode;
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
    set: string;
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

// declare module 'pinyin-tone/v2';
declare module 'hanzi';

type Definition = {
	traditional: string; // The hanzi of the character.
	simplified: string; // The simplified hanzi of the character.
	pinyin: string; // The pinyin of the character.
	definition: string; // The english translation of the character.
};

type Deceomposition = {
	character: string; // The hanzi of the character.
	components1: string[];
	components2: string[];
	components3: string[];
};

type DictEntry = {
	definitions: Definition[];
	decomposition: Deceomposition;
    radical_definition?: string;
};

type Hanzi = {
	hanzi: string;
	// Punctuaiton marks don't have pinyin or english translations.
	pinyin?: string;
	dict_entry?: DictEntry;
};

type Word = {
	// hanzi: string; // One or more.
	hanzi: Hanzi[];
	// pinyin?: string;     // The pinyin of the word, as intended in the text.
	english?: string; // The english translation of the word, as intended in the text.
};

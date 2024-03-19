export enum Language {
    en = 1,
    fi,
}

export const getLanguageId = (language: string): Language => {
    return Language[language as keyof typeof Language] || Language.en;
}
export interface Recipe {
    id: number;
    title: string;
    instructions?: string;
    calories?: number;
    protein?: number;
    difficulty?: string;
    cook_time?: number;
    ingredients?: string[];
    score?: number;
    matchCount?: number;
}

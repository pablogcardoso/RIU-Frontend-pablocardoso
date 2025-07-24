import { HEROES_DEFAULT } from "../domain/constants/heroes-default";
import { IHero } from "../domain/entities/hero";

export interface AppState {
    heroes?: IHero[];
    filters?: {
        name: string;
        id: string;
    };
}

export const initialState: AppState = {
    heroes: HEROES_DEFAULT,
    filters: {
        name: '',
        id: ''
    }
};
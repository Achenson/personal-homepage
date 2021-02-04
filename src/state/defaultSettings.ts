import { newRidgeState } from "react-ridge-state";

import {GlobalSettingsState} from "../utils/interfaces"



export const rssSettingsState = newRidgeState({
    date: true,
    description: false,
    itemsPerPage: 7
}) 

export const globalSettingsState = newRidgeState<GlobalSettingsState>({
    picBackground: false,
    oneColorForAllCols: false,
    hideNonDeletable: false,
    numberOfCols: 3
})

export const closeAllFoldersState = newRidgeState(false);

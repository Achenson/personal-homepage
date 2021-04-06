import { newRidgeState } from "react-ridge-state";

import {GlobalSettingsState} from "../utils/interfaces"



export const rssSettingsState = newRidgeState({
    date: true,
    description: false,
    itemsPerPage: 7
}) 

export const globalSettingsState = newRidgeState<GlobalSettingsState>({
    picBackground: true,
    defaultImage: "defaultBackground_2",
    oneColorForAllCols: false,
    hideNonDeletable: false,
    numberOfCols: 4,
    // rssDate: true,
    // rssDescription: false,
    // rssItemsPerPage: 9
    
})

export const closeAllTabsState = newRidgeState(false);

export const tabOpenedState = newRidgeState<null | (string | number)>(null)
// export const tabEditOpenedState = newRidgeState<null | (string | number)>(null)


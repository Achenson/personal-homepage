import { newRidgeState } from "react-ridge-state";


export const rssSettingsState = newRidgeState({
    date: true,
    description: false,
    itemsPerPage: 7
}) 

export const globalSettingsState = newRidgeState({
    picBackground: false,
    oneColorForAllCols: true
})

export const closeAllFoldersState = newRidgeState(false);

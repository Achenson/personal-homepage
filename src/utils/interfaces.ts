export interface SingleTabData {
  id: number | string;
  title: string;
  color: string | null;
  column: number;
  priority: number;
  opened: boolean;
  deletable: boolean;
  type: "folder" | "note" | "rss";
  noteInput?: string | null;
  rssLink?: string | null;
  date?: boolean | null;
  description?: boolean | null;
  itemsPerPage?: number | null;
  items?: [object] | never[] | [];
  // bookmarksTitles: string[];
}


export interface SingleBookmarkData {
  id: number | string;
  title: string;
  URL: string;
  tags: (string |number)[]
}

export interface GlobalSettingsState {
  picBackground: boolean,
    oneColorForAllCols: boolean,
    hideNonDeletable: boolean,
    numberOfCols: 1 | 2 | 3 | 4
}

export interface UpperVisAction {
  type:
    | "NEW_BOOKMARK_TOGGLE"
    | "NEW_TAB_TOGGLE"
    | "BACKGROUNG_SETTINGS_TOGGLE"
    | "SETTINGS_TOGGLE"
    | "COLORS_TOGGLE";
  payload?: string | number;
}

export interface TabVisAction {
  type:
  "COLORS_CLOSE" |
  "EDIT_CLOSE" |
  "COLORS_TOGGLE" |
  "EDIT_TOGGLE"| 
  "TAB_CONTENT_TOGGLE"|
  "TAB_CONTENT_CLOSE"|
  "NEW_BOOKMARK_TOOGLE" |
  "EDIT_BOOKMARK_TOOGLE";

    payload?: string | number;
}


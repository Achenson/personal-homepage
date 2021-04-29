export interface SingleTabData {
  id: number | string;
  title: string;
  color: string | null;
  column: number;
  priority: number;
  opened: boolean;
  openedByDefault: boolean;
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
  tags: (string | number)[];
}

export interface GlobalSettingsState {
  picBackground: boolean;
  defaultImage: string;
  oneColorForAllCols: boolean;
  hideNonDeletable: boolean;
  numberOfCols: 1 | 2 | 3 | 4;
  // rssDescription: boolean;
  // rssDate: boolean;
  // rssItemsPerPage: number;
}

export interface InitUpperVisState {
  newBookmarkVis: boolean;
  newTabVis: boolean;
  backgroundSettingsVis: boolean;
  settingsVis: boolean;
  colorsSettingsVis: boolean;
  colorsBackgroundVis: boolean;
  colorsColumnVis: boolean;
  columnSelected: null | number;
  addTagVis_xs: boolean;
  settingsVis_xs: boolean;
}

export interface UpperVisAction {
  type:
    | "NEW_BOOKMARK_TOGGLE"
    | "NEW_TAB_TOGGLE"
    | "BACKGROUND_SETTINGS_TOGGLE"
    | "SETTINGS_TOGGLE"
    | "COLORS_SETTINGS_TOGGLE"
    | "COLORS_BACKGROUND_TOGGLE"
    | "COLORS_COLUMN_TOGGLE"
    | "COLORS_COLUMN_OPEN"
    | "CLOSE_ALL"
    | "ADD_TAG_XS_TOGGLE"
    | "SETTINGS_XS_TOGGLE"
  payload?: number;
}

export interface TabVisAction {
  type:
    | "COLORS_CLOSE"
    | "EDIT_CLOSE"
    | "COLORS_SETTINGS_TOGGLE"
    | "EDIT_TOGGLE"
    | "TAB_CONTENT_TOGGLE"
    | "TAB_CONTENT_DEFAULT"
    | "TAB_CONTENT_OPEN_AFTER_LOCKING"
    | "TAB_EDITABLES_CLOSE"
    | "NEW_BOOKMARK_TOOGLE"
    | "EDIT_BOOKMARK_TOOGLE"
    | "TOUCH_SCREEN_MODE_ON"
  payload?: string | number;
}

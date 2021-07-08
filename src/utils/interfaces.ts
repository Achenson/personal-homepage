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
  limitColGrowth: boolean;
  hideNonDeletable: boolean;
  numberOfCols: 1 | 2 | 3 | 4;
  // rssDescription: boolean;
  // rssDate: boolean;
  // rssItemsPerPage: number;
}

export interface UpperVisState {
  newBookmarkVis: boolean;
  newTabVis: boolean;
  backgroundSettingsVis: boolean;
  settingsVis: boolean;
  profileVis: boolean;
  colorsSettingsVis: boolean;
  colorsBackgroundVis: boolean;
  colorsColumnVis: boolean;
  columnSelected: null | number;
  addTagVis_xs: boolean;
  xsSizing_initial: boolean;
  tabEditablesOpenable: boolean;
  messagePopup: null | string;
}

// for Tab
export interface TabVisState {
  editTabVis: boolean;
  colorsVis: boolean;
  // tabContentVis: boolean;
  newBookmarkVis: boolean;
  editBookmarkVis: null | string | number;
  touchScreenModeOn: boolean;
}

interface UpperVisAction_noPayload {
  type:
    | "NEW_BOOKMARK_TOGGLE"
    | "NEW_TAB_TOGGLE"
    | "BACKGROUND_SETTINGS_TOGGLE"
    | "SETTINGS_TOGGLE"
    | "COLORS_SETTINGS_TOGGLE"
    | "COLORS_BACKGROUND_TOGGLE"
    | "COLORS_COLUMN_TOGGLE"
    | "CLOSE_ALL"
    | "ADD_TAG_XS_TOGGLE"
    | "PROFILE_TOGGLE"
    | "XS_SIZING_TRUE"
    | "XS_SIZING_FALSE"
    | "TAB_EDITABLES_OPENABLE_DEFAULT"
    | "MESSAGE_OPEN_LOGIN"
    | "MESSAGE_OPEN_LOGOUT"
    | "MESSAGE_CLOSE";
}

interface UpperVisAction_COLORS_COLUMN_OPEN {
  type: "COLORS_COLUMN_OPEN";
  payload: number;
}

export type UpperVisAction =
  | UpperVisAction_noPayload
  | UpperVisAction_COLORS_COLUMN_OPEN;

interface TabVisAction_noPayload {
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
    | "EDIT_BOOKMARK_CLOSE"
    | "TOUCH_SCREEN_MODE_ON";
}

interface TabVisAction_EDIT_BOOKMARK_OPEN {
  type: "EDIT_BOOKMARK_OPEN",
  payload: string | number
}

export type TabVisAction = TabVisAction_noPayload | TabVisAction_EDIT_BOOKMARK_OPEN
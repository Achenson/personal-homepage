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

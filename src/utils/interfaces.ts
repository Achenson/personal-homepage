export interface SingleBookmarkData {
  title: string;
  color: string | null;
  column: number;
  priority: number;
  type: "folder" | "note" | "rss";
  noteInput: string | null;
  rssLink: string | null;
  // linksTitles: string[];
}

export interface SingleLinkData {
  title: string;
  URL: string;
  tags: string[]
}


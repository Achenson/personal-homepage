import { v4 as uuidv4 } from "uuid";

export function createBasicFolder(
  title: string,
  column: number,
  priority: number,
  opened: boolean = false,
  deletable: boolean = true
) {
  return {
    id: uuidv4(),
    title,
    color: null,
    column,
    priority,
    opened,
    deletable,
  };
}

export function createTabFolder_partial(
  type: "folder" | "note" | "rss" = "folder"
) {
  return {
    type,
  };
}

export function createNote_partial(
  noteInput: string | null,
  type: "folder" | "note" | "rss" = "note"
) {
  return {
    noteInput,
    type,
  };
}

export function createRSS_partial(
  rssLink: string | null,
  type: "folder" | "note" | "rss" = "rss",
  date: null | boolean = null,
  description: null | boolean = null,
  itemsPerPage: null | number = null
) {
  return {
    rssLink,
    type,
    date,
    description,
    itemsPerPage,
    items: [],
  };
}

export function createTabFolder(
  title: string,
  column: number,
  priority: number
) {
  return {
    ...createBasicFolder(title, column, priority),
    ...createTabFolder_partial(),
  };
}

export function createNote(
  title: string,
  column: number,
  priority: number,
  noteInput: string | null
) {
  return {
    ...createBasicFolder(title, column, priority),
    ...createNote_partial(noteInput),
  };
}

export function createRSS(
  title: string,
  column: number,
  priority: number,
  rssLink: string
) {
  return {
    ...createBasicFolder(title, column, priority),
    ...createRSS_partial(rssLink),
  };
}

export function createLink(title: string, URL: string, tags: (string|number)[]) {
  return {
    id: uuidv4(),
    title,
    URL,
    tags,
  };
}

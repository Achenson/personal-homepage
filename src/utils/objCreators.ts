import { v4 as uuidv4 } from "uuid";

export function createBasicFolder(
  title: string,
  column: number,
  priority: number
) {
  return {
    id: uuidv4(),
    title,
    color: null,
    column,
    priority,
  };
}

export function createBookmarkFolder_partial() {
  return {
    type: "folder",
  };
}

export function createNote_partial(noteInput: string | null) {
  return {
    noteInput,
    type: "note",
  };
}

export function createRSS_partial(rssLink: string | null) {
  return {
    rssLink,
    type: "rss",
  };
}

export function createBookmarkFolder(
  title: string,
  column: number,
  priority: number
) {
  return {
    ...createBasicFolder(title, column, priority),
    ...createBookmarkFolder_partial(),
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
  rssLink: string | null
) {
  return {
    ...createBasicFolder(title, column, priority),
    ...createRSS_partial(rssLink),
  };
}

export const bookmarkErrors = {
  titleFormat: "Bookmark title can contain letters, numbers or underscore",
  titleUniqueness: "Bookmark with that title already exists",
  tagFormat: "Tags should consist of words separated by coma and single space",
  noteError: "Tag names cannot be the same as Notes titles",
  rssError: "Tag names cannot be the same as RSS titles",
  tagRepeat: "Each tag should be unique",
};

export const tabErrors = {
  // titleFormat: "Tab title can contain letters, numbers or underscore",
  titleFormat:
    "Tab title should consist of words without special characters",
  // not used in edit tab
  titleUniqueness: "Tab with that title already exists",
  // bookmarksFormat: "Bookmarks should consist of words separated by coma and space",
  bookmarksFormat:
    "Bookmarks should consist of words (without special characters) separated by coma and space",
  bookmarkExistence: "You can choose from existing bookmarks only",
  bookmarksRepeat: "Each bookmark should be unique",
  // note only
  textArea: "Note cannot be empty",
  // not deletabe folder only
  noDeletion:
    "Folder with all bookmarks cannot be deleted. You can hide it in the global settings instead",
};

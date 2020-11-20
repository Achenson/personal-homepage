import React from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { useState } from "react";
import { produce } from "immer";

import { linksDataState, bookmarksDataState } from "../state/bookmarksAndLinks";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkTitle: string;
}

function NewLink({ setNewLinkVis, bookmarkTitle }: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  const [titleInput, setTitleInput] = useState<string>("");

  const [urlInput, setUrlInput] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string[]>([bookmarkTitle]);

  // ^  and $ -> beginning and end of the text!
  let regexForTags = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [tagRepeatErrorVis, setTagRepeatErrorVis] = useState<boolean>(false);
  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [titleUniquenessErrorVis, setTitleUniquenessErrorVis] = useState<
    boolean
  >(false);
  const [noteErrorVis, setNoteErrorVis] = useState<boolean>(false);

  let notesTitlesArr: string[] = [];

  bookmarksData.forEach((obj) => {
    if (obj.type === "note") {
      notesTitlesArr.push(obj.title);
    }
  });

  return (
    <div className="absolute z-40 bg-gray-100 w-full pb-3 border">
      <form action="" className="pl-2 pr-4">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-10">Title</p>
          <div className="w-full pl-2">
            <input
              type="text"
              className="w-full  border"
              value={titleInput}
              placeholder={"new link title"}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-around mb-2">
          <p className="w-10">Link</p>
          <div className="w-full pl-2">
            <input
              type="text"
              className="w-full  border"
              value={urlInput}
              placeholder={"enter proper URL address"}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start mb-2">
          <p className="w-10">Tags</p>
          <div className="w-full pl-2">
            <input
              type="text"
              className="w-full border"
              value={tagsInput.join(", ")}
              placeholder={"[tag1], [tag2]..."}
              onChange={(e) => setTagsInput([...e.target.value.split(", ")])}
            />
          </div>
        </div>

        {titleFormatErrorVis ? (
          <p className={`text-red-600`}>
            Link title can contain letters, numbers or underscore
          </p>
        ) : null}

        {titleUniquenessErrorVis ? (
          <p className={`text-red-600`}>Link with that title already exists</p>
        ) : null}

        {tagErrorVis ? (
          <p className={`text-red-600`}>
            Tags should consist of words separated by coma and space
          </p>
        ) : null}

        {noteErrorVis ? (
          <p className={`text-red-600`}>
            Names for tags cannot be the same as Notes titles
          </p>
        ) : null}

        {tagRepeatErrorVis ? (
          <p className={`text-red-600`}>Each tag should be unique</p>
        ) : null}

        <div className="flex justify-start mt-3">
          <p className="w-8"></p>
          <div className="w-full pl-4 flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                // if(tagsInput.join(", "))

                setTagErrorVis(false);
                setTagRepeatErrorVis(false);
                setTitleFormatErrorVis(false);
                setTitleUniquenessErrorVis(false);
                setNoteErrorVis(false);

                if (!regexForTitle.test(titleInput)) {
                  setTitleFormatErrorVis(true);

                  return;
                }

                if (!titleUniquenessCheck()) {
                  setTitleUniquenessErrorVis(true);
                  return;
                }

                if (!regexForTags.test(tagsInput.join(", "))) {
                  setTagErrorVis(true);
                  return;
                }

                for (let el of tagsInput) {
                  if (notesTitlesArr.indexOf(el) > -1) {
                    setNoteErrorVis(true);
                    return;
                  }
                }

                if (!tagUniquenessCheck()) {
                  setTagRepeatErrorVis(true);
                  return;
                }

                setLinksData((previous) =>
                  produce(previous, (updated) => {
                    updated.push({
                      title: titleInput,
                      URL: urlInput,
                      tags: [...tagsInput],
                    });
                  })
                );

                setNewLinkVis((b) => !b);

                function tagUniquenessCheck() {
                  let isUnique: boolean = true;

                  tagsInput.forEach((el, i) => {
                    let tagsInputCopy = [...tagsInput];
                    tagsInputCopy.splice(i, 1);

                    if (tagsInputCopy.indexOf(el) > -1) {
                      isUnique = false;
                      return;
                    }
                  });

                  return isUnique;
                }

                function titleUniquenessCheck() {
                  let isUnique: boolean = true;

                  linksData.forEach((obj, i) => {
                    if (obj.title === titleInput) {
                      isUnique = false;
                    }
                  });

                  return isUnique;
                }
              }}
            >
              <SaveSVG className="h-5 fill-current text-gray-900 mr-3 hover:text-green-600" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setNewLinkVis((b) => !b);
              }}
            >
              <CancelSVG className="h-5 fill-current text-gray-900 ml-3 hover:text-red-600" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewLink;

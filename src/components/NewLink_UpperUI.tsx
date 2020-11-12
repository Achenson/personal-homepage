import React from "react";
import { useState } from "react";

import { produce } from "immer";
import { linksDataState } from "../state/bookmarksAndLinks";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewLink_UpperUI({setNewLinkVis}: Props): JSX.Element {
  const [linksData, setLinksData] = linksDataState.use();

  const [titleInput, setTitleInput] = useState<string>("");

  const [urlInput, setUrlInput] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string[]>([]);

  const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);
  const [tagRepeatErrorVis, setTagRepeatErrorVis] = useState<boolean>(false);
  const [titleFormatErrorVis, setTitleFormatErrorVis] = useState<boolean>(
    false
  );
  const [titleUniquenessErrorVis, setTitleUniquenessErrorVis] = useState<
    boolean
  >(false);

  // ^  and $ -> beginning and end of the text!
  let regexForTags = /^\w+(,\s\w+)*$/;
  let regexForTitle = /^\w+$/;

  return (
    <div className="flex relative h-screen items-center justify-center">
         <div className="z-40 bg-gray-100 w-64 pb-3 border absolute md:mb-64">
      <form action="" className="pl-2 pr-4">
        <div className="flex justify-around mb-2 mt-2">
          <p className="w-8">Title</p>
          <div className="w-full pl-4">
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
          <p className="w-8">Link</p>
          <div className="w-full pl-4">
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
          <p className="w-8">Tags</p>
          <div className="w-full pl-4">
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

    </div>
 
  );
}

export default NewLink_UpperUI;

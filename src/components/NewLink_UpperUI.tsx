import React from "react";
import { useState } from "react";

import { produce } from "immer";
import { linksDataState } from "../state/bookmarksAndLinks";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";

interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewLink_UpperUI({ setNewLinkVis }: Props): JSX.Element {
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
    // opacity cannot be used, because children will inherit it and the text won't be readable
    <div
      className="flex z-50 absolute h-screen w-screen items-center justify-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div
        className="bg-gray-200 pb-3 pt-6 border-2 border-teal-500 rounded-sm md:mb-48"
        style={{ width: "350px" }}
      >
        <form action="" className="pl-2 pr-4">
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-10">Title</p>
            <div className="w-full pl-2">
              <input
                type="text"
                className="w-full border border-gray-500"
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
                className="w-full border border-gray-500"
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
                className="w-full border border-gray-500  "
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
            <p className={`text-red-600`}>
              Link with that title already exists
            </p>
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
            {/* !!! pl-4 in NewLink */}
            <div className="w-full flex justify-center">
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
                <SaveSVG className="h-5 fill-current text-black mr-3 hover:text-green-600" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewLinkVis((b) => !b);
                }}
              >
                <CancelSVG className="h-5 fill-current text-black ml-3 hover:text-red-600" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLink_UpperUI;

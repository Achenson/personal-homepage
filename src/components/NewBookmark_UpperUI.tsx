import React from "react";

import { useState } from "react";

import { ReactComponent as SaveSVG } from "../svgs/save.svg";
import { ReactComponent as CancelSVG } from "../svgs/alphabet-x.svg";
import { produce } from "immer";

import { bookmarksDataState } from "../state/bookmarksAndLinks";
import { linksDataState } from "../state/bookmarksAndLinks";

interface Props {
  setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewBookmark_UpperUI({ setNewBookmarkVis }: Props): JSX.Element {
  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();
  const [linksData, setLinksData] = linksDataState.use();

  const [bookmarkTitleInput, setBookmarkTitleInput] = useState<string>("");

  const [bookmarkColumnInput, setBookmarkColumnInput] = useState<number>(1);
  const [bookmarkLinksInput, setBookmarkLinksInput] = useState<string[]>([]);

  // let bookmarkIndex: number;

  // bookmarksData.forEach((obj, i) => {
  //   if (obj.title === bookmarkTitle) {
  //     bookmarkIndex = i;
  //   }
  // });

  // const [tagErrorVis, setTagErrorVis] = useState<boolean>(false);

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
            <p className="w-32">Title</p>
            <div className="w-full pl-2">
              <input
                type="text"
                className="w-full border border-gray-500"
                value={bookmarkTitleInput}
                placeholder={"new folder title"}
                onChange={(e) => setBookmarkTitleInput(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Column</p>
            <div className="w-full pl-2">
              <input
                type="number"
                min="1"
                max="4"
                className="w-full border border-gray-500"
                value={bookmarkColumnInput}
                onChange={(e) =>
                  setBookmarkColumnInput(parseInt(e.target.value))
                }
                placeholder={"Enter number between 1 and 4"}
              />
            </div>
          </div>

          <div className="flex justify-around mb-2 mt-2">
            <p className="w-32">Bookmarks</p>
            <div className="w-full pl-2">
              <input
                type="text"
                className="w-full border border-gray-500"
                value={bookmarkLinksInput.join(", ")}
                onChange={(e) =>
                  setBookmarkLinksInput([...e.target.value.split(", ")])
                }
                placeholder={"Choose at least one from existing bookmarks"}
              />
            </div>
          </div>

          {/* <div className="flex justify-around mb-2">
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


        </div> */}

          {/* <div className="flex justify-start mb-2">
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
        </div> */}

          {/* {titleFormatErrorVis ? (
          <p className={`text-red-600`}>
            Link title can contain letters, numbers or underscore
          </p>
        ) : null} */}

          {/* {titleUniquenessErrorVis ? (
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
        ) : null} */}

          <div className="flex justify-start mt-3">
            <p className="w-8"></p>
            {/* !!! pl-4 in NewLink */}
            <div className="w-full flex justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  // if(tagsInput.join(", "))

                  // setTagErrorVis(false);
                  // setTagRepeatErrorVis(false);
                  // setTitleFormatErrorVis(false);
                  // setTitleUniquenessErrorVis(false);

                  // if (!regexForTitle.test(titleInput)) {
                  //   setTitleFormatErrorVis(true);

                  //   return;
                  // }

                  // if (!titleUniquenessCheck()) {
                  //   setTitleUniquenessErrorVis(true);
                  //   return;
                  // }

                  // if (!regexForTags.test(tagsInput.join(", "))) {
                  //   setTagErrorVis(true);
                  //   return;
                  // }

                  // if (!tagUniquenessCheck()) {
                  //   setTagRepeatErrorVis(true);
                  //   return;
                  // }

                  // setLinksData((previous) =>
                  //   produce(previous, (updated) => {
                  //     updated.push({
                  //       title: titleInput,
                  //       URL: urlInput,
                  //       tags: [...tagsInput],
                  //     });
                  //   })
                  // );

                  // setNewLinkVis((b) => !b);

                  // function tagUniquenessCheck() {
                  //   let isUnique: boolean = true;

                  //   tagsInput.forEach((el, i) => {
                  //     let tagsInputCopy = [...tagsInput];
                  //     tagsInputCopy.splice(i, 1);

                  //     if (tagsInputCopy.indexOf(el) > -1) {
                  //       isUnique = false;
                  //       return;
                  //     }
                  //   });

                  //   return isUnique;
                  // }

                  //   function titleUniquenessCheck() {
                  //     let isUnique: boolean = true;

                  //     linksData.forEach((obj, i) => {
                  //       if (obj.title === titleInput) {
                  //         isUnique = false;
                  //       }
                  //     });

                  //     return isUnique;
                  //   }
                }}
              >
                <SaveSVG
                  className="h-5 fill-current text-black mr-3 hover:text-green-600"
                  onClick={(e) => {
                    e.preventDefault();

                    setBookmarksData((previous) =>
                      produce(previous, (updated) => {
                        updated.push({
                          title: bookmarkTitleInput,
                          column: bookmarkColumnInput,
                          color: "bg-teal-400",
                          priority: 0,
                        });
                      })
                    );

                    setLinksData((previous) =>
                      produce(previous, (updated) => {
                        updated.forEach((obj) => {
                          if (
                            bookmarkLinksInput.indexOf(obj.title) > -1 &&
                            obj.tags.indexOf(bookmarkTitleInput) === -1
                          ) {
                            obj.tags.push(bookmarkTitleInput);
                          }
                        });
                      })
                    );
                  }}
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewBookmarkVis((b) => !b);
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

export default NewBookmark_UpperUI;

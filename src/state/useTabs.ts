// import { newRidgeState } from "react-ridge-state";

import create from "zustand";
import produce from "immer";

import { SingleTabData } from "../utils/interfaces";
import { SingleBookmarkData } from "../utils/interfaces";

interface UseTabs {
  addTab: (singleTabData: SingleTabData) => void;
  deleteTab: (tabID: string | number) => void;
  editTab: (
    tabID: string | number,
    tabTitleInput: string,
    textAreaValue: string | null,
    rssLinkInput: string,
    dateCheckbox: boolean,
    descriptionCheckbox: boolean,
    rssItemsPerPage: number,
    wasTabOpenClicked: boolean,
    wasCheckboxClicked: boolean,
    wasItemsPerPageClicked: boolean,
    tabType: "folder" | "note" | "rss",
    tabOpen: boolean,
    setTabOpened_local: React.Dispatch<React.SetStateAction<boolean>>

    /* 
    
    
       produce(previous, (updated) => {
        let tabToUpdate = updated.find((obj) => obj.id === tabID);

        if (tabToUpdate) {
          tabToUpdate.title = tabTitleInput;
          // updated[tabIndex].deletable = currentTab[0].deletable
          if (wasTabOpenClicked) {
            tabToUpdate.openedByDefault = tabOpen;
            setTabOpened_local(tabOpen);
            tabToUpdate.opened = tabOpen;
          }

          if (tabType === "note") {
            tabToUpdate.noteInput = textAreaValue;
          }
          if (tabType === "rss") {
            tabToUpdate.rssLink = rssLinkInput;

            if (wasCheckboxClicked) {
              tabToUpdate.date = dateCheckbox;
            }

            if (wasCheckboxClicked) {
              tabToUpdate.description = descriptionCheckbox;
            }

            if (wasItemsPerPageClicked) {
              tabToUpdate.itemsPerPage = rssItemsPerPage;
            }
          }
        }
      })
    
    
    
    
    
    
    
    
    */
  ) => void;
  setTabColor: (color: string, tabID: string | number) => void;
  toggleTab: (tabID: string | number, tabOpened: boolean) => void;
  tabs: SingleTabData[];
}

// this can be used everywhere in your application
export const useTabs = create<UseTabs>((set) => ({
  addTab: (singleTabData) => {
    set(
      produce((state: UseTabs) => {
        state.tabs.push(singleTabData);
      })
    );
  },
  deleteTab: (tabID) => {
    produce((state: UseTabs) => {
      let tabToDelete = state.tabs.find((obj) => obj.id == tabID);
      if (tabToDelete) {
        let tabIndex = state.tabs.indexOf(tabToDelete);
        state.tabs.splice(tabIndex, 1);
      }
    });
  },
  editTab: (
    tabID,
    tabTitleInput,
    textAreaValue,
    rssLinkInput,
    dateCheckbox,
    descriptionCheckbox,
    rssItemsPerPage,
    wasTabOpenClicked,
    wasCheckboxClicked,
    wasItemsPerPageClicked,
    tabType,
    tabOpen,
    setTabOpened_local
  ) => {
    set(
      produce((state: UseTabs) => {
        let tabToUpdate = state.tabs.find((obj) => obj.id === tabID);

        if (tabToUpdate) {
          tabToUpdate.title = tabTitleInput;
          // updated[tabIndex].deletable = currentTab[0].deletable
          if (wasTabOpenClicked) {
            tabToUpdate.openedByDefault = tabOpen;
            setTabOpened_local(tabOpen);
            tabToUpdate.opened = tabOpen;
          }

          if (tabType === "note") {
            tabToUpdate.noteInput = textAreaValue;
          }
          if (tabType === "rss") {
            tabToUpdate.rssLink = rssLinkInput;

            if (wasCheckboxClicked) {
              tabToUpdate.date = dateCheckbox;
            }

            if (wasCheckboxClicked) {
              tabToUpdate.description = descriptionCheckbox;
            }

            if (wasItemsPerPageClicked) {
              tabToUpdate.itemsPerPage = rssItemsPerPage;
            }
          }
        }
      })
    );
  },
  setTabColor: (color, tabID) =>
    set(
      produce((state: UseTabs) => {
        let tabToChange = state.tabs.find((obj) => obj.id === tabID);

        if (tabToChange) {
          tabToChange.color = `${color}`;
        }
      })
    ),

  toggleTab: (tabID, tabOpened) =>
    set(
      produce((state: UseTabs) => {
        let tabToUpdate = state.tabs.find(
          (obj: SingleTabData) => obj.id === tabID
        );
        if (tabToUpdate) {
          state.tabs[state.tabs.indexOf(tabToUpdate)].opened = !tabOpened;
        }
      })
    ),
  tabs: [
    {
      id: "ALL_TAGS",
      title: "all bookmarks",
      color: null,
      column: 1,
      priority: 2,
      opened: false,
      openedByDefault: false,
      deletable: false,
      type: "folder",
      // noteInput: null,
      // rssLink: null
      // linksTitles: ["facebook", "tvn24", "gmail"],
    },
    {
      id: "2",
      title: "main",
      color: "red-400",
      column: 1,
      priority: 1,
      opened: true,
      openedByDefault: true,
      deletable: true,
      type: "folder",
      // noteInput: null,
      // rssLink: null
      // linksTitles: ["tvn24", "gmail"],
    },
    {
      id: "3",
      title: "fun",
      color: null,
      column: 3,
      priority: 0,
      opened: true,
      openedByDefault: true,
      deletable: true,
      type: "folder",
      // noteInput: null,
      // rssLink: null
      // linksTitles: ["facebook"],
    },
    {
      id: "4",
      title: "note",
      color: null,
      column: 1,
      priority: 0,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "note",
      noteInput: "someText moreText",
      // rssLink: null
      // linksTitles: ["facebook"],
    },
    {
      id: "5",
      title: "dailygalaxy",
      color: null,
      column: 2,
      priority: 0,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      rssLink: "https://dailygalaxy.com/feed/",
      // rssLink: "http://rss.sciam.com/basic-science"
      // rssLink: "https://tvn24.pl/najwazniejsze.xml",
      // rssLink: "https://feeds.feedburner.com/sciencealert-latestnews"
      // rssLink: "https://science.sciencemag.org/rss/twis.xml", <- works
      // rssLink: "https://techbeacon.com/rss.xml"
      // rssLink:  "https://feeds.theguardian.com/theguardian/uk-news/rss"
      // rssLink: "http://rss.cnn.com/rss/edition.rss"
    },
    {
      id: "6",
      title: "sciam",
      color: null,
      column: 2,
      priority: 1,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      // !!! RSS_reactQuery should run the second URL in case of error
      rssLink: "http://rss.sciam.com/basic-science",
      // rssLink: "http://rss.sciam.com/basic-science?format=xml",
    },
    {
      id: "7",
      title: "tvn24",
      color: null,
      column: 2,
      priority: 2,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      rssLink: "https://tvn24.pl/najwazniejsze.xml",
    },
    {
      id: "8",
      title: "science alert",
      color: null,
      column: 2,
      priority: 3,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      // rssLink: "https://feeds.feedburner.com/sciencealert-latestnews",
      rssLink: "http://feeds.feedburner.com/sciencealert-latestnews?format=xml",
    },
    {
      id: "9",
      title: "guardian",
      color: null,
      column: 2,
      priority: 4,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      rssLink: "https://feeds.theguardian.com/theguardian/uk-news/rss",
    },
    {
      id: "10",
      title: "cnn",
      color: null,
      column: 2,
      priority: 5,
      opened: false,
      openedByDefault: false,
      deletable: true,
      type: "rss",
      date: null,
      description: null,
      itemsPerPage: null,
      items: [],
      rssLink: "http://rss.cnn.com/rss/edition.rss",
    },
  ],
}));

// let bookmarksAllTagsState = <(string | number)[]>["ALL_TAGS", "2", "3"];

// let deletedTabState = <string | number>"";

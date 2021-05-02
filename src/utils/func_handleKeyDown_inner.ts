//for newTab newBookmark (upperUI). editTab, bookark lowerUI(new & edit) (lowerUI)
export function handleKeyDown_inner(
    eventCode: string,
    selectablesListVis: boolean,
    setSelectablesListVis: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>,
    selectablesRef: React.MutableRefObject<undefined>
  ) {
    switch (eventCode) {
      case "ArrowDown":
        if (!selectablesListVis) {
          setSelectablesListVis(true);
          // @ts-ignore
          selectablesRef.current.focus();
        }
        return;
      case "Delete":
        if (!selectablesListVis) {
          setSelectablesInputStr("");
        }
        return;
      default:
        return;
    }
  }
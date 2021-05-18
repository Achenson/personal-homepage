//for newTab newBookmark (upperUI). editTab, bookark lowerUI(new & edit) (lowerUI)
export function handleKeyDown_inner(
  event: KeyboardEvent,
  eventCode: string,
  selectablesListVis: boolean,
  setSelectablesListVis: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectablesInputStr: React.Dispatch<React.SetStateAction<string>>,
  selectablesRef: React.MutableRefObject<undefined>,
  saveFunc: () => void
) {
  switch (eventCode) {
    case "ArrowDown":
      event.preventDefault();
      if (!selectablesListVis) {
        setSelectablesListVis(true);
        // @ts-ignore
        selectablesRef.current.focus();
      }
      return;
    case "ArrowUp":
      event.preventDefault();
      return;
    case "Enter":
      if (!selectablesListVis) {
        saveFunc();
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

export function setComplementaryUiColor(
  color: string,
  setUiColorData: (
    newState: string | ((prev: string) => string),
    ac?: ((newState: string) => any) | undefined
  ) => any
) {

  if (color === "black") {
   setUiColorData("blueGray-400");
  }

  if (colorRgx("gray").test(color) || colorRgx("Gray").test(color)) {
    setUiColorData("blueGray-400");
  }

  if (colorRgx("yellow").test(color) || colorRgx("amber").test(color)) {
    setUiColorData("yellow-500");
  }

  if (colorRgx("orange").test(color)) {
    setUiColorData("orange-500");
  }

  if (colorRgx("red").test(color)) {
    setUiColorData("red-400");
  }

  if (
    colorRgx("lime").test(color) ||
    colorRgx("green").test(color) ||
    colorRgx("emarald").test(color) ||
    colorRgx("teal").test(color)
  ) {
    setUiColorData("teal-500");
  }

  if (colorRgx("cyan").test(color) || colorRgx("sky").test(color)) {
    setUiColorData("sky-500");
  }

  if (colorRgx("blue").test(color) || colorRgx("indigo").test(color)) {
    setUiColorData("blue-500");
  }

  if (colorRgx("violet").test(color) || colorRgx("purple").test(color)) {
    setUiColorData("violet-500");
  }

  if (colorRgx("fuchsia").test(color)) {
    setUiColorData("fuchsia-500");
  }

  if (colorRgx("rose").test(color)) {
    setUiColorData("rose-400");
  }

  if (colorRgx("pink").test(color)) {
    setUiColorData("pink-400");
  }

  function colorRgx(color: string) {
    return new RegExp(`${color}-`);
  }
}

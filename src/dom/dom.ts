type HtmlValue = HTMLElementTagNameMap;
type HtmlKey = keyof HtmlValue;
export type SvgValue = SVGElementTagNameMap;
export type SvgKey = keyof SvgValue;

type WebKey = HtmlKey | SvgKey;
type WebValue = HtmlValue & SvgValue;

export type Elementful<K extends WebKey = WebKey> = {
  element: WebValue[K];
};

type Wakefulness = "awake" | "asleep" | "yoked";

export type Wakesome<W extends Wakefulness = Wakefulness> = W extends any
  ? {
      wakefulness: W;
    }
  : never;

type Classesful = { classes: string[] };

export const makeHtmlElement = <K extends HtmlKey>(
  tagName: K,
  attributes: Partial<Classesful & HtmlValue[K]> = {},
) => {
  const element = document.createElement(tagName);

  for (const [qualifiedName, value] of Object.entries(attributes)) {
    switch (qualifiedName) {
      case "innerHTML":
        element[qualifiedName] = value;
        continue;
      case "classes":
        element.classList.add(...value);
        continue;
      default:
        element.setAttribute(qualifiedName, value);
        continue;
    }
  }

  return element;
};

import { makeBabbles, type Babbles, type DeepBabble } from "../speech/babble";
import { makeByspell } from "../speech/byspell";
import { unzip } from "../type/list";
import { union, type Assert, type Maybe } from "../type/type";
import { makeHtmlElement, type Elementful, type Wakesome } from "./dom";
import { type WaystringSettings, makeShapeSvg } from "./svg";

type WorldDiv = Elementful<"div"> & {
  shapes: ShapesDiv;
  buttons: ButtonsUl;
  babbles: BabblesUl;
  yoke: Maybe<Yoke>;
  snailnets: Snailnet[];
};

type Snailnet = {
  smooth: DeepBabble;
  sharp: DeepBabble;
};

type Yoke = {
  smooth: Babbles;
  sharp: Babbles;
};

type ShapesDiv = Elementful<"div"> & {
  left: ShapeDiv;
  right: ShapeDiv;
};

type ShapeDiv = Elementful<"div"> &
  Wakesome & {
    nameSpan: HTMLSpanElement;
    shapeSvg: SVGSVGElement;
  };

type ButtonsUl = Elementful<"ul"> & {
  resetLi: HTMLLIElement;
  submitLi: HTMLLIElement;
  skipLi: HTMLLIElement;
};

type BabblesUl = Elementful<"ul"> & {
  top: BabbleLi;
  bottom: BabbleLi;
};

type BabbleLi = Elementful<"li"> &
  Wakesome & {
    babbleSpan: HTMLSpanElement;
    louds: LoudsDiv;
    byspellsUl: HTMLUListElement;
    babbles: Babbles;
  };

type LoudsDiv = Elementful<"div"> & {
  deepSpan: HTMLSpanElement;
  shoalSpan: HTMLSpanElement;
};

export const become = (): WorldDiv => {
  const element = makeHtmlElement("div", { id: "world" });
  const shapes = makeShapesDiv();
  const buttons = makeButtonsUl();
  const babbles = makeBabblesUl();

  element.append(shapes.element, buttons.element, babbles.element);

  const worldDiv = {
    element,
    shapes,
    buttons,
    babbles,
    yoke: undefined,
    snailnets: [],
  };

  worldDiv.buttons.resetLi.onclick = () => unset(worldDiv);
  worldDiv.buttons.submitLi.onclick = () => send(worldDiv);
  worldDiv.buttons.skipLi.onclick = () => wherve(worldDiv);

  addListeners(worldDiv);

  return worldDiv;
};

const unset = (worldDiv: WorldDiv) => {
  besleep(worldDiv.shapes.left);
  besleep(worldDiv.shapes.right);
  besleep(worldDiv.babbles.top);
  besleep(worldDiv.babbles.bottom);
  worldDiv.shapes.left.nameSpan.innerHTML = "";
  worldDiv.shapes.right.nameSpan.innerHTML = "";
  worldDiv.yoke = undefined;
};

const send = (worldDiv: WorldDiv) => {
  console.log(worldDiv.yoke)
  if (worldDiv.yoke) {
    const snailnets: Snailnet[] = JSON.parse(
      localStorage.getItem("snailnets") ?? "[]",
    );
    snailnets.push({
      smooth: worldDiv.yoke.smooth.deep,
      sharp: worldDiv.yoke.sharp.deep,
    });
    worldDiv.snailnets = snailnets;
    understand(snailnets);
    localStorage.setItem("snailnets", JSON.stringify(snailnets));
    wherve(worldDiv);
  }
};

const understand = (snailnets: Snailnet[]) => {
  const [smooths, sharps] = unzip(
    snailnets.flatMap((snailnet) => [
      [snailnet.smooth[0]!, snailnet.sharp[0]!],
      [snailnet.smooth[1]!, snailnet.sharp[1]!],
    ]),
  );
  console.log(smooths, sharps);
  const understandings = {
    smooth: union(
      ...Array.from(new Set(smooths)).map((smooth) => ({
        [smooth]: smooths.filter((sm) => sm === smooth).length / smooths.length,
      })),
    ),
    sharp: union(
      ...Array.from(new Set(sharps)).map((sharp) => ({
        [sharp]: sharps.filter((sh) => sh === sharp).length / sharps.length,
      })),
    ),
  };

  console.log(understandings);
};

export const wherve = (worldDiv: WorldDiv) => {
  unset(worldDiv);
  updateShapes(worldDiv);
  updateBabbles(worldDiv);
  addListeners(worldDiv);
};

const addListeners = (worldDiv: WorldDiv) => {
  addListener(worldDiv, worldDiv.shapes.left, [worldDiv.shapes.right]);
  addListener(worldDiv, worldDiv.shapes.right, [worldDiv.shapes.left]);
  addListener(worldDiv, worldDiv.babbles.top, [worldDiv.babbles.bottom]);
  addListener(worldDiv, worldDiv.babbles.bottom, [worldDiv.babbles.top]);
};

const makeShapesDiv = (): ShapesDiv => {
  const element = makeHtmlElement("div", { id: "shapes" });

  const left = makeShapeDiv({ corning: 10 });
  const right = makeShapeDiv();
  element.append(left.element, right.element);

  return { element, left, right };
};

const makeButtonsUl = (): ButtonsUl => {
  const element = makeHtmlElement("ul", { id: "buttons" });

  const resetLi = makeHtmlElement("li", { id: "reset", innerHTML: "reset" });
  const submitLi = makeHtmlElement("li", { id: "submit", innerHTML: "submit" });
  const skipLi = makeHtmlElement("li", { id: "skip", innerHTML: "skip" });
  element.append(resetLi, submitLi, skipLi);

  return { element, resetLi, submitLi, skipLi };
};

const makeBabblesUl = (): BabblesUl => {
  const element = makeHtmlElement("ul", { id: "babbles" });

  const top = makeBabbleLi();
  const bottom = makeBabbleLi(top.babbles);
  element.append(top.element, bottom.element);

  return { element, top, bottom };
};

const makeBabbleLi = (forbiddens: Maybe<Babbles> = undefined): BabbleLi => {
  const babbles = makeBabbles(forbiddens);

  const element = makeHtmlElement("li");

  const babbleSpan = makeHtmlElement("span", {
    classes: ["babble"],
    innerHTML: babbles.book,
  });

  const louds = makeLoudsDiv(babbles);

  const byspellsUl = makeHtmlElement("ul");
  byspellsUl.append(
    ...[babbles.choke, babbles.bear].map((staff) => {
      const li = makeHtmlElement("li", { innerHTML: makeByspell(staff) });
      return li;
    }),
  );

  element.append(babbleSpan, louds.element, byspellsUl);

  return {
    element,
    wakefulness: "asleep",
    babbleSpan,
    louds,
    byspellsUl,
    babbles,
  };
};

const makeLoudsDiv = (babbles: Babbles): LoudsDiv => {
  const element = makeHtmlElement("div", { classes: ["loud"] });
  const deepSpan = makeHtmlElement("span", {
    classes: ["deep"],
    innerHTML: babbles.deep,
  });
  const shoalSpan = makeHtmlElement("span", {
    classes: ["shoal"],
    innerHTML: babbles.shoal,
  });
  element.append(deepSpan, shoalSpan);

  return { element, deepSpan, shoalSpan };
};

const updateShapes = (worldDiv: WorldDiv) => {
  const left = makeShapeDiv({ corning: 10 });
  const right = makeShapeDiv();

  worldDiv.shapes.left = left;
  worldDiv.shapes.right = right;
  worldDiv.shapes.left.element.replaceWith(left.element);
  worldDiv.shapes.right.element.replaceWith(right.element);
  worldDiv.shapes.element.replaceChildren(left.element, right.element);
};

const updateBabbles = (worldDiv: WorldDiv) => {
  const top = makeBabbleLi();
  const bottom = makeBabbleLi(top.babbles);

  worldDiv.babbles.top = top;
  worldDiv.babbles.bottom = bottom;
  worldDiv.babbles.top.element.replaceWith(top.element);
  worldDiv.babbles.bottom.element.replaceWith(bottom.element);
  worldDiv.babbles.element.replaceChildren(top.element, bottom.element);
};

const sunder = <W extends Wakesome, V extends Wakesome>(
  left: W,
  right: V,
): [[W, V], []] | [[W], [V]] | [[V], [W]] | [[], [W, V]] => {
  if (left.wakefulness === "awake" && right.wakefulness === "awake") {
    return [[left, right], []];
  } else if (left.wakefulness === "awake") {
    return [[left], [right]];
  } else if (right.wakefulness === "awake") {
    return [[right], [left]];
  } else {
    return [[], [left, right]];
  }
};

const addListener = <E extends Elementful & Wakesome>(
  worldDiv: WorldDiv,
  wakesome: E,
  siblings: E[],
): E => {
  wakesome.element.classList.add("asleep");

  wakesome.element.addEventListener("click", () => {
    if (worldDiv.yoke) {
      unset(worldDiv);
      awaken(wakesome, []);
    } else if (wakesome.wakefulness === "awake") {
      besleep(wakesome);
    } else if (wakesome.wakefulness === "asleep") {
      awaken(wakesome, siblings);
      const [awakeShapes, asleepShapes] = sunder(
        worldDiv.shapes.left,
        worldDiv.shapes.right,
      );
      if (awakeShapes.length === 1) {
        const [awakeBabbles, asleepBabbles] = sunder(
          worldDiv.babbles.top,
          worldDiv.babbles.bottom,
        );
        if (awakeBabbles.length === 1) {
          if (asleepShapes.length === 1 && asleepBabbles.length === 1) {
            const awakeShape = awakeShapes[0];
            const awakeBabble = awakeBabbles[0];
            const asleepShape = asleepShapes[0];
            const asleepBabble = asleepBabbles[0];

            worldDiv.yoke =
              awakeShape === worldDiv.shapes.left
                ? {
                    smooth: awakeBabble.babbles,
                    sharp: asleepBabble.babbles,
                  }
                : {
                    smooth: asleepBabble.babbles,
                    sharp: awakeBabble.babbles,
                  };

            awakeShape.nameSpan.innerHTML = awakeBabble.babbleSpan.innerHTML;
            asleepShape.nameSpan.innerHTML = asleepBabble.babbleSpan.innerHTML;

            yoke(asleepShape, asleepBabble);
          } else {
            throw new Error("bad wakesomes");
          }
        }
      }
    }
  });

  return wakesome;
};

const yoke = <E extends Elementful & Wakesome, F extends Elementful & Wakesome>(
  first: E,
  other: F,
): [E, F] => {
  first.wakefulness = "yoked";
  first.element.classList.remove("awake", "asleep");
  first.element.classList.add("yoked");

  other.wakefulness = "yoked";
  other.element.classList.remove("awake", "asleep");
  other.element.classList.add("yoked");
  return [first, other];
};

const awaken = <
  E extends Elementful & Wakesome,
  F extends Elementful & Wakesome,
>(
  wakesome: E,
  siblings: F[],
): E => {
  wakesome.wakefulness = "awake";
  wakesome.element.classList.remove("asleep", "yoked");
  wakesome.element.classList.add("awake");

  siblings.forEach(besleep);

  return wakesome;
};

const besleep = <E extends Elementful & Wakesome>(wakesome: E): E => {
  wakesome.wakefulness = "asleep";
  wakesome.element.classList.remove("awake", "yoked");
  wakesome.element.classList.add("asleep");
  return wakesome;
};

const makeShapeDiv = (settings: Partial<WaystringSettings> = {}): ShapeDiv => {
  const element = makeHtmlElement("div");
  const nameSpan = makeHtmlElement("span", { id: "name" });
  const shapeSvg = makeShapeSvg(settings);
  element.append(nameSpan, shapeSvg);

  return { element, nameSpan, shapeSvg, wakefulness: "asleep" };
};

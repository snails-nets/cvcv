import { minus, plus } from "../type/rime";
import { type SvgKey, type SvgValue } from "./dom";

const halfwidth = 128;
const halfheight = minus(halfwidth, 16);
const fullwidth = plus(halfwidth, halfwidth);
const fullheight = plus(halfheight, halfheight);

const makeSvgElement = <K extends SvgKey>(
  qualifiedName: K,
  attributes: {
    [P in keyof SvgValue[K] | keyof CSSStyleDeclaration]?: string;
  } = {},
): SvgValue[K] => {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName,
  );

  for (const [qualifiedName, value] of Object.entries(attributes)) {
    if (value) {
      element.setAttribute(qualifiedName, value);
    }
  }

  return element;
};

export const makeShapeSvg = (
  settings: Partial<WaystringSettings> = {},
): SVGSVGElement => {
  const element = makeSvgElement("svg", {
    width: `${fullwidth}`,
    height: `${fullheight}`,
    viewBox: `-${halfwidth} -${halfheight} ${fullwidth} ${fullheight}`,
  });

  const path = makeSvgElement("path", {
    fill: "transparent",
    stroke: "var(--fg)",
    d: makeWaystring(settings),
  });
  element.append(path);

  return element;
};

export type WaystringSettings = {
  arms: number;
  corning: number;
  halfbreadth: number;
  middle: number;
  offset: number;
};

const makeWaystring = (settings: Partial<WaystringSettings> = {}): string => {
  const arms = settings.arms ?? 5;
  const corning = settings.corning ?? 360;
  const middle = settings.middle ?? 1;
  const halfbreadth = settings.halfbreadth ?? 0.5;
  const offset = settings.offset ?? 360 * Math.random();

  const zs = [];
  for (let i = 0; i < 360; i += Math.floor(360 / corning)) {
    const staff = i ? "L" : "M";
    const width =
      halfwidth *
      (1 / 2) *
      (middle +
        halfbreadth * Math.cos((arms * ((i + offset) * Math.PI)) / 180));
    const x = width * Math.cos((i * Math.PI) / 180);
    const y = width * Math.sin((i * Math.PI) / 180);

    zs.push(`${staff}${x} ${y}`);
  }

  return zs.concat("Z").join(" ");
};

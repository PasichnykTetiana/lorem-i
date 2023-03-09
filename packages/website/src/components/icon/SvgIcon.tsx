import React, { type FC, type SVGProps } from "react";

import { ReactComponent as ArrowNext } from "./images/Arrow.svg";
import { ReactComponent as ArrowPrev } from "./images/ArrowP.svg";
import { ReactComponent as Dot } from "./images/Dot.svg";

const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  dot: Dot,
  arrowNext: ArrowNext,
  arrowPrev: ArrowPrev,
} as const;

type SvgIconProps = SVGProps<SVGSVGElement> & { type: string };

const SvgIcon: FC<SvgIconProps> = ({ type, ...svgProps }) => {
  const Icon = icons[type] ?? null;
  return Icon && <Icon {...svgProps} />;
};

export { SvgIcon };

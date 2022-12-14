import React from 'react'
import { FC, SVGProps } from 'react'
import { ReactComponent as Pawn } from './images/pawn.svg'
import { ReactComponent as Queen } from './images/queen.svg'
import { ReactComponent as ArrowNext } from './images/Arrow.svg'
import { ReactComponent as ArrowPrev } from './images/ArrowP.svg'

const icons: { [key: string]: FC<SVGProps<SVGSVGElement>> } = {
    pawn: Pawn,
    queen: Queen,
    arrowNext: ArrowNext,
    arrowPrev: ArrowPrev
} as const

type SvgIconProps = SVGProps<SVGSVGElement> & { type: string }

const SvgIcon: FC<SvgIconProps> = ({ type,  ...svgProps }) => {
    const Icon = icons[type] ?? null
    return Icon && <Icon {...svgProps} />
}

export { SvgIcon }
import { useMediaQuery } from 'react-responsive'

enum Breakpoints {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1024,
  XXL = 1200,
  XXXL=1600,
}

type SizeMap = Readonly<{ [key in keyof typeof Breakpoints]: Breakpoints }>

const sizes: SizeMap = {
  XS: Breakpoints.XS,
  SM: Breakpoints.SM,
  MD: Breakpoints.MD,
  LG: Breakpoints.LG,
  XL: Breakpoints.XL,
  XXL: Breakpoints.XXL,
  XXXL: Breakpoints.XXXL
} as const

type DeviceType = 'mobile' | 'desktop' | 'tablet' | 'MD' | 'XL' | 'SM'

type BreakpointHook = { [key in `is${Capitalize<DeviceType>}`]: boolean } & { sizes: SizeMap }

function useBreakpoints (): BreakpointHook {
  return {
    isMobile: useMediaQuery({ maxWidth: Breakpoints.XS }),
    isDesktop: useMediaQuery({ minWidth: Breakpoints.LG }),
    isTablet: useMediaQuery({ minWidth: Breakpoints.XS + 1, maxWidth: Breakpoints.MD - 1 }),
    isMD: useMediaQuery({ maxWidth: Breakpoints.MD - 1 }),
    isSM: useMediaQuery({ maxWidth: Breakpoints.SM - 1 }),
    isXL: useMediaQuery({ maxWidth: Breakpoints.XL - 1 }),
    sizes
  }
}

export { Breakpoints, useBreakpoints }

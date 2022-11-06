import { FC, ReactNode } from 'react'
import {useBreakpoints} from "../screen";

const SectionContainer: FC<{
  children?: ReactNode,
  theme?: 'default' | 'grey' | 'footer'
}> = ({children, theme = 'default'}) => {
  const backgroundColor = {
    default: '#1f1c25',
    grey: '#24202a',
    footer: '#1f1c25',
  }
  const { isMobile} = useBreakpoints()
  const padding = theme === 'footer' ? '120px 0 0' : 'auto';
  const gray = theme === 'grey' && true
  const margin = isMobile ? 20 : 80
  return (
    <div  className={`section-container`} style={{padding: padding, margin: gray ? `0 -${margin}px` : '0', background: backgroundColor[theme],  display: 'flex', justifyContent: 'center' }}>
        <div style={{width: '100%', position: 'relative', margin: gray ? '0 80px' : 0}}>
          {children}
        </div>
    </div>
  )
}

export { SectionContainer as default }
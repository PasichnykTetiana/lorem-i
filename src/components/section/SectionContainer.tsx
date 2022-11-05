import { FC, ReactNode } from 'react'

const SectionContainer: FC<{
  children?: ReactNode,
  theme?: 'default' | 'grey' | 'footer'
}> = ({children, theme = 'default'}) => {
  const backgroundColor = {
    default: '#1f1c25',
    grey: '#24202a',
    footer: '#1E1B23',
  }

  const padding = theme === 'footer' ? '120px 0 0' : 'auto';
  const margin = theme === 'grey' && true
  return (
    <div  className={`section-container`} style={{padding: padding, margin: margin ? '0 -80px' : 'auto', background: backgroundColor[theme],  display: 'flex', justifyContent: 'center' }}>
        <div style={{width: '100%', position: 'relative', margin: margin ? '0 80px' : 0}}>
          {children}
        </div>
    </div>
  )
}

export { SectionContainer as default }
import { Children, isValidElement, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { GradientCtaButton } from './GradientCtaButton'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'font-bold',
  secondary: 'font-semibold',
  outline: 'font-semibold',
  ghost: '',
}

const gradients = {
  primary: { from: '#F9A852', to: '#007B89' },
  secondary: { from: '#007B89', to: '#4DB8C4' },
  outline: { from: '#F9A852', to: '#007B89' },
  ghost: { from: '#F9A852', to: '#007B89' },
}

const sizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

function splitButtonChildren(children: ReactNode) {
  let items = Children.toArray(children).filter(
    (child) => child && !(typeof child === 'string' && child.trim().length === 0),
  )
  let icon: ReactNode
  let rightIcon: ReactNode

  if (items.length > 1 && isValidElement(items[0])) {
    icon = items[0]
    items = items.slice(1)
  }

  const lastItem = items[items.length - 1]
  if (items.length > 1 && isValidElement(lastItem)) {
    rightIcon = lastItem
    items = items.slice(0, -1)
  }

  const text = items.length === 1 ? items[0] : items

  return { icon, rightIcon, text }
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const { icon, rightIcon, text } = splitButtonChildren(children)

  return (
    <GradientCtaButton
      {...props}
      text={text}
      icon={icon}
      rightIcon={rightIcon}
      gradient={gradients[variant]}
      size={sizes[size]}
      className={`${variants[variant]} ${className}`}
      disabled={props.disabled}
    />
  )
}

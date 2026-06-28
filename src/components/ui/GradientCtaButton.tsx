import { ArrowRight } from '@phosphor-icons/react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react'

export type CtaGradient =
  | string
  | {
      from: string
      to: string
      via?: string
    }

type CtaSize = 'sm' | 'md' | 'lg'

interface GradientCtaButtonSharedProps {
  text?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  gradient?: CtaGradient
  size?: CtaSize
  className?: string
  children?: ReactNode
  disabled?: boolean
}

type GradientCtaButtonElementProps =
  | (GradientCtaButtonSharedProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'> & {
        as?: 'button'
      })
  | (GradientCtaButtonSharedProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
        as: 'a'
      })

const defaultGradient = {
  from: '#F9A852',
  to: '#007B89',
}

const sizeClasses = {
  sm: {
    root: 'min-h-[44px] min-w-[190px] py-2 text-xs',
    icon: 'left-1.5 h-9 w-9',
    label: 'tracking-[0.14em]',
    labelOffset: 'pl-14 pr-10',
    arrow: 'right-4 h-5 w-5',
  },
  md: {
    root: 'min-h-[54px] min-w-[220px] py-3 text-sm',
    icon: 'left-2 h-10 w-10',
    label: 'tracking-[0.16em]',
    labelOffset: 'pl-16 pr-12',
    arrow: 'right-5 h-5 w-5',
  },
  lg: {
    root: 'min-h-[68px] min-w-[260px] py-4 text-base',
    icon: 'left-2.5 h-12 w-12',
    label: 'tracking-[0.14em] sm:tracking-[0.18em]',
    labelOffset: 'pl-20 pr-14',
    arrow: 'right-6 h-6 w-6',
  },
}

function gradientToCss(gradient: CtaGradient = defaultGradient) {
  if (typeof gradient === 'string') return gradient

  const stops = gradient.via
    ? `${gradient.from} 0%, ${gradient.via} 50%, ${gradient.to} 100%`
    : `${gradient.from} 0%, ${gradient.to} 100%`

  return `linear-gradient(90deg, ${stops})`
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function content({
  text,
  children,
  icon,
  rightIcon,
  size,
}: Pick<
  GradientCtaButtonSharedProps,
  'text' | 'children' | 'icon' | 'rightIcon' | 'size'
>) {
  const classes = sizeClasses[size ?? 'md']
  const label = text ?? children

  return (
    <>
      <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_0_rgba(255,255,255,0.34),inset_0_-4px_0_rgba(0,0,0,0.1)]" />
      <span className="pointer-events-none absolute inset-x-6 top-1 h-px bg-white/35" />
      {icon && (
        <span
          className={cx(
            'absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#007B89] shadow-[0_7px_16px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:scale-105',
            classes.icon,
          )}
        >
          <span className="flex h-[64%] w-[64%] items-center justify-center [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full">
            {icon}
          </span>
        </span>
      )}
      <span
        className={cx(
          'relative z-10 flex w-full min-w-0 items-center justify-center overflow-hidden text-center font-bold uppercase leading-none text-white drop-shadow-sm',
          classes.label,
          icon ? classes.labelOffset : 'pl-10 pr-14',
        )}
      >
        <span className="truncate whitespace-nowrap">{label}</span>
      </span>
      <span
        className={cx(
          'absolute top-1/2 z-10 -translate-y-1/2 text-white/95 transition-transform duration-200 group-hover:translate-x-1',
          classes.arrow,
        )}
      >
        {rightIcon ?? <ArrowRight weight="bold" className="h-full w-full" />}
      </span>
    </>
  )
}

export function GradientCtaButton(props: GradientCtaButtonElementProps) {
  const {
    as = 'button',
    text,
    icon,
    rightIcon,
    gradient = defaultGradient,
    size = 'md',
    className = '',
    children,
    disabled = false,
    style,
  } = props

  const classes = cx(
    'group relative inline-flex max-w-full items-center justify-center overflow-hidden rounded-full border-0 text-white shadow-[0_12px_20px_rgba(0,123,137,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-105 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aml-blue focus-visible:ring-offset-2',
    disabled && 'pointer-events-none opacity-55 grayscale shadow-none',
    sizeClasses[size].root,
    className,
  )
  const ctaStyle = {
    ...style,
    background: gradientToCss(gradient),
  }

  if (as === 'a') {
    const {
      as: _as,
      text: _text,
      icon: _icon,
      rightIcon: _rightIcon,
      gradient: _gradient,
      size: _size,
      className: _className,
      children: _children,
      disabled: _disabled,
      style: _style,
      href,
      onClick,
      ...anchorProps
    } =
      props as Extract<GradientCtaButtonElementProps, { as: 'a' }>

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <a
        {...anchorProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        className={classes}
        style={ctaStyle}
        onClick={handleClick}
      >
        {content({ text, children, icon, rightIcon, size })}
      </a>
    )
  }

  const {
    as: _as,
    text: _text,
    icon: _icon,
    rightIcon: _rightIcon,
    gradient: _gradient,
    size: _size,
    className: _className,
    children: _children,
    disabled: _disabled,
    style: _style,
    type = 'button',
    ...buttonProps
  } =
    props as Extract<GradientCtaButtonElementProps, { as?: 'button' }>

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={classes}
      style={ctaStyle}
    >
      {content({ text, children, icon, rightIcon, size })}
    </button>
  )
}

import useMagnetic from '../hooks/useMagnetic'

export default function MagneticButton({
  as: Tag = 'a',
  href = '#',
  fill = false,
  children,
  className = '',
  strength = 0.35,
  ...rest
}) {
  const ref = useMagnetic(strength)

  return (
    <span className="magnetic-wrap">
      <Tag
        ref={ref}
        href={Tag === 'a' ? href : undefined}
        className={`btn ${fill ? 'btn-fill' : ''} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    </span>
  )
}

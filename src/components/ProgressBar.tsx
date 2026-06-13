interface Props {
  value: number
  max?: number
  variant?: 'default' | 'warn' | 'gap'
}

export function ProgressBar({ value, max = 100, variant = 'default' }: Props) {
  const pct = Math.round((value / max) * 100)
  const cls = variant === 'warn' ? 'progress-fill progress-fill-warn'
    : variant === 'gap' ? 'progress-fill progress-fill-gap'
    : 'progress-fill'
  return (
    <div className="progress-track">
      <div className={cls} style={{ width: `${pct}%` }} />
    </div>
  )
}

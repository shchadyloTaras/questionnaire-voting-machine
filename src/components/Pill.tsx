type PillVariant = 'info' | 'success' | 'warn' | 'danger' | 'neutral'

interface Props {
  variant?: PillVariant
  children: React.ReactNode
}

export function Pill({ variant = 'info', children }: Props) {
  return <span className={`pill pill-${variant}`}>{children}</span>
}

export function statusPill(status: string) {
  if (status === 'submitted') return <Pill variant="success">Complete</Pill>
  if (status === 'in_progress') return <Pill variant="warn">In progress</Pill>
  return <Pill variant="neutral">Not started</Pill>
}

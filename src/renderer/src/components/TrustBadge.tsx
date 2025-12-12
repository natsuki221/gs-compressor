import { cn } from '../lib/utils'

interface TrustBadgeProps {
    type: 'offline' | 'layout-fidelity'
    className?: string
}

export function TrustBadge({ type, className }: TrustBadgeProps) {
    const badges = {
        offline: {
            icon: '🔒',
            text: '100% Offline',
            subtitle: 'Files never leave your computer',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        'layout-fidelity': {
            icon: '✓',
            text: 'Layout Fidelity',
            subtitle: 'Zero layout shift guaranteed',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        }
    }

    const badge = badges[type]

    return (
        <div
            className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full border',
                badge.bgColor,
                badge.borderColor,
                className
            )}
        >
            <span className="text-lg">{badge.icon}</span>
            <div className="flex flex-col">
                <span className={cn('text-xs font-bold', badge.color)}>{badge.text}</span>
                <span className="text-[10px] text-slate-500">{badge.subtitle}</span>
            </div>
        </div>
    )
}

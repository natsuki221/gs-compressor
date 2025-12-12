import { useQueueStore } from '../features/queue/store/queueStore'
import { SCENARIO_PRESETS } from '@shared/types'
import { Button } from './ui/button'

export function SettingsPanel() {
    const { files, compressionMode, setCompressionMode } = useQueueStore()

    const totalSize = files.reduce((sum, f) => sum + f.size, 0)

    // Approximate compression ratios
    const ratios = { ai: 0.15, print: 0.70, transfer: 0.35 }
    const estimatedSize = totalSize * ratios[compressionMode]
    const reduction = totalSize > 0 ? ((totalSize - estimatedSize) / totalSize) * 100 : 0

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    return (
        <aside className="w-96 bg-white border-l border-slate-200 flex flex-col shrink-0 z-10 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Settings</h3>
                <p className="text-xs text-slate-500">
                    Applying to {files.length} file{files.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 space-y-6 overflow-y-auto">
                {/* Intent Cards */}
                <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">Preset Intent</label>
                    <div className="grid grid-cols-2 gap-2">
                        {SCENARIO_PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => setCompressionMode(preset.id)}
                                className={`
                  px-3 py-2 rounded-lg text-left transition-all
                  ${compressionMode === preset.id
                                        ? 'border-2 border-primary bg-primary/5'
                                        : 'border border-slate-200 hover:bg-slate-50 opacity-70'
                                    }
                `}
                                title={preset.technicalNote}
                            >
                                <div className="text-lg">{preset.icon}</div>
                                <div
                                    className={`text-[10px] font-bold ${compressionMode === preset.id ? 'text-primary' : 'text-slate-600'}`}
                                >
                                    {preset.label}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quality Slider (Placeholder) */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">Image Quality</label>
                        <span className="text-[10px] font-mono text-slate-500">
                            {compressionMode === 'ai' ? '72' : compressionMode === 'print' ? '300' : '150'} dpi
                        </span>
                    </div>
                    <input
                        type="range"
                        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
                        value={compressionMode === 'ai' ? 20 : compressionMode === 'print' ? 100 : 50}
                        disabled
                    />
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-700">Grayscale</span>
                        <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                            <div className="w-4 h-4 bg-white rounded-full shadow absolute left-0"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-700">Strip Metadata</span>
                        <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                            <div className="w-4 h-4 bg-white rounded-full shadow absolute left-0"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50">
                {files.length > 0 ? (
                    <>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-xs text-slate-500">Est. Output</span>
                            <div className="text-right">
                                <span className="block text-lg font-bold text-slate-900">{formatSize(estimatedSize)}</span>
                                <span className="text-[10px] text-green-600 font-bold">-{reduction.toFixed(0)}% ↓</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-xs text-slate-500 text-center">No files selected</p>
                )}
            </div>
        </aside>
    )
}

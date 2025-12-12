import { useQueueStore } from '../features/queue/store/queueStore'
import { FileText } from 'lucide-react'

export function PreviewPanel() {
  const files = useQueueStore((state) => state.files)
  const selectedFile = files.find((f) => f.selected) || files[0]

  if (!selectedFile) {
    return (
      <section className="flex-1 min-w-0 bg-slate-100 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-slate-400 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select a file to preview</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex-1 min-w-0 bg-slate-100 flex flex-col relative overflow-hidden">
      {/* Top Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-sm border border-slate-200 rounded-full px-3 py-1 flex items-center space-x-3 z-10">
        <span className="text-[10px] font-mono whitespace-nowrap">Page 1</span>
        <div className="w-px h-3 bg-slate-200"></div>
        <div className="flex space-x-1">
          <button className="w-5 h-5 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500">
            -
          </button>
          <button className="w-5 h-5 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500">
            +
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
        <div className="bg-white shadow-lg w-full max-w-sm aspect-[1/1.4] rounded-sm relative flex flex-col items-center justify-center">
          <FileText className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-sm font-medium text-slate-600 truncate max-w-[80%] px-4">
            {selectedFile.name}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
          </p>
          <p className="text-[10px] text-slate-400 mt-4 italic">PDF Preview coming soon</p>
        </div>
      </div>
    </section>
  )
}

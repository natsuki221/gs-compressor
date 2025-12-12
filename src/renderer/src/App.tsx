import { useState, useEffect, useCallback, useRef } from 'react'
import { AppLayout } from './layouts/AppLayout'
import { DragDropZone } from './components/DragDropZone'
import { QueueList } from './features/queue/components/QueueList'
import { useQueueStore } from './features/queue/store/queueStore'
import { QueueHeader } from './features/queue/components/QueueHeader'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PreviewPanel } from './components/PreviewPanel'
import { SettingsPanel } from './components/SettingsPanel'
import { ScrollArea } from './components/ui/scroll-area'
import { Plus } from 'lucide-react'

function App() {
  const [gsVersion, setGsVersion] = useState<string>('Checking...')
  const files = useQueueStore((state) => state.files)
  const addFiles = useQueueStore((state) => state.addFiles)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.electronAPI
      .checkGhostscript()
      .then(setGsVersion)
      .catch((err) => setGsVersion(`Error: ${err} `))
  }, [])

  const handleFilesDropped = useCallback(
    (newFiles: File[]) => {
      addFiles(newFiles)
    },
    [addFiles]
  )

  const handleAddFiles = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles)
    }
    e.target.value = ''
  }

  return (
    <ErrorBoundary>
      <AppLayout>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">
          {files.length === 0 ? (
            <div className="flex-1 p-6">
              <DragDropZone onFilesDropped={handleFilesDropped} />
            </div>
          ) : (
            <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
              {/* Left: Queue Sidebar - 使用原本的組件 */}
              <aside className="w-[420px] bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
                <QueueHeader />
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <QueueList />
                  </div>
                </ScrollArea>
                {/* Add Files Button */}
                <div className="p-4 border-t border-slate-200">
                  <button
                    onClick={handleAddFiles}
                    className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-center hover:bg-slate-100 hover:border-slate-400 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-medium text-slate-500">新增檔案</span>
                  </button>
                </div>
              </aside>

              {/* Center: Preview Panel */}
              <PreviewPanel />

              {/* Right: Settings Panel */}
              <SettingsPanel />
            </div>
          )}
        </div>
      </AppLayout>
      <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-500 bg-white/0 pointer-events-none z-50">
        Ghostscript: {gsVersion}
      </div>
    </ErrorBoundary>
  )
}

export default App

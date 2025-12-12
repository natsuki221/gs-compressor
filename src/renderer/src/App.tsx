import { useState, useEffect, useCallback } from 'react'
import { AppLayout } from './layouts/AppLayout'
import { DragDropZone } from './components/DragDropZone'
import { QueueList } from './features/queue/components/QueueList'
import { useQueueStore } from './features/queue/store/queueStore'
import { QueueHeader } from './features/queue/components/QueueHeader'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  const [gsVersion, setGsVersion] = useState<string>('Checking...')
  const files = useQueueStore((state) => state.files)
  const addFiles = useQueueStore((state) => state.addFiles)

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

  return (
    <ErrorBoundary>
      <AppLayout>
        <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">
          {files.length === 0 ? (
            <div className="flex-1 p-6">
              <DragDropZone onFilesDropped={handleFilesDropped} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0 p-6 gap-4">
              <h2 className="text-xl font-bold">Queue ({files.length})</h2>
              <div className="flex-1 min-h-0 border rounded-lg bg-card flex flex-col">
                <QueueHeader />
                <div className="flex-1 min-h-0 overflow-hidden">
                  <QueueList />
                </div>
              </div>
              <div className="h-24 shrink-0">
                <DragDropZone onFilesDropped={handleFilesDropped} compact />
              </div>
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

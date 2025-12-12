import { QueueActions } from '../features/queue/components/QueueActions'
import { useEffect } from 'react'
import { useQueueStore } from '../features/queue/store/queueStore'
import { SettingsDialog } from '../features/settings/components/SettingsDialog'
import { Toaster } from '../components/ui/sonner'

interface AppLayoutProps {
  children?: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  const addFiles = useQueueStore((state) => state.addFiles)

  // Listen for files opened from Finder
  useEffect(() => {
    const removeListener = window.electronAPI.onFileOpen(async (path) => {
      const name = path.split('/').pop() || 'unknown.pdf'
      const mockFile = {
        name,
        path,
        size: 0,
        type: 'application/pdf',
        lastModified: Date.now(),
        webkitRelativePath: '',
        arrayBuffer: async () => new ArrayBuffer(0),
        slice: () => new Blob(),
        stream: () => new ReadableStream(),
        text: async () => ''
      } as unknown as File

      addFiles([mockFile])
    })

    return () => {
      removeListener()
    }
  }, [addFiles])

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">gs-compressor</h1>
          <p className="text-sm text-muted-foreground">Local PDF Optimization</p>
        </div>
        <SettingsDialog />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>

      {/* Footer Actions */}
      <QueueActions />

      <Toaster position="top-right" />
    </div>
  )
}

import { Settings } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../components/ui/dialog'
import { Badge } from '../../../components/ui/badge'

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your compression experience</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Settings Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-slate-900">General</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Show notifications</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Check for updates</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings - Coming Soon */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Advanced Settings</h3>
              <Badge variant="secondary" className="text-xs">
                Coming Soon
              </Badge>
            </div>

            <div className="space-y-3 opacity-50 pointer-events-none">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Custom DPI</span>
                <input type="range" disabled className="w-32 h-2 bg-slate-200 rounded-lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Downsampling</span>
                <select disabled className="text-sm border rounded px-2 py-1 bg-slate-100">
                  <option>Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Color Space</span>
                <select disabled className="text-sm border rounded px-2 py-1 bg-slate-100">
                  <option>SRGB</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Metadata Handling</span>
                <select disabled className="text-sm border rounded px-2 py-1 bg-slate-100">
                  <option>Preserve</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3 italic leading-relaxed">
              Fine-grained control will be available in a future update. Star us on{' '}
              <a
                href="https://github.com/natsuki221/gs-compressor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>{' '}
              to track progress!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

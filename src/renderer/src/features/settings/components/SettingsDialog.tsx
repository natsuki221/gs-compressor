import { Settings } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '../../../components/ui/dialog'
import { toast } from 'sonner'

export function SettingsDialog() {
    const handleSave = () => {
        toast.success('Settings saved successfully')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="Settings">
                    <Settings className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure global application settings.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 text-center text-muted-foreground border-2 border-dashed rounded-md bg-muted/20">
                    <p>Advanced compression settings coming soon.</p>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

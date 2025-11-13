'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpgrade: () => void;
}

export default function UpgradeModal({ open, onOpenChange, onUpgrade }: UpgradeModalProps) {
    const features = [
        "Unlimited feedback submissions",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Export data",
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">Upgrade to Premium</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                        Unlock unlimited feedback and advanced features
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                    <div className="text-center mb-6">
                        <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">$9.99</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">per month</div>
                    </div>
                    
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 sm:gap-3">
                                <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                        className="w-full sm:w-auto border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onUpgrade} 
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                        Upgrade Now
                    </Button>
                </DialogFooter>
                
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    This is a mock upgrade. Real billing integration coming soon.
                </p>
            </DialogContent>
        </Dialog>
    )
}
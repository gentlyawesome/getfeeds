'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {MessageSquare, Star} from 'lucide-react'
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea" 

interface DialogDemoProps {
  onSubmit?: (feedback: FeedbackData) => void;
  disabled?: boolean; // Add disabled prop
}

// Define the feedback type
export type FeedbackData = {
  userName: string;
  userAvatar: string;
  rating: number;
  feedbackText: string;
  date: string;
  time: string;
}

// Add props interface for the component
interface DialogDemoProps {
  onSubmit?: (feedback: FeedbackData) => void;
}

export function DialogDemo({onSubmit, disabled = false}: DialogDemoProps) {
// useState Hooks
      const [open, setOpen] = useState(false);
      const [formData, setFormData] = useState({
        userName: '',
        rating: 0,
        feedbackText: ''
      }); //setting form data
      const [hoveredStar, setHoveredStar] = useState(0); 

      // Event Handler
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.userName && formData.rating > 0 && formData.feedbackText) {
          const now = new Date();
          const feedback:FeedbackData = {
            userName: formData.userName,
            rating: formData.rating,
            feedbackText: formData.feedbackText,
            userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.userName}`,
            date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
          };

          //Call the onSubmit callback if provided
          if(onSubmit){
            onSubmit(feedback);
          }
          //onSubmit(feedback);//this is a function call to send data to a parent component or server
          //Reset form and close dialog
          setFormData({ userName: '', rating: 0, feedbackText: '' });
          setOpen(false);
        }
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" disabled={disabled} className="w-full gap-2 px-4 py-2 text-sm font-medium shadow-sm sm:w-auto sm:text-base">
            <MessageSquare className="h-4 w-4"/>
            <span className="hidden sm:inline">Write Feedback</span>
            <span className="sm:hidden">Feedback</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[425px] border border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">Share Your Feedback</DialogTitle>
            <DialogDescription className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Tell us about your experience. Your feedback helps us improve!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2 sm:gap-3">
              <Label htmlFor="name" className="text-xs font-medium text-gray-700 dark:text-gray-200 sm:text-sm">Your Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Enter your name"
                value={formData.userName} // Pass formData as a prop to this component, then access it here.
                onChange={(e)=> setFormData({...formData, userName:e.target.value})}
                className="h-10 rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
            </div>

            <div className="grid gap-2 sm:gap-3">
              <Label className="text-xs font-medium text-gray-700 dark:text-gray-200 sm:text-sm">Rating</Label>
              <div className="flex gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="cursor-pointer rounded-full p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 dark:focus:ring-yellow-500/40"
                >
                  <Star
                    className={`h-7 w-7 sm:h-8 sm:w-8 ${
                      star <= (hoveredStar || formData.rating)
                        ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500'
                        : 'text-gray-300 dark:text-gray-700'
                    }`}
                  />
                </button>
              ))}
              </div>

              <div className="space-y-2">
            <Label htmlFor="feedback" className="text-xs font-medium text-gray-700 dark:text-gray-200 sm:text-sm">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us about your experience..."
              value={formData.feedbackText}
              onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
              className="min-h-[100px] resize-y rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus-visible:ring-offset-gray-900"
            />
            </div>
            </div>

          </div>
          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="w-full text-sm border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 sm:w-auto sm:text-base">Cancel</Button>
            </DialogClose>
            <Button 
            type="submit"
            className="w-full text-sm sm:w-auto sm:text-base"
            >Submit Feedback</Button>
          </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

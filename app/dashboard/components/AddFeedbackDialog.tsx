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

export function DialogDemo({onSubmit}: DialogDemoProps) {
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
          <Button variant="default">
            <MessageSquare className="h-4 w-4"/>
            Write Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
            Tell us about your experience. Your feedback helps us improve!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Enter your name"
                value={formData.userName} // Pass formData as a prop to this component, then access it here.
                onChange={(e)=> setFormData({...formData, userName:e.target.value})}
                />
            </div>

            <div className="grid gap-3">
              <Label>Rating</Label>
              <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredStar || formData.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              </div>

              <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us about your experience..."
              value={formData.feedbackText}
              onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
              className="min-h-[100px]"
            />
            </div>
            </div>

          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
            type="submit"
            >Submit Feedback</Button>
          </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

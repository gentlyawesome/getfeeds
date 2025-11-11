"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {DialogDemo, FeedbackData} from './AddFeedbackDialog';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type FeedbackCardProps = {
  userName: string;
  userAvatar: string;
  rating: number;
  feedbackText: string;
  date: string;
  time: string;
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({ userName, userAvatar, rating, feedbackText, date, time }) => {
  
    // Generate initials from user name
  const initials = userName
  .split(' ')
  .map((n: string) => n[0])
  .join('')
  .toUpperCase();

    return (
    <Card className='w-full max-w-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Title, avatar and star */}
          <div className='flex items-center gap-3 sm:gap-4'>
            <Avatar className='h-10 w-10 sm:h-12 sm:w-12'>
                <AvatarImage src={userAvatar} alt={userName}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">{userName}</h3>
              <div className='mt-1 flex flex-wrap items-center gap-1 text-xs text-gray-600 dark:text-gray-300 sm:text-sm'>
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span>({rating}/5)</span>
              </div>
            </div>
          </div>
          {/* Date and time */}
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:flex-col sm:items-end sm:text-right sm:text-sm'>
            <span className='font-medium whitespace-nowrap'>{date}</span>
            <span className='text-gray-400 dark:text-gray-600 sm:hidden'>•</span>
            <span className='whitespace-nowrap'>{time}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base'>{feedbackText}</p>
      </CardContent>
    </Card>
  )
}

export default function FeedbackCardDemo() {
      // const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([
      //   {
      //     userName:"Sarah Johnson",
      //     userAvatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      //     rating:5,
      //     feedbackText:"Absolutely fantastic experience! The service exceeded my expectations. The team was professional, responsive, and delivered exactly what I needed. Highly recommend to anyone looking for quality work.",
      //     date:"Nov 5, 2025",
      //     time:"2:30 PM"
      //   },
      //   {
      //     userName: "Michael Chen",
      //     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      //     rating: 4,
      //     feedbackText: "Great overall experience. The product quality is excellent and the customer support was very helpful. Only minor issue was the delivery took a bit longer than expected, but worth the wait!",
      //     date: "Nov 4, 2025",
      //     time: "10:15 AM"
      //   },
      //   {
      //     userName: "Emily Rodriguez",
      //     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      //     rating: 5,
      //     feedbackText: "I'm thoroughly impressed! From start to finish, everything was seamless. The attention to detail and commitment to customer satisfaction really shows. Will definitely be coming back.",
      //     date: "Nov 3, 2025",
      //     time: "4:45 PM"
      //   }
      // ]);

      // // Handler function to add new feedback
      // const handleAddFeedback = (newFeedback: FeedbackData)=>{
      //   // Add new feedback to the beginning of the array (most recent first)
      //   setFeedbacks((prevFeedbacks)=>[newFeedback, ...prevFeedbacks]);
      // }

      const feedbacks = useQuery(api.feedback.list) ?? [];
      const createFeedback = useMutation(api.feedback.create);
    
      const handleAddFeedback = async (newFeedback: FeedbackData) => {
        await createFeedback(newFeedback);
      };

      return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 dark:from-gray-950 dark:to-gray-900">
          <div className="mx-auto max-w-4xl">
            <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='text-center sm:text-left'>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl'>Feedback Dashboard</h1>
                <p className='text-sm text-gray-700 dark:text-gray-300 sm:text-base'>See what people are saying</p>
              </div>
              {/* Pass the onsubmit callback to DialogDemo */}
              <div className='flex w-full justify-center sm:w-auto sm:justify-end'>
                <DialogDemo onSubmit={handleAddFeedback}/>
              </div>
            </div>
            {/* Cards Here */}
            <div className='space-y-4'>
              {/* {feedbacks.map((feedback, index) => (
                <FeedbackCard 
                  key={`${feedback.userName}-${feedback.date}-${feedback.time}-${index}`}
                  userName={feedback.userName}
                  userAvatar={feedback.userAvatar}
                  rating={feedback.rating}
                  feedbackText={feedback.feedbackText}
                  date={feedback.date}
                  time={feedback.time}       
                />
              ))} */}
               {feedbacks.map(({ _id, ...feedback }) => (
                <FeedbackCard
                  key={_id}
                  {...feedback}
                />
              ))}

            </div>
          </div>
        </div>
      )
}
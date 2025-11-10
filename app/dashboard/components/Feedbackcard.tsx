"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {DialogDemo, FeedbackData} from './AddFeedbackDialog';

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
    <Card className='max-w-2xl'>
      <CardHeader>
        <div className="flex items-start justify-between">
          {/* Title, avatar and star */}
          <div className='flex items-center gap-3'>
            <Avatar>
                <AvatarImage src={userAvatar} alt={userName}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
              <div className='flex items-center gap-1 mt-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span>({rating}/5)</span>
              </div>
            </div>
          </div>
          {/* Date and time */}
          <div className='text-right text-sm text-gray-500'>
            <div className='font-medium'>{date}</div>
            <div>{time}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-base text-gray-700 leading-relaxed'>{feedbackText}</p>
      </CardContent>
    </Card>
  )
}

export default function FeedbackCardDemo() {
      const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([
        {
          userName:"Sarah Johnson",
          userAvatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          rating:5,
          feedbackText:"Absolutely fantastic experience! The service exceeded my expectations. The team was professional, responsive, and delivered exactly what I needed. Highly recommend to anyone looking for quality work.",
          date:"Nov 5, 2025",
          time:"2:30 PM"
        },
        {
          userName: "Michael Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          rating: 4,
          feedbackText: "Great overall experience. The product quality is excellent and the customer support was very helpful. Only minor issue was the delivery took a bit longer than expected, but worth the wait!",
          date: "Nov 4, 2025",
          time: "10:15 AM"
        },
        {
          userName: "Emily Rodriguez",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
          rating: 5,
          feedbackText: "I'm thoroughly impressed! From start to finish, everything was seamless. The attention to detail and commitment to customer satisfaction really shows. Will definitely be coming back.",
          date: "Nov 3, 2025",
          time: "4:45 PM"
        }
      ]);

      // Handler function to add new feedback
      const handleAddFeedback = (newFeedback: FeedbackData)=>{
        // Add new feedback to the beginning of the array (most recent first)
        setFeedbacks((prevFeedbacks)=>[newFeedback, ...prevFeedbacks]);
      }

      return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 ">
          <div className="max-w-4xl mx-auto">
            <div className='flex items-center justify-between mb-8'>

              <div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Feedback Dashboard</h1>
                <p className='text-gray-800'>See what people are saying</p>
              </div>
              {/* Pass the onsubmit callback to DialogDemo */}
              <DialogDemo onSubmit={handleAddFeedback}/>
            </div>
            {/* Cards Here */}
            <div className='space-y-4'>
              {feedbacks.map((feedback, index) => (
                <FeedbackCard 
                  key={`${feedback.userName}-${feedback.date}-${feedback.time}-${index}`}
                  userName={feedback.userName}
                  userAvatar={feedback.userAvatar}
                  rating={feedback.rating}
                  feedbackText={feedback.feedbackText}
                  date={feedback.date}
                  time={feedback.time}       
                />
              ))}
            </div>
          </div>
        </div>
      )
}
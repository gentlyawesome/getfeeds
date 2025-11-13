"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {DialogDemo, FeedbackData} from './AddFeedbackDialog';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Crown, Zap, ArrowDown } from 'lucide-react';
import UpgradeModal from './UpgradeModal';

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
    <Card className='w-full max-w-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Title, avatar and star */}
          <div className='flex items-start gap-3 sm:gap-4'>
            <Avatar className='h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12'>
                <AvatarImage src={userAvatar} alt={userName}/>
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 sm:text-base md:text-lg break-words">{userName}</h3>
              <div className='mt-1 flex flex-wrap items-center gap-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500'
                        : 'text-gray-300 dark:text-gray-700'
                    }`}
                  />
                ))}
                <span className="ml-0.5">({rating}/5)</span>
              </div>
            </div>
          </div>
          {/* Date and time */}
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:flex-col sm:items-end sm:text-right sm:text-sm sm:ml-4'>
            <span className='font-medium whitespace-nowrap'>{date}</span>
            <span className='text-gray-400 dark:text-gray-600 sm:hidden'>•</span>
            <span className='whitespace-nowrap'>{time}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className='text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base break-words'>{feedbackText}</p>
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

      // const feedbacks = useQuery(api.feedback.list) ?? [];

      const feedbackData = useQuery(api.feedback.getUserFeedback);
      const createFeedback = useMutation(api.feedback.create);
      const planInfo = useQuery(api.billing.getPlanInfo);
      const upgradeToPremium = useMutation(api.billing.upgradeToPremium);
      const downgradeToFree = useMutation(api.billing.downgradeToFree);
    
      const handleAddFeedback = async (newFeedback: FeedbackData) => {
        try{
          await createFeedback(newFeedback);
        } catch (error:any) {
          //show error if limit reached
          if (error.message?.includes("limit reached")) {
            alert(error.message)
          } else {
            throw error;
          }
        }
      };

      const handleUpgrade = async ()=> {
        try{
          await upgradeToPremium();
          alert("Upgraded to Premium! You can now receive unlimited feedback");
        } catch {
          console.error("Upgrade failed:");
          alert("Upgrade failed. Please try again");
        }
      };

      const handleDowngrade = async () => {
        try {
          await downgradeToFree();
          alert("Downgraded to Free Plan. You can now test the free plan limits.");
        } catch {
          console.error("Downgrade failed:");
          alert("Downgrade failed. Please try again");
        }
      };

      if (!feedbackData || !planInfo) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading...</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait</p>
            </div>
          </div>
        );
    }

    const { feedbacks, count, limit, plan, canReceiveMore } = feedbackData;
    const isFreePlan = plan === "free";

      return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-950 dark:to-gray-900 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 sm:text-3xl'>Feedback Dashboard</h1>
                <p className='text-sm text-gray-600 dark:text-gray-400 sm:text-base'>See what people are saying</p>
              </div>
              <DialogDemo 
                onSubmit={handleAddFeedback}
                disabled={!canReceiveMore}
              />
            </div>

            {/* Plan Status Card */}
            <Card className="mb-4 sm:mb-6 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {isFreePlan ? (
                      <>
                        <Zap className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Free Plan</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                            {count} / {limit} feedbacks received
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Premium Plan</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                            {count} feedbacks received (unlimited)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    {isFreePlan ? (
                      <Button 
                        onClick={handleUpgrade}
                        variant={!canReceiveMore ? "default" : "outline"}
                        className={`w-full sm:w-auto text-sm sm:text-base ${!canReceiveMore ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}`}
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Upgrade to Premium</span>
                        <span className="sm:hidden">Upgrade</span>
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleDowngrade}
                        variant="outline"
                        className="w-full sm:w-auto border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:border-orange-600"
                      >
                        <ArrowDown className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Back to Basic</span>
                        <span className="sm:hidden">Downgrade</span>
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar for Free Plan */}
                {isFreePlan && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1 sm:text-sm">
                      <span>Usage</span>
                      <span>{Math.round((count / limit) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          count >= limit 
                            ? "bg-red-500 dark:bg-red-600" 
                            : count >= limit * 0.8 
                            ? "bg-yellow-500 dark:bg-yellow-600" 
                            : "bg-green-500 dark:bg-green-600"
                        }`}
                        style={{ width: `${Math.min((count / limit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Limit Reached Alert */}
            {!canReceiveMore && isFreePlan && (
              <Alert className="mb-4 sm:mb-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertTitle className="text-red-800 dark:text-red-200">Feedback Limit Reached</AlertTitle>
                <AlertDescription className="text-sm text-red-700 dark:text-red-300">
                  You've reached your free plan limit of {limit} feedbacks. Upgrade to Premium to receive unlimited feedback!
                </AlertDescription>
              </Alert>
            )}

            {/* Feedback Cards */}
            <div className='space-y-3 sm:space-y-4'>
              {feedbacks.length === 0 ? (
                <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <CardContent className="pt-6 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                    No feedback yet. Share your link to start receiving feedback!
                  </CardContent>
                </Card>
              ) : (
                feedbacks.map(({ _id, ...feedback }) => (
                  <FeedbackCard
                    key={_id}
                    {...feedback}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )
}
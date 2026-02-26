"use client";

import { Star, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ReviewSectionProps {
  productName: string;
  rating: number;
  reviewsCount: number;
}

// Dummy reviews data for the UI requirements
const DUMMY_REVIEWS = [
  {
    id: 1,
    author: "Alex Morgan",
    rating: 5,
    date: "February 24, 2026",
    title: "Absolutely fantastic product!",
    content: "I've been using this for a week now and it exceeded all my expectations. The build quality is premium, and it performs exactly as advertised. Highly recommended!",
    helpful: 12,
  },
  {
    id: 2,
    author: "Jordan Lee",
    rating: 4,
    date: "February 15, 2026",
    title: "Great, but slightly pricey",
    content: "Overall a really solid device. The features are top-notch and the battery life is surprisingly good. Giving it 4 stars only because the price point is a bit steep compared to alternatives.",
    helpful: 8,
  },
  {
    id: 3,
    author: "Sam Taylor",
    rating: 5,
    date: "January 30, 2026",
    title: "Exactly what I was looking for",
    content: "Fast shipping and the product arrived in perfect condition. It pairs seamlessly with my other devices. I couldn't be happier with this purchase.",
    helpful: 5,
  }
];

export function ReviewSection({ productName, rating, reviewsCount }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-end gap-3 mb-4">
              <span className="text-5xl font-black text-slate-900 dark:text-white">{rating.toFixed(1)}</span>
              <span className="text-lg text-slate-500 mb-1">/ 5</span>
            </div>
            
            <div className="flex text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(rating) ? "fill-current" : "text-slate-300 dark:text-slate-700"}
                />
              ))}
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Based on {reviewsCount} reviews
            </p>

            <button 
              onClick={() => setShowForm(!showForm)}
              className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {showForm && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-4 fade-in duration-300">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Review {productName}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                  <div className="flex text-slate-300 dark:text-slate-700 gap-1 cursor-pointer">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} className="hover:text-amber-400 hover:fill-amber-400 transition-colors" />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Summarize your experience" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Review</label>
                  <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="What did you like or dislike?"></textarea>
                </div>
                <button 
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {DUMMY_REVIEWS.map((review) => (
            <div key={review.id} className="border-b border-slate-200 dark:border-slate-800 pb-8 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{review.author}</span>
                    <span className="text-xs text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">Verified Buyer</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-current" : "text-slate-300 dark:text-slate-700"}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">{review.date}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{review.title}</h4>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{review.content}</p>
              
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <ThumbsUp size={16} />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

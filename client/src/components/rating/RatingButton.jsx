'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useMe } from '@/hooks/useMe'
import PropTypes from 'prop-types'

const  RatingButton = ({ avgStart, idPost }) =>{
  const [isOpen, setIsOpen] = useState(false)
  const [personalRating, setPersonalRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [ratings, setRatings] = useState([])
  const { me } = useMe()

  const handleStarClick = (rating) => {
    setPersonalRating(rating)
  }

  const handleStarHover = (rating) => {
    setHoverRating(rating)
  }

  const handleSubmitRating = async () => {
    // Implement the API call to submit the rating
    // You can use the createRating function from your API
    // After successful submission, fetch the updated ratings
    await fetchRatings()
  }

  const fetchRatings = async () => {
    try {
      const response = await fetch(`/api/ratings/${idPost}`)
      if (response.ok) {
        const data = await response.json()
        setRatings(data)
      }
    } catch (error) {
      console.error('Error fetching ratings:', error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex-1 relative">
          <Star size={20} className="relative" />
          <span className="absolute inset-0 text-xs font-bold">{avgStart.toFixed(1)}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center">
            <Star size={24} className="mr-2" />
            <span>{avgStart.toFixed(1)}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={me?.avatar} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    fill={(hoverRating || personalRating) >= star ? 'gold' : 'none'}
                    stroke={(hoverRating || personalRating) >= star ? 'gold' : 'currentColor'}
                    className="cursor-pointer"
                  />
                ))}
              </div>
              <Textarea
                placeholder="Viết nhận xét của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleSubmitRating}>Gửi nhận xét</Button>
            </div>
          </div>
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={rating.user.avatar} />
                  <AvatarFallback>{rating.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{rating.user.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={rating.start >= star ? 'gold' : 'none'}
                          stroke={rating.start >= star ? 'gold' : 'currentColor'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{rating.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default RatingButton
RatingButton.propTypes={
    avgStart: PropTypes.string.isRequired,
    idPost: PropTypes.number.isRequired,
}
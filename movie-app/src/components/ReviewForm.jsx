import React from 'react'
export default function ReviewForm({
  myReview,
  rating,
  setRating,
  Number,
  r,
  comment,
  setComment,
  handleSubmitReview,
  handleDeleteReview,
}) {
  return (
    <div className='mt-8 border-t pt-6'>
      <h2 className='text-lg font-semibold mb-2'>
        {myReview ? '✏️ Edit Your Review' : '📝 Leave a Review'}
      </h2>

      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4'>
        <label className='text-sm font-medium'>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className='border px-2 py-1 rounded'
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='w-full border px-3 py-2 rounded mb-4'
        placeholder='Write your thoughts about this movie...'
      />

      <div className='flex gap-2'>
        <button
          onClick={handleSubmitReview}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          {myReview ? 'Update Review' : 'Submit Review'}
        </button>
        {myReview && (
          <button
            onClick={handleDeleteReview}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          >
            Delete Review
          </button>
        )}
      </div>
    </div>
  )
}

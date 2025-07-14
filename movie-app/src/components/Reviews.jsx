export default function Reviews(props) {
  return (
    <div className='mt-8'>
      <h2 className='text-lg font-semibold mb-4'>💬 Reviews</h2>

      {props.reviews.length === 0 ? (
        <p className='text-gray-500'>No reviews yet.</p>
      ) : (
        <div className='space-y-6'>
          {props.reviews.map((r) => (
            <div
              key={r._id}
              className='bg-gray-100 dark:bg-gray-800 p-4 rounded shadow'
            >
              <div className='flex justify-between items-center mb-1'>
                <span className='font-bold'>{r.user.name}</span>
                <span className='text-sm text-yellow-600'>
                  {'⭐'.repeat(r.rating)}
                </span>
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-200'>
                {r.comment}
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

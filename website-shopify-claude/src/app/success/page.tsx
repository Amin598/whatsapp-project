export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <div>
          <h1 className="text-3xl font-bold text-green-600">Shop Connected!</h1>
          <p className="mt-4 text-gray-600">Your shop has been successfully connected</p>
          <p className="mt-2 text-sm text-gray-500">Currently building...</p>
        </div>
      </div>
    </div>
  )
}
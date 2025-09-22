export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Connect to Shopify</h1>
          <p className="mt-2 text-gray-600">Enter your Shopify store domain to get started</p>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="shop-domain" className="block text-sm font-medium text-gray-700">
              Your Shopify Store
            </label>
            <div className="mt-1">
              <input
                id="shop-domain"
                name="shop"
                type="text"
                required
                placeholder="yourstore.myshopify.com"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Connect to Shopify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

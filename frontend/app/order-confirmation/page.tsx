export default function OrderConfirmationPage() {
    return (
      <div className="max-w-md mx-auto p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <p>You’ll receive a confirmation email shortly.</p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Continue Shopping
        </a>
      </div>
    );
  }
  
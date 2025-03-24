const PaymentMethod = ({ ErrorMessage, Field }) => {
  return (
    <div className="space-y-4 border border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
        <ErrorMessage
          name="paymentMethod"
          component="p"
          className="text-red-500 bg-red-200 px-2 rounded text-sm"
        />
      </div>
      <div className="space-y-4">
        {/* Instant Payment */}

        <div className="flex items-center gap-4">
          <Field
            type="radio"
            id="instantPayment"
            name="paymentMethod"
            value="instantPayment"
            className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded-full accent-gray-900"
          />
          <label
            htmlFor="instantPayment"
            className="text-base font-medium text-gray-900"
          >
            Instant Payment
          </label>
        </div>

        {/* Cash Order */}
        <div className="flex items-center gap-4">
          <Field
            type="radio"
            id="cashOrder"
            name="paymentMethod"
            value="cashOrder"
            className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded-full accent-gray-900"
          />
          <label
            htmlFor="cashOrder"
            className="text-base font-medium text-gray-900"
          >
            Cash Order
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

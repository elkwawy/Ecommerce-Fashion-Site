import { Link } from "react-router-dom";

function Order({ product }) {
  return (
    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
      <Link to={`/product/${product._id}`} className="shrink-0 md:order-1">
        <img className="h-25 w-16" src={product.image} alt="imaige" />
      </Link>

      <div class="flex items-center justify-between md:order-3 md:justify-end">
        <div class="text-end md:order-4 md:w-32">
          <p class="text-base font-bold text-gray-900 ">
            ${product.price * product.quantity}
          </p>
        </div>
      </div>

      <div class="w-full flex-1 space-y-2 md:order-2 ">
        <h1
          href="#"
          className="text-base font-medium text-gray-900 hover:underline"
        >
          {product.name}
        </h1>

        <h1 href="#" className="text-base font-medium text-gray-900">
          x{product.quantity}
        </h1>
      </div>
    </div>
  );
}

export default Order;

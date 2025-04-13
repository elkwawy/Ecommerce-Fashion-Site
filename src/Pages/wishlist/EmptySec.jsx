import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function EmptySec() {
  return (
    <section className="">
    <div className="w-[90%] m-auto">
    <div className="border-b-2 pb-4 pt-4 flex justify-between items-center">
                <h3 className="text-lg md:text-2xl font-bold text-nowrap">
                  My Wishlist
                </h3>
              </div>
      <div className="flex flex-col justify-center items-center text-center min-h-[85vh]">
        <FaRegHeart className="text-4xl mb-4" />
        <p className="font-bold">It is empty here</p>
        <p className="text-sm mb-4 font-bold">
          Personalize your shopping experience with your wishlist
        </p>
        <Link
          to="/"
          className="w-fit bg-black text-white py-2 px-6 rounded"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  </section>
  )
}

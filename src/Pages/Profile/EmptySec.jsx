import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";

export default function EmptySec() {
  return (
      <section className="">
         <div className="w-[90%] m-auto">
           <div className="flex flex-col justify-center items-center text-center min-h-[70vh] w-full">
             <MdOutlineShoppingCart className="text-4xl mb-4" />
             <p className="font-bold">It is empty here</p>
             <p className="text-sm mb-4 font-bold">
             Your orders list is empty. Start shopping and add your favorites!
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

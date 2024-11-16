import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Wishlistcard from '../../components/whishlistcard/Wishlistcard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWhishList } from '../../Redux Toolkit/slices/WishlistSlice'


export default function Wishlist() {

  const {isLoading ,isError,whishListItems} = useSelector((state) => state.wishListSlice)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getUserWhishList())
 },[dispatch])


    return <>

{Array.isArray(whishListItems) && whishListItems.length > 0 ?  <section className='pb-8'>
 <div className='w-[90%] m-auto'>
 <div className='border-b-2 pb-4 pt-4 flex justify-between items-center'>
 <h3 className='text-lg md:text-2xl  font-bold text-nowrap '>My Wishlist</h3>
 <button className='texl-sm text-nowrap border-2 rounded px-4 py-2 md:px-6 '>sort by <span className='font-bold'> newest <IoIosArrowDown className='inline' /></span></button>
 </div>

 <div className='grid grid-cols-12 my-14 gap-4'>
  {whishListItems.map((item)=> (
    <div className='col-span-12 md:col-span-6' >
     <h2>products</h2>
    </div>
  ))
}           
</div>

<div className='border-y-2 py-2'>
<div className='flex justify-between items-center w-[25%] md:w-[15%] lg:w-[8%] ml-auto'>
<IoIosArrowBack />
    <p>1 of 1</p>
    <IoIosArrowForward />
</div>
</div>

 </div>

  </section>
   : ( <section className=' '>
    <div className='w-[90%] m-auto'>
    <h3 className='text-2xl font-bold border-b-2 pb-4 pt-6'>My Wishlist</h3>
      <div className=' flex flex-col justify-center items-center w-[38.1875 rem] text-center min-h-screen'>
      <FaRegHeart className='text-4xl mb-4' />
      
          <p className='font-bold'>it is empty here </p>
          <p className='text-sm mb-4 font-bold '>personalize your shoping experience with your wishlist</p>
          <Link to="/" className='w-[21.125 rem] bg-black text-white py-2 px-6 rounded '>COUNTUE SHOPPING</Link>
      </div>
    </div>
  
    </section>)}

 
 

 
  </>
}

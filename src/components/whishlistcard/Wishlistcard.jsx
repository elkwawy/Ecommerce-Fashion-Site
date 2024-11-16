import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import Cookies from "js-cookie";
import axios from 'axios';


export default function Wishlistcard() {
 


  const id = "671cd85a0c61779fcc6dd4f5"

  async function removeItemsFromWishlist({id}){
    try{
      let options = {
        method: 'DELETE',
        url: `https://ecommerce-dot-code.vercel.app/api/wishlist/${id}`,
        headers: {
          'Authorization': Cookies.get("token") ,
        },
      }
       const {data} = await axios.request(options)
        
       
    }catch(error){
      console.log(error.message);
      
    }
  }



  return <>
  <div>
    <div className='rounded-xl overflow-hidden relative'>
        <div className='absolute top-2 right-2 p-2 w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center'>
        <FaHeart className='w-[30px] h-[26px]'/>
        </div>
        <img src='/heroSlider/men.png' 
        alt='img'  className='w-full  object-cover'/>
    </div>
    <div className='my-4 font-bold'>
    <h3 className='text-lg'>Lorem ipsum dolor sit amet.</h3>
    <p className=''> $ 160 </p>
    </div>

    <div className='flex justify-between items-center w-[176px]'>
  <div className='w-[32px] h-[32px] rounded-full overflow-hidden '>
  <img src='/heroSlider/men.png'
    alt='img' className='w-full  h-full' />
  </div> 

  <div className='w-[32px] h-[32px] rounded-full overflow-hidden '>
  <img src='/heroSlider/men.png'
    alt='img' className='w-full h-full ' />
  </div>
  <div className='w-[32px] h-[32px] rounded-full overflow-hidden '>
  <img src='/heroSlider/men.png'
    alt='img' className='w-full  h-full' />
  </div>
  <div className='w-[32px] h-[32px] rounded-full overflow-hidden '>
  <img src='/heroSlider/men.png'
    alt='img' className='w-full  h-full' />
  </div>
  <button onClick={()=>{removeItemsFromWishlist({id:id})}}>delete</button>
    </div>
  </div>
  </>
}

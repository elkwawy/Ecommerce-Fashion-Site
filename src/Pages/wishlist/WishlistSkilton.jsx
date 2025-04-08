import React from 'react'
import CustomSkeleton from '../../utilities/CustomSkeleton'

export default function WishlistSkilton() {
    return (
        <div className="w-[90%]  m-auto">
            <div className="border-b-2 pb-4 pt-4 flex justify-between items-center">
                <h3 className="text-lg md:text-2xl font-bold text-nowrap">
                  My Wishlist
                </h3>
              </div>
          <div className="grid grid-cols-1 max-[770px]:grid-cols-2 max-[460px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 my-6 gap-4">
            {[...Array(4)].map((_, index) => (
              <div className="bg-white" key={index}>
                <div className="relative">
                  <div className="absolute top-2 right-2 p-2 w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center">
                    <CustomSkeleton width={"25px"} height={"25px"} />
                  </div>
                  <div className="relative">
                    <CustomSkeleton width={"100%"} height={"350px"} />
                    <div className="w-full h-full flex justify-center gap-4 items-end absolute bottom-2 opacity-0 hover:opacity-100 transition-all duration-300">
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <div className="my-2 font-bold">
                    <CustomSkeleton width={"120px"} height={"20px"} />
                    <p className="my-2">
                     <CustomSkeleton width={"60px"} height={"20px"} />
                    </p>
                  </div>
                  <div className="flex gap-2 justify-start">
                    <CustomSkeleton width={"24px"} height={"24px"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
}
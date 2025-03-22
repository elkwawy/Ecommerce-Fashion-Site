import { Img } from 'react-image';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomSkeleton from '../../../utilities/CustomSkeleton';

const SeasonCollection = () => {
    const {categories, status, error} = useSelector((state) => state.categories);
    return (
        <div className='spaceT w-full mb-20'>
            <div className='spaceX bg-[#f8f8f8] p-0 sm:p-3 lg:p-6 sm:rounded-md flex flex-col gap-5'>
                <div className='w-full px-2 sm:px-0 flex justify-between items-center'>
                    <h2 className='text-[16px] sm:text-xl font-semibold'>Season Collection</h2>
                </div>

                {/* DIV OF API DATA */}
                {status === "succeeded" &&  <div className='overflow-x-scroll scrollbar [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-md scrollbar-track-none scrollbar-thumb-[#d3d3d3]  lg:overflow-y-hidden overflow-y-hidden flex justify-center items-center gap-0 sm:gap-14 md:gap-10 lg:gap-44 w-full'>
                    {
                        categories && categories.map((coll) => (
                            <Link state={{categoryId: coll._id}} to={`${coll.slug}/all`} key={coll._id} className='min-w-[120px] md:w-fit trans hover:scale-105 py-2 rounded-md cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-4'>
                                <div className='rounded-full min-w-[100px] max-w-[100px] sm:min-w-[120px] sm:max-w-[120px] md:min-w-[200px] md:max-w-[200px] h-[100px] sm:h-[120px] md:max-h-[200px] md:min-h-[200px] trans'>
                                    <Img src={coll.image} className={' object-cover rounded-full h-full w-full'} alt={`${coll.name} Category`} loader={<CustomSkeleton className='w-[100px] sm:w-[120px] md:w-[200px] relative h-[100px] sm:h-[120px] md:h-[200px] rounded-full flex items-center justify-center ' />}  />
                                </div>
                                <div className='flex flex-col gap-0.5 items-center'>
                                    <h2 className='text-[16px] sm:text-lg font-semibold'>{coll.name}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>}

                {
                    status === "failed" && <p>{error}</p>
                }
                {status === "loading" && (
                    <div className="flex justify-center items-center gap-0 sm:gap-14 md:gap-10 lg:gap-44 w-full">
                        {[0, 1, 2].map((_, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                {/* Image Skeleton */}
                                <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[200px] md:h-[200px] rounded-full">
                                    <CustomSkeleton borderRadius="100%" width="100%" height="100%"  />
                                </div>
                                {/* Text Skeletons */}
                                <CustomSkeleton width="70px" height={7} />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default SeasonCollection
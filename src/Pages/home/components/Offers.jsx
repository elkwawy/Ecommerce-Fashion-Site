import { Link } from "react-router-dom";

function Offers() {
  let offers = [
    {
      to: "women/671b97d621701e59f131cfcb",
      title: "Shirts",
      img: require("../../../assets/images/shirts.png"),
    },
    {
      to: "men/671ba108dd7d1a6b55a1b8e5",
      title: "Coats",
      img: require("../../../assets/images/coats.png"),
    },
    {
      to: "children/671ba150dd7d1a6b55a1b8f5",
      title: "Babies",
      img: require("../../../assets/images/baby2.png"),
    },
  ];
  return (
    <div className="offers py-10  container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
      {offers.map((offer, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 max-md:gap-6  bg-[#E8E5E9] rounded-lg h-[207px] "
        >
          <div className="flex flex-col items-start gap-3 pl-6 ">
            <span className="text-[#222222] font-[600] text-[38px]  max-sm:text-[25px]">
              {offer.title}
            </span>
            <Link to={offer.to}>
              <button
                to={offer.to}
                className="font-[700] text-[14px] text-white bg-[#222222] trans hover:bg-[#000000] hover:ml-2 w-[100px] h-[38px] rounded-md max-sm:w-[100px] max-sm:text-[14px]"
              >
                Shop Now
              </button>
            </Link>
          </div>
          <img src={offer.img} className="pr-3 w-[220px] overflow-hidden" alt="" />
        </div>
      ))}
    </div>
  );
}

export default Offers;

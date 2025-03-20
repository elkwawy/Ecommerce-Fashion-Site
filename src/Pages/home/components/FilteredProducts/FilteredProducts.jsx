import { useState } from "react";
import BestSeller from "./BestSeller";
import NewArrivals from "./NewArrivals";
import OnSale from "./OnSale";
const FilteredProducts = () => {
  const [activeTab, setActiveTab] = useState("new-arrivals");
  const taps = [
    {
      name: "New Arrivals",
      slug: "new-arrivals",
      component: <NewArrivals />,
    },
    {
      name: "Best Seller",
      slug: "best-seller",
      component: <BestSeller />,
    },
    {
      name: "On Sale",
      slug: "on-sale",
      component: <OnSale />,
    },
  ];
  return (
    <>
      <div className="flex justify-center mt-10 mb-[-15px] max-sm:gap-4 items-center gap-8  text-[30px] max-sm:text-[24px] ax-[400px]:text-[20px] font-[500]">
        {taps.map((tap) => (
          <button
            key={tap.slug}
            onClick={() => setActiveTab(tap.slug)}
            className={`${
              activeTab === tap.slug
                ? "text-[#222222]"
                : "text-gray-400 hover:text-[#222222]  trans"
            }`}
          >
            {tap.name}
          </button>
        ))}
      </div>

      {taps.find((tap) => tap.slug === activeTab).component}
    </>
  );
};

export default FilteredProducts;

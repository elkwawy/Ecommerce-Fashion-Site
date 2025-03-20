import Brands from "./components/Brands";
import HeroSlider from "./components/HeroSlider";
import Offers from "./components/Offers";
import SeasonCollection from "./components/SeasonCollection";
import { memo } from "react";
import FilteredProducts from "./components/FilteredProducts/FilteredProducts";
const Home = memo(() => {
  return (
    <div className="home">
      <HeroSlider />
      <SeasonCollection />
      <FilteredProducts />
      <Offers />
    </div>
  );
});

export default Home;

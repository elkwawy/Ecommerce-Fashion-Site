import Brands from "./components/Brands";
import HeroSlider from "./components/HeroSlider";
import Offers from "./components/Offers";
import SeasonCollection from "./components/SeasonCollection";
import { memo } from "react";
import FilteredProducts from "./components/FilteredProducts/FilteredProducts";
import { Helmet } from "react-helmet-async";
const Home = memo(() => {
  return (
    <div className="home">
     < Helmet>
          <title>Home</title>
          <meta name="description" content="This is the home page." />
        </Helmet>
      <HeroSlider />
      <SeasonCollection />
      <FilteredProducts />
      <Offers />
    </div>
  );
});

export default Home;

import { BannerSlider } from "@/components/layouts";
import { Search } from "@/components/searchs";

const Homepage = () => {
  return (
    <div className=" relative  overflow-hidden">
      <BannerSlider />
      <div>
        <Search />
      </div>
    </div>
  );
};

export default Homepage;

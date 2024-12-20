import { Footer } from "@/components/footer";
import { BannerSlider } from "@/components/layouts";
import { Search } from "@/components/searchs";
import { SectionChooseUs, SectionFeaturedProperties, SectionSearchArea, Services } from "@/components/sectionHomepage";

const Homepage = () => {
  return (
    <div className=" relative bg-slate-100  ">
      <BannerSlider />
      <div className="px-48">
      <Search />
      <SectionFeaturedProperties/>
      <SectionSearchArea/>
      <Services/>
      <SectionChooseUs/>
      </div>
      {/* <div className="w-full h-[600px]"></div> */}
      <Footer/>
    </div>
  );
};

export default Homepage;

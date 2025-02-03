import slider1 from './../../assets/images/slider-image-1.jpeg'
import slider2 from './../../assets/images/slider-image-2.jpeg'
import img1 from './../../assets/images/grocery-banner-2.jpeg'
import img2 from './../../assets/images/grocery-banner.png'
import Slider from "react-slick";
function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: i => (
      <div
        className='mt-3 rounded-full bg-[#0000007c] w-[8px] h-[5px]'
      >
        <div className='hidden'>
          {i + ""}
        </div>
      </div>
    ),
    appendDots: dots => (
      <div>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    
  };
  return (

    <div className="py-7 mb-5">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full my-6 md:my-0 md:w-2/3">
          <Slider {...settings}>
            <div>
              <img src={slider1} className='w-full h-[500px]' alt="" />
            </div>
            <div>
              <img src={slider2} className='w-full h-[500px]' alt="" />
            </div>
          </Slider>
        </div>
        <div className="md:w-1/3">
          <img src={img1} className='w-full h-[250px]' alt="" />
          <img src={img2} className='w-full h-[250px]' alt="" />
        </div>
      </div>
    </div>

  );
}

export default HomeSlider;

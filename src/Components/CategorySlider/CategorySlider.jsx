import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategorySlider() {

    const getAllCategories = async () => {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    const { data } = useQuery("category", getAllCategories)


    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 6,
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
        ), responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    };
    return (

        <div className="mb-7">
            <Slider {...settings}>
                {data?.data.data.map((item, index) => {
                    return <div key={index}>
                        <img src={item.image} className="w-full h-[200px]" alt="" />
                        <h1 className="text-md ms-3 text-gray-800">{item.name}</h1>
                    </div>
                })}
            </Slider>
        </div>

    );
}

export default CategorySlider;

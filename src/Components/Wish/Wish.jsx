import img1 from './../../assets/images/grocery-banner-2.jpeg'


const Wish = () => {



    return (
        <div className="wish mt-10 py-7">
            <div className="container w-[80%] mx-auto py-7">
                <h1 className="text-4xl font-bold mb-5">Wish List:</h1>

                <div className="p-5 w-full bg-slate-200 rounded-lg">



                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="card bg-white p-4 shadow-md rounded-lg">
                            <figure>

                                <img src={img1} className="w-full rounded-t-lg" />
                                <figcaption className="text-gray-500 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</figcaption>
                            </figure>
                            <div className="txt mt-3">
                                <h3 className="text-lg font-bold">title</h3>
                                <p className="text-sm text-gray-600">Category : </p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-green-600 font-semibold"> 0 EGP</span>
                                    <span className="text-yellow-500 flex items-center">
                                        <i className="fa-solid fa-star mr-1"></i>
                                            4.8
                                    </span>
                                </div>
                                <button
                                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Wish;

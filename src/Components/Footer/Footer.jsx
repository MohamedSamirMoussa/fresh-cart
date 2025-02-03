const Footer = () => {
  return (
    <div className="bg-[#f0f3f2] py-10">
      <div className="w-[80%] mx-auto py-10">
        <div className="title">
          <h1 className="text-3xl capitalize py-3">
            get the freshCart app
          </h1>
          <p className="text-gray-500">
            we will send you a link, open it on your phone to download the app
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center flex-row border-b border-gray-300 gap-x-5 py-10">
          <div className="w-full md:w-[65%] lg:w-[70%]">
          <input type="email" placeholder="Enter your email" className="bg-gray-50 border px-4 py-2 md:px-4 md:py-2 outline-[#0aad0a]  border-gray-300 text-gray-900 text-sm rounded-lg block w-full" />
          </div>
          <div className="md:w-[30%] lg:w-[25%] my-2 md:my-0">
            <button className="bg-[#0aad0a] text-white px-4 py-2 md:px-4 md:py-2 rounded-lg">Share App Link</button>
          </div>
   
        </div>
        <div className="flex flex-wrap justify-center md:justify-baseline items-center space-x-3 py-10 border-b border-gray-300">
          <h3 className="text-lg text-gray-500 font-light">Payment Partners</h3>
          <ul className="flex items-center justify-center space-x-2">
            <li>
              <i className="fa-brands fa-cc-paypal fa-2x"></i>
            </li>
            <li>
              <i className="fa-brands fa-amazon-pay fa-2x"></i>
            </li>
            <li>
              <i className="fa-brands fa-cc-mastercard fa-2x"></i>
            </li>
          </ul>
          <div className="flex items-center md:ml-auto space-x-3">
            <h3 className="text-lg text-gray-500 font-light">
              Get deliveries with FreshCart
            </h3>

            <ul className="flex items-center justify-center space-x-2">
              <li>
                <i className="fa-brands fa-google-play fa-2x"></i>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer

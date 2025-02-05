import { useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

const WishList = () => {
  const { wishlist, removeFromWishListContext } = useContext(WishContext);

  const handleRemove = async (id) => {
    try {
      const remove = await removeFromWishListContext(id);
      console.log(remove);
      if (remove.status === "success") {
        toast.success(remove.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (!wishlist) {
    return (
      <div className="h-screen flex justify-center items-center fixed top-0 start-0 end-0 bottom-0 bg-[#f0f3f2] z-50">
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
      </div>
    );
  }

  return (
    <div className="py-10 mt-10">
      <div className="container w-[80%] mx-auto py-10">
        <h1 className="text-4xl font-bold my-3">Shop list :</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-2xl">
                <div className="inner w-full p-4">
                  <figure>
                    <img src={item.imageCover} className="w-full block" alt="" />
                  </figure>
                  <div>
                    <h3 className="text-2xl">{item.title.split(" ").splice(0, 2).join(" ")}</h3>
                    <p>{item.description.split(" ").splice(0, 5).join(" ")}</p>
                    <div className="flex flex-wrap justify-between items-center">
                      <span className="text-[#0aad0a]"> {item.price} EGP</span>
                      <span>
                        <i className="fa-solid fa-star text-yellow-400"></i> {item.ratingsQuantity}
                      </span>
                      <i
                        onClick={() => handleRemove(item.id)}
                        className="fa-heart fa-solid fa-lg cursor-pointer text-red-600"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-5xl w-full my-5 text-[#0aad0a]">No data to display it</h1>

          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;

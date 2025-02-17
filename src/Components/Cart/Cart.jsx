
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Bars } from 'react-loader-spinner'
import { Link } from 'react-router-dom'


const Cart = () => {


    const { totalPrice, products, loading, updataProductToCart, deleteProductToCart, clearProductToCart, loadingPanal } = useContext(CartContext)


    if (loading) {
        return <div className="h-screen flex justify-center items-center fixed top-0 start-0 end-0 bottom-0 bg-[#f0f3f2] z-50">
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />

        </div>
    }

    return (

        <div className="mt-10 md:w-[80%] mx-auto p-10">

            <div className='bg-[#f0f3f2] p-5 mt-7'>
                {products.length == [] ? <div className='mt-10 py-7'>
                    <h1 className='text-5xl text-[#0aad0a] font-bold text-center' > Empty </h1>
                </div> :
                    <div className="parent">
                        <h1 className='text-4xl font-bold my-3'>Shop Cart</h1>


                        {/* map */}
                        {products.map((items, idx) => {
                            return <div key={idx} className="flex flex-wrap justify-center items-center border-b-2 p-3 border-gray-300">

                                {/* img */}
                                <figure className='md:w-1/8 p-3'>
                                    <img src={items.product.imageCover} className='w-full' alt="" />
                                </figure>

                                {/* content */}
                                <div className="md:w-4/8 p-3">
                                    <h2 className='text-2xl font-semibold my-2'>{items.product.title}</h2>
                                    <div className='flex flex-wrap items-center'>
                                        {loadingPanal ?
                                            <button onClick={() => updataProductToCart(items.product.id, items.count - 1)} className='mx-2 bg-white border-1 p-0.5 rounded-md border-gray-300 cursor-pointer disabled:opacity-65' disabled><i className='fa-solid fa-spin fa-spinner text-gray-700'></i> </button>
                                            :
                                            <button onClick={() => updataProductToCart(items.product.id, items.count - 1)} className='mx-2 bg-white border-1 p-0.5 rounded-md border-gray-300 cursor-pointer'><i className='fa-solid fa-minus text-gray-700'></i> </button>
                                        }
                                        <h3>{items.count}</h3>
                                        {loadingPanal ?
                                            <button onClick={() => updataProductToCart(items.product.id, items.count - 1)} className='mx-2 bg-white border-1 p-0.5 rounded-md border-gray-300 cursor-pointer disabled:opacity-65' disabled><i className='fa-solid fa-spin fa-spinner text-gray-700'></i> </button>
                                            :
                                            <button onClick={() => updataProductToCart(items.product.id, items.count + 1)} className='mx-2 bg-white border-1 p-0.5 rounded-md border-gray-300 cursor-pointer'><i className='fa-solid fa-plus text-gray-700'></i> </button>
                                        }
                                    </div>

                                </div>

                                <div className='md:w-2/8 text-center p-3'>
                                    <p className='text-xl font-semibold my-2'>{items.price * items.count} EGB</p>

                                </div>

                                {/* count */}
                                <div className='count w-1/8 flex flex-wrap items-center'>
                                    <button onClick={() => deleteProductToCart(items.product.id)} className='cursor-pointer my-2'><i className='fa-solid fa-trash-can fa-lg text-[#0aad0a]'></i> Remove</button>
                                </div>


                            </div>
                        })}


                        <div className='flex flex-wrap justify-between'>
                            
                                <h3 className='text-2xl font-bold my-3'>Total Price : <span className='text-[#0aad0a] font-semibold'>{totalPrice} EGB</span></h3>
                           


                            <div className='text-end mt-3'>
                                {products.length == 0 ? <button onClick={clearProductToCart} className='bg-red-700 p-2 text-white rounded-xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed' disabled>Clear</button> : <button onClick={clearProductToCart} className='bg-red-700 p-2 text-white rounded-xl cursor-pointer'>Clear</button>}
                                {products.length == 0 ? <Link to={"/payment"} className='bg-green-700 ms-2 p-2 text-white rounded-xl cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed' disabled>Clear</Link> : <Link to={"/payment"} className='bg-green-700 ms-2 p-2 text-white rounded-xl cursor-pointer'>Payment</Link>}
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default Cart

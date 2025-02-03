import errorImg from '/src/assets/images/error.svg'
const Error = () => {
  return (
    <div className='w-[70%] mx-auto'>
      <img src={errorImg} className='w-full' alt="error 404 not found" />
    </div>
  )
}

export default Error

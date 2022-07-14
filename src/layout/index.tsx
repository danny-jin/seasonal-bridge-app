import Navbar from '../components/Nav';

const Layout = ({children}: any) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full fixed z-10 border-2 border-black">
        <Navbar/>
      </div>
      <div className="flex justify-center items-center h-screen overflow-hidden mt-85">
        <div className="w-full">
        {children}
        </div>
      </div>
    </div>
  )
}
  
export default Layout;
  
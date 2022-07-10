import Navbar from '../components/Nav';

const Layout = ({children}: any) => {
    return (
      <div className="flex flex-col w-full h-screen">
        <div className="w-full fixed z-10 border-2 border-black">
          <Navbar/>
        </div>
        <div className="flex justify-between overflow-hidden mt-85">
          {children}
        </div>
      </div>
    )
  }
  
  export default Layout;
  
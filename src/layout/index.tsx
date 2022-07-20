import { Nav } from '../components/Nav';

export const Layout = ({children}: any) => {
  
  return (
    <div className="w-full flex flex-col lg:h-screen px-[10%] bg-main bg-cover font-poppins py-32">
      <div className="w-[80%] lg:fixed lg:z-10 py-16">
        <Nav/>
      </div>
      <div className="flex justify-center items-center h-screen overflow-hidden mt-85">
        <div className="w-full">
        {children}
        </div>
      </div>
    </div>
  )
}

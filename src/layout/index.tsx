import { Nav } from '../components/Nav';

export const Layout = ({children}: any) => {
  
  return (
    <div className="w-full flex flex-col md:h-screen px-[10%] bg-main bg-cover font-poppins py-32">
      <div className="w-full md:w-[80%] md:fixed md:z-10 py-16">
        <Nav/>
      </div>
      <div className="flex justify-center items-center md:h-screen overflow-hidden md:mt-85">
        <div className="w-full">
        {children}
        </div>
      </div>
    </div>
  )
}

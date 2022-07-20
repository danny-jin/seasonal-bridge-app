import { Nav } from '../components/Nav';

export const Layout = ({children}: any) => {
  
  return (
    <div className="flex flex-col h-screen px-[10%] bg-main font-poppins">
      <div className="w-[80%] fixed z-10 py-[2em]">
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

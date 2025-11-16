import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
     <Navbar />
     <div className="grid grid-cols-1 grid-rows-3 h-[90vh]
                md:grid-cols-3 md:grid-rows-2 md:gap-4">
              

      <div className="p-4 rounded-lg
                      md:col-start-2 md:row-start-1 text-center">
                    <h1 className="text-2xl font-bold text-white/50 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, cupiditate.</h1>

      </div>

      <div className="p-4 rounded-lg
                      md:col-start-1 md:row-start-2">
         <h1 className="text-3xl font-bold text-white/50 ">Lorem ipsum dolor sit amet.</h1>
      </div>

      <div className=" p-4 rounded-lg
                      md:col-start-3 md:row-start-2">
          <h1 className="text-2xl font-bold text-white/50 ">Lorem ipsum dolor sit amet.</h1>
      </div>

    </div>

    </>
     
     
    
  );
}

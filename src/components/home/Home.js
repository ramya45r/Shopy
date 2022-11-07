import React from "react";


const HomePage = () => {
  return (
    <>
    <section className="pb-10 bg-gray-800">
        <div className="container px-4   mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
             
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
              New collection
                <span className="text-yellow-500"> Mens And Womans</span>
              </h2>
              
              <a
                className="inline-block px-12 py-5 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                href="/"
              >
              Shop now
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img className="w-full" src="https://cdn.shopify.com/s/files/1/1286/5615/products/8_20221017_065917_0007_700x.png?v=1665971563"  />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;


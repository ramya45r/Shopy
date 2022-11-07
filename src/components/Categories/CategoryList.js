import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { fetchCatagoriesAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCatagoriesAction());
  },[dispatch]);
const category =useSelector(state=>state?.category)
const {categoryList,loading,appErr,serverErr} =category;

  return (
    <>


      {loading ? (
      <>
      <LoadingComponent/>
      </>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-20">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>                     
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs  font-bold text-gray-900uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs  font-bold text-gray-900 uppercase tracking-wider"
                      >
                        Created At
                      </th>                      
                      <th 
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider"
                      >
                        Edit
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map(category => (
                      <tr className="bg-gray-50">

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          
                          {<DateFormatter date={category?.createdAt}/>}
                        </td>
                        <Link to={`/update-category/${category?._id}`}>
                        
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <PencilAltIcon className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
  
    </>
  );
};

export default CategoryList;
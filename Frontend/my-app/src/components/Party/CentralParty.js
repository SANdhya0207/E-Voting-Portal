import React from "react";

const CentralParties = (props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Central Parties List</h1>
      
      <div className="overflow-x-auto">
        <div className="rounded-lg overflow-hidden border dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Election Symbol
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(props.data).map(function (data) {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                          className="object-cover w-full h-full"
                          src={data.url}
                          alt="Jese image"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {data.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{data.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CentralParties;

import React, { useState } from "react";

const StateParties = (props) => {
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">State Parties List</h1>
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search With Party Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      
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
                <th scope="col" className="px-6 py-3">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(props.data).map((state) => {
                return Object.values(state.cities)
                  .filter((filteredData) => filteredData && filteredData.name && filteredData.name.toLowerCase().includes(searchInput.toLowerCase()))
                  .filter((filteredData) => selectedOption ? filteredData.name === selectedOption : true)
                  .map((filteredData) => (
                    <tr
                      key={filteredData.name}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img
                            className="object-cover w-full h-full"
                            src={filteredData.url}
                            alt="Jese image"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="pl-3">
                          <div className="text-base font-semibold">{filteredData.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{filteredData.address}</td>
                      <td className="px-6 py-4">{state.name}</td>
                    </tr>
                  ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StateParties;

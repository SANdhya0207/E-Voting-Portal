import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Card = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSearchTerm('');
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsPopupVisible(true);
  };

  const handleVoteSubmit = async() => {
      // Need to updated
      const authData = JSON.parse(localStorage.getItem('auth'));
      const voterID = authData?.user?.voter_ID;

      const area = authData?.user?.area.toLowerCase();
      if(selectedCandidate.constituencies.toLowerCase() !== area)
      {
            toast.warning('You can give your vote only in your constituency ');
            handlePopupClose();
      }
      else{
            const updated= {
            voter_ID : voterID,
            member_ID : selectedCandidate.memberid,
            name : selectedCandidate.name,
            party : selectedCandidate.party,
            constituency : selectedCandidate.constituencies,
            state : selectedCandidate.state
          }
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/updateVoter`, updated);
            if (res) {
                toast.success(res.data.message);
            }
            if(res && res.data.success)
            {
              const emailData = {
                userEmail : authData?.user?.email,
                userName : authData?.user?.name
              }
              const emailRes = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/sendEmail`, emailData);
              console.log(`Email Response is ${emailRes.data.message}`);
            }
            setIsSubmitButtonClicked(true);
      }
    };
    

  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setIsSubmitButtonClicked(false);
    const radioButtons = document.getElementsByName('candidate');
    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  };

  const filteredData = Object.values(props.td).filter((govItem) => {
    const searchTermMatch =
      govItem.constituencies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      govItem.state.toLowerCase().includes(searchTerm.toLowerCase());

    const stateMatch =
      selectedState === '' || govItem.state.toLowerCase().includes(selectedState.toLowerCase());

    return searchTermMatch && stateMatch;
  });

  const states = Array.from(new Set(Object.values(props.td).map((govItem) => govItem.state))).sort();

  const Popup = ({ candidate, onClose }) => {
    const handleBackButtonClick = () => {
      onClose(); // handlePopClose 
    };

    const handleSubmitButtonClick = () => {
      handleVoteSubmit();
      onClose();
    };

    // To stop pop up from closing if click anywhere inside it
    const handlePopupClick = (event) => {
      event.stopPropagation();
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-10" onClick={handleBackButtonClick}>
        <div className="bg-white rounded-lg shadow-lg p-4" onClick={handlePopupClick}>
          <h2 className="text-lg font-bold">Candidate Details</h2>
          <p>Member ID: {candidate.memberid}</p>
          <p>Name: {candidate.name}</p>
          <p>Party: {candidate.party}</p>
          <p>Constituency: {candidate.constituencies}</p>
          <p>State: {candidate.state}</p>
          <br />
          <p>Are you sure you want to vote for this candidate?</p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded-md hover:bg-red-100"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
            <button
              className="px-4 py-2 ml-2 text-sm font-medium text-green-500 bg-transparent border border-green-500 rounded-md hover:bg-green-100"
              onClick={handleSubmitButtonClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Candidates List</h1>
      </div>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
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
            placeholder="Search for your State or Constituency"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <label htmlFor="select-state" className="sr-only">
            Select State
          </label>
          <select
            id="select-state"
            className="block p-2 pl-3 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-lg overflow-hidden border dark:border-gray-700">
          <table className="pt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Member ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Party
                </th>
                <th scope="col" className="px-6 py-3">
                  Constituency
                </th>
                <th scope="col" className="px-6 py-3">
                  State
                </th>
                <th scope="col" className="px-6 py-3">
                  Select
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map(function (govItem, index) {
                return (
                  <tr key={govItem.memberid} className="bg-gray-900">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{govItem.memberid}</td>
                    <td className="px-6 py-4">{govItem.name}</td>
                    <td className="px-6 py-4">{govItem.party}</td>
                    <td className="px-6 py-4">{govItem.constituencies}</td>
                    <td className="px-6 py-4">{govItem.state}</td>
                    <td className="px-6 py-4">
                      <input
                        type="radio"
                        name="candidate"
                        onChange={() => handleCandidateSelect(govItem)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupVisible && <Popup candidate={selectedCandidate} onClose={handlePopupClose} />}
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CandidatesForElection = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [val, setVal] = useState();
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/all-candidates`
        );
        const { success, candidateData } = response.data;
        if (success === true) {
          setCandidatesList(candidateData);
        }
      } catch (error) {
        toast.error("Error in Fetching Candidates");
      }
    };

    fetchCandidates();
  }, []);

  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setIsSubmitButtonClicked(false);
    const radioButtons = document.getElementsByName("candidate");
    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  };

  const handleVoteSubmit = async () => {
    // Need to be updated
    const member_ID = localStorage.getItem("MemberVote");
    if (!member_ID) {
      toast.warning("Member Id not found");
      navigate('/rashtrapati');
      return;
    }

    // Add 700 to the voteCountNumber
    let value1 = parseInt(val) + parseInt(700, 10);
    let value2 = parseInt(val) + 700;
    let value;
    // Use isNaN() as a function to check for NaN
    if (isNaN(value1)) {
      value = value2;
    } else {
      value = value1;
    }

    console.log(`value = ${value} value1 = ${value1} value2=${value2}`);

    const Id = selectedCandidate.ID; // Update this line to get the ID from the selectedCandidate
    const updated = {
      mem_voted: member_ID,
      ID: Id,
      voteCount: value,
    };

    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/updatedRashtrapatiVote`,
      updated
    );

    if (res && res.data.success === true) {
      toast.success(res.data.message);
      localStorage.clear();
      setIsSubmitButtonClicked(true);
      navigate('/');
      return;
    }

    toast.warning(res.data.message); // Show the warning message from the backend
    localStorage.clear();
    setIsSubmitButtonClicked(true);
    navigate('/rashtrapati');
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsPopupVisible(true);
    // Check if the decryptedVoteCount is a valid number
    const data = parseInt(candidate.decryptedVoteCount, 10);
    if (!isNaN(data)) {
      setVal(data);
    }
  };

  const Popup = ({ candidate, onClose }) => {
    const handleBackButtonClick = () => {
      onClose(); // handlePopupClose
    };

    const handleSubmitButtonClick = () => {
      handleVoteSubmit(); // Pass the decryptedVoteCount of the selected candidate
      onClose();
    };

    // To stop pop up from closing if click anywhere inside it
    const handlePopupClick = (event) => {
      event.stopPropagation();
    };

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-10"
        onClick={handleBackButtonClick}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-4"
          onClick={handlePopupClick}
        >
          <h2 className="text-lg font-bold">Candidate Details</h2>
          <p>Candidate ID: {candidate.ID}</p>
          <p>Name: {candidate.name}</p>
          <p>Party: {candidate.party}</p>
          <p>
            Symbol :
            {candidate.symbol ? (
              <img src={candidate.symbol} alt="Symbol" style={{ width: "70px", height: "auto" }} />
            ) : (
              "N/A"
            )}
          </p>
          <p>State: {candidate.state}</p>

          <p>
            Candidate Photo :
            {candidate.yourImage ? (
              <img src={candidate.yourImage} alt="candidate_photo" style={{ width: "70px", height: "auto" }} />
            ) : (
              "N/A"
            )}
          </p>
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
    <Layout title="Candidates List for Rashtrapati Elections">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Candidates List</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="rounded-lg overflow-hidden border dark:border-gray-700">
            <table className="pt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name {val}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Party
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-3">
                    State
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Your Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900">
                {candidatesList.map((candidate) => (
                  <tr key={candidate.ID} className="bg-gray-900 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{candidate.name}</td>
                    <td className="px-6 py-4">{candidate.ID}</td>
                    <td className="px-6 py-4">{candidate.party}</td>
                    <td className="px-6 py-4">
                      {candidate.symbol ? (
                        <img src={candidate.symbol} alt="Symbol" style={{ width: "70px", height: "auto" }} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4">{candidate.state}</td>
                    <td>
                      {candidate.yourImage ? (
                        <img src={candidate.yourImage} alt="candidate_photo" style={{ width: "70px", height: "auto" }} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="radio"
                        name="candidate"
                        style={{ cursor: "pointer" }}
                        onChange={() => handleCandidateSelect(candidate)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isPopupVisible && (
          <Popup candidate={selectedCandidate} onClose={handlePopupClose} />
        )}
      </div>
    </Layout>
  );
};

export default CandidatesForElection;

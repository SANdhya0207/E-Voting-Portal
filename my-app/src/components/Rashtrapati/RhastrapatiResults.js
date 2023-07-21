import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinners from '../Spinner';
import "./Style.css"

const RhastrapatiResults = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [resultLoading, setResultLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-candidates`);
        const { success, candidateData } = response.data;
        if (success === true) {
          setCandidatesList(candidateData);
          setResultLoading(false);
        }
      } catch (error) {
        toast.error('Error in Fetching Candidates');
      }
    };
    fetchCandidates();

  }, []);

  // Sort the candidatesList based on decryptedVoteCount in descending order
  const sortedCandidates = candidatesList.slice().sort((a, b) => b.decryptedVoteCount - a.decryptedVoteCount);

  // Get the candidate with the highest decryptedVoteCount
  const highestVoteCountCandidate = sortedCandidates.length > 0 ? sortedCandidates[0] : null;
      
  return (
    resultLoading === true ? ( <Spinners />) : (
  
    <Layout title="President Election's Results">
      <>
      {/* Card Component  */}
      {highestVoteCountCandidate && (
  <div className="main">
    <div className="card">
      <div className="card-body">
        <h2>Winner is:</h2>
        <table>
          <tr>
            <td>Candidate Name:</td>
            <td>{highestVoteCountCandidate.name}</td>
          </tr>
          <tr>
            <td>Party:</td>
            <td>{highestVoteCountCandidate.party}</td>
          </tr>
          <tr>
            <td>State:</td>
            <td>{highestVoteCountCandidate.state}</td>
          </tr>
          <tr>
            <td>Total Vote:</td>
            <td>{highestVoteCountCandidate.decryptedVoteCount}</td>
          </tr>
          <tr>
            <td>Symbol:</td>
            <td>
              {highestVoteCountCandidate.symbol ? (
                <img
                  src={highestVoteCountCandidate.symbol}
                  alt="Symbol"
                  className="symbol-image"
                />
              ) : (
                "N/A"
              )}
            </td>
          <td>Candidate Photo:</td>
            <td>
              {highestVoteCountCandidate.yourImage ? (
                <img
                  src={highestVoteCountCandidate.yourImage}
                  alt="candidate_photo"
                  className="candidate-image"
                />
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        </table>
        <br />
      </div>
    </div>
  </div>
)}


      {/* Table for all candidates */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Results List</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="rounded-lg overflow-hidden border dark:border-gray-700">
            <table className="pt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Party</th>
            <th scope="col" className="px-6 py-3">Symbol</th>
            <th scope="col" className="px-6 py-3">State</th>
            <th scope="col" className="px-6 py-3">Candidate Photo </th>
            <th scope="col" className="px-6 py-3">Total Vote</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {sortedCandidates.map((candidate) => (
            <tr className="bg-gray-900 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={candidate.ID}>
            <td className="px-6 py-4">{candidate.name}</td>
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
                    
              <td className="px-6 py-4">{candidate.decryptedVoteCount}</td>
              {/* Add other table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </div>
      </>
    </Layout>
  ));
};

export default RhastrapatiResults;

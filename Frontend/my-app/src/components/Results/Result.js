import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";

const Result = () => {
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/all-vote`
        );
        const { success, votes } = response.data;

        if (success) {
          const sortedVotes = votes.sort((a, b) =>
            a.state.localeCompare(b.state)
          ); // Sort by state property
          setVoteData(sortedVotes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVotes();
  }, []);

  // Group objects by state and member_ID and calculate the count for each member_ID state-wise
  const memberIDCounts = voteData.reduce((acc, vote) => {
    const { state, member_ID, name, party } = vote;
    if (!acc[state]) {
      acc[state] = [];
    }
    const existingMember = acc[state].find(
      (member) => member.member_ID === member_ID
    );
    if (existingMember) {
      existingMember.count++;
    } else {
      acc[state].push({ member_ID, name, party, count: 1 });
    }
    return acc;
  }, {});

  // Create an array of objects containing the highest count element from each state
  const highestVoteElements = Object.entries(memberIDCounts).map(
    ([state, members]) => {
      const highestVoteMember = members.reduce((highest, member) => {
        if (member.count > highest.count) {
          return member;
        }
        return highest;
      }, members[0]);
      return {
        state,
        party: highestVoteMember.party,
        member_ID: highestVoteMember.member_ID,
        name: highestVoteMember.name,
        vote: highestVoteMember.count,
      };
    }
  );

  return (
    <Layout title={"Result of Election"}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Result List</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="rounded-lg overflow-hidden border dark:border-gray-700">
            <table className="pt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    State
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
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(memberIDCounts).map(([state, members]) =>
                  members.map(({ member_ID, name, party, count }) => (
                    <tr key={`${state}-${member_ID}`} className="bg-gray-900">
                      <td className="px-6 py-4">{state}</td>
                      <td className="px-6 py-4">{member_ID}</td>
                      <td className="px-6 py-4">{name}</td>
                      <td className="px-6 py-4">{party}</td>
                      <td className="px-6 py-4">{count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Winner's List</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="rounded-lg overflow-hidden border dark:border-gray-700">
            <table className="pt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    State
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
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {highestVoteElements.map(
                  ({ state, member_ID, name, party, vote }) => (
                    <tr key={`${state}-${member_ID}`} className="bg-gray-900">
                      <td className="px-6 py-4">{state}</td>
                      <td className="px-6 py-4">{member_ID}</td>
                      <td className="px-6 py-4">{name}</td>
                      <td className="px-6 py-4">{party}</td>
                      <td className="px-6 py-4">{vote}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Result;

import React from "react";
import Layout from "./Layout";
import "./Profile.css"
const Profile = () => {
  /*
    aadhar
    age
    area
    email
    name
    voter_ID

     */
  const authData = JSON.parse(localStorage.getItem("auth"));
  const aadhar = authData.user.aadhar;
  const voter_ID = authData.user.voter_ID;
  const name = authData.user.name;
  const email = authData.user.email;
  const area = authData.user.area;
  const age = authData.user.age;
  return (
    <Layout>
      {/* Main */}
      <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit" />
            <table>
              <tbody>
              <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td style={{ textTransform: "capitalize" }}>{name}</td>
                </tr>
              <tr>
                  <td>Aadhar</td>
                  <td>:</td>
                  <td>{aadhar}</td>
                </tr>
                <tr>
                  <td>Voter ID</td>
                  <td>:</td>
                  <td>{voter_ID}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>:</td>
                  <td>{age}</td>
                </tr>
                
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>{area}</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

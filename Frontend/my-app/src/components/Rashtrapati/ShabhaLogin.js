import React, { useState } from 'react';
import Layout from '../Layout';
import { toast } from 'react-toastify';

const ShabhaLogin = () => {
  const [selectedShabha, setSelectedShabha] = useState('');
  const [foundMember, setFoundMember] = useState(false);

  const LokshabhaApi = " https://api.data.gov.in/resource/81153f15-b4da-45b5-a299-f307351c5001?api-key=579b464db66ec23bdd00000134992bdb58b546c64be0e84af31ad941&format=json&limit=1000"

  const RajyaShabhaApi = "https://api.data.gov.in/resource/fa52dc7f-7292-4ece-8f07-900322b2c9f9?api-key=579b464db66ec23bdd00000134992bdb58b546c64be0e84af31ad941&format=json&limit=1000"

  const handleShabhaSelect = (event) => {
    setSelectedShabha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ID = event.target.memberID.value;

    if (selectedShabha === 'LokShabha') {
      try {
        const response = await fetch(LokshabhaApi);
        const data =  await response.json();
        
        for (const user of data.records) {
            if (user.memberid === ID) {
              setFoundMember(true);
              localStorage.setItem("MemberVote", ID);
              toast.success("Member Found in Lok Sabha");
              return; // idhar return kra diya toh bss 
            }
          }

         toast.warning("You are not a member of Lok Shabha");
      
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }

    else {
      try {
        const response = await fetch(RajyaShabhaApi);
        const data =  await response.json();
        
        for (const user of data.records) {
            if (user.mpcode === ID) {
              setFoundMember(true);
              toast.success("Member Found in Rajya Sabha");
              return;
            }
          }
// ek min
         toast.warning("You are not a member of Rajya Shabha");
      
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }
  };

  return (
    <Layout title="Login to the Shabha">
      <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label className='form-label' htmlFor="memberID">Enter your Member ID</label>
        <input className='form-control' type="text" id="memberID" placeholder="Member ID" />
        <br />
        <label className='form-label' htmlFor="shabhaSelect">
          Your Shabha</label>
        
          <br />
          <select id="shabhaSelect" onChange={handleShabhaSelect} value={selectedShabha}>
            <option value="">Select Shabha</option>
            <option value="LokShabha">Lok Shabha Member</option>
            <option value="RajyaShabha">Rajya Shabha Member</option>
          </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      </div>
      <style jsx>{`
        .form-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            flex-direction: column;
            background-color: #ffdee9;
            background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
        }
        .form-container form {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            padding: 50px;
            background-color: #fff;
        }
        .form-label {
            margin-bottom: .5rem;
            font-weight: 600;
            font-size: 1.2rem;
        }

        input[type='text'] {
            border: none;
                  border-bottom: 1px solid #000;
                  border-radius: 0;
        }
        .form-control {
            display: block;
            width: 100%;
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: var(--bs-body-color);
            background-color: var(--bs-body-bg);
            background-clip: padding-box;
            border: var(--bs-border-width) solid var(--bs-border-color);
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: var(--bs-border-radius);
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-container form button {
            padding: 10px;
            border-bottom: 1px solid #000;
            border-radius: 0;
            background-color: #000;
            color: white;
            width: 250px;
        }

        label {
            display: inline-block;
        }
      `}</style>
    </Layout>
  );
};

export default ShabhaLogin;

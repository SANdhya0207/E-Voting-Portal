import { useEffect, useState } from "react";
import Spinner from "./components/Spinner.js";
import VoteCasting from "./components/BallotCreation/VoteCasting.js";
import Login from "./components/Forms/Login.js";
import ForgotPass from "./components/Forms/ForgotPass.js";
import RegistrationForm from "./components/Forms/RegistrationForm.js";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import PageNotFound from "./components/page404/PageNotFound.js";
import { toast } from "react-toastify";
import Party from "./components/Party/Party.js";
import Result from './components/Results/Result.js'
import ShabhaLogin from "./components/Rashtrapati/ShabhaLogin.js";
import Profile from "./components/Profile.js";
import CandidatesForElection from "./components/Rashtrapati/CandidatesForElection.js";
import RhastrapatiResults from "./components/Rashtrapati/RhastrapatiResults.js";
import About from "./components/Pagess/About.js";
import PrivacyPolicy from "./components/Pagess/PrivacyPolicy.js";

function App() {
  const [stateData, setStateData] = useState(null);
  const [centralData, setCentralData] = useState(null);
  const [partyLoading, setPartyLoading] = useState(true);
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const stateAPI = "https://vast-cowboy-boots-tick.cyclic.app/stateApi";
  const centralAPI = "https://vast-cowboy-boots-tick.cyclic.app/centralApi"

  const API = // lok shbha ki hain ye
    "https://api.data.gov.in/resource/81153f15-b4da-45b5-a299-f307351c5001?api-key=579b464db66ec23bdd00000134992bdb58b546c64be0e84af31ad941&format=json&limit=1000";

  // use effect((callBack Function), [dependencies]])
  useEffect(() => {

    const fetchCandidateData = async () => {
      try {
        const url = await fetch(API);
        const res = await url.json();
        setCandidateData(res);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };

    const fetchPartyData = async () => {
      try {
        const urlCentral = await fetch(centralAPI);
        const centralRes = await urlCentral.json();
        setCentralData(centralRes);
  
        const urlState = await fetch(stateAPI);
        const stateRes = await urlState.json();
        setStateData(stateRes);
  
      } catch (error) {
        toast.error(error);
      }
      setPartyLoading(false);
     }
  
    fetchCandidateData();
    fetchPartyData();
  }, []);

   
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-pass" element={<ForgotPass />}></Route>
        <Route path="/vote" element={ loading === true ? ( <Spinner />) : (
              <VoteCasting data={candidateData} /> )}> </Route>
        <Route path="/political" element = {partyLoading === true ? <Spinner/> : 
          <Party stateData={stateData}  centralData = {centralData}/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path="/result" element={<Result/>} />
        <Route path="/rashtrapati" element={<ShabhaLogin/>} />
        <Route path="/getCandidates" element={<CandidatesForElection/>} />
        <Route path="/presidentResults" element={<RhastrapatiResults/>} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

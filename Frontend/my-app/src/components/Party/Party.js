import React from 'react'
import CentralParties from './CentralParty';
import StateParties from './StateParty';
import Layout from '../Layout';

const Party = (props) => {
      const centralData = props.centralData;
      const stateData = props.stateData;

      //[{},{}] central data
      function renderCentralDataToParties() {
      return (
        <div>
          <CentralParties data={centralData} heading={"Central"}></CentralParties>
        </div>
      );
    }
  
    //[{id name,cites:[{}{}]}]
    const renderStateDataInParties = () => {
      return (
        <div>
          <StateParties data={stateData} heading={"State"}></StateParties>
        </div>
      );
    };
  

  return (
    <Layout>
      <div>
            {renderCentralDataToParties()};
            {renderStateDataInParties()};
      </div>
    </Layout>
  )
}

export default Party
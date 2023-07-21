import React from 'react'
import Card from './Card';
import Layout from '../Layout';

const VoteCasting = (props) => {
      function renderCandidateData() {
            return(
                  <div>
                    <Card td={props.data.records} ></Card>
                  </div>
                )
      }
    
      return <Layout title={"List of Candidates"}>
            {renderCandidateData()}
      </Layout>;
};
    
export default VoteCasting
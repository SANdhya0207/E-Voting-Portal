import React from 'react'
import Layout from './Layout'
import "./HomePage.css"

const HomePage = () => {
  return (
    <Layout>
      <img src="https://sansad.in/uploads/Hero_e0226d13a2.png" alt="" />
      <div className='p-4'>
        <h2 className="cls"> “No voter to be left behind” </h2>
      </div>
        <div className="image-text-container">
        <div className="text-container">
          <p>
            Vote means to form a political choice for or against someone or something by casting a ballot, raising your hand, speaking your choice aloud, etc.
          </p>
          <p>
            <strong>In the Indian constitution, there is a right to vote for every person.</strong>
          </p>
          <p>
            A majority vote may be a formal expression of a person's choice for or against some motion (for example, a proposed resolution); for or against some ballot question; or for a particular candidate, selection of candidates, or party. A preferential vote may allow the voter and/or elected representative to cast one, some, or many preferences. In elections, many countries use a vote, a practice to stop voters from being intimidated and to guard their political privacy.
          </p>
          <h1 >Election commission: </h1>
          <p>
            The Election Commission of India (ECI) is an autonomous and permanent constitutional body liable for organizing free and fair elections within the Union and States of India. The committee operates under the authority of the Constitution per Article 324 and subsequently enacted the Representation of the People Act.
          </p>
          <p>
            The body administers elections to the Lok Sabha, Rajya Sabha, state Legislative Assemblies, state legislative councils, and the offices of the President and Vice President of the country. The ECI doesn't affect the elections to the urban bodies like Municipalities and Panchayats within the states. The State committee deals with the function of conducting free, fair, and impartial elections to the local bodies within the state.
          </p>
        </div>
        <div className="image-container">
          <img src="https://qph.cf2.quoracdn.net/main-qimg-9908ec1eb5abb162a51a525c6630910c-lq" alt="" />
        </div>
        
      </div>

    </Layout>
  )
}

export default HomePage
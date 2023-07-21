import React from 'react';
import Layout from '../Layout';

const PrivacyPolicy = () => {
  return (
      <Layout title="Privacy Policy">
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>


        <p className="text-gray-800 mb-4">
          Thank you for using our online voting portal. This Privacy Policy is intended to inform you about how we collect, use, and protect your personal information during your use of the platform. By using this platform, you consent to the practices described in this Privacy Policy. Please read this policy carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect:</h2>

        <p className="text-gray-800 mb-6">
          <b>a. Personal Information:</b> During your use of the online voting portal, we may collect certain personally identifiable information from you. This information includes, but is not limited to:
        </p>

        <ul className="list-disc pl-8 mb-6">
          <li>Full name</li>
          <li>Email address</li>
          <li>Password (encrypted using bcrypt library)</li>
          <li>State and constituency information (for normal democratic elections)</li>
          <li>Shabha (Lok, Rajya) member ID (for president elections)</li>
        </ul>

        <p className="text-gray-800 mb-6">
          <b>b. Voting Information:</b> When you participate in any election (normal democratic or president elections), we will collect your vote data. For normal democratic elections, this includes the candidate you voted for and your constituency. For president elections, this includes the candidate you voted for and your state. All voting information is encrypted using the AES algorithm before being stored in our database.
        </p>

        
        <p className="text-gray-800 mb-6">
          By using this online voting portal, you agree to the terms and practices outlined in this Privacy Policy. Your trust is essential to us, and we are committed to protecting your privacy and ensuring the security of your data.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default PrivacyPolicy;

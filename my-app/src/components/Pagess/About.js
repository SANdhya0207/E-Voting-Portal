import Layout from "../Layout";

export default function About() {
  return (
    <Layout title="About Us">
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
            About Us - Online Voting Portal
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to our Online Voting Portal! We are a team of passionate developers who have come together to create a user-friendly and secure platform for conducting elections. Our portal is built using cutting-edge technologies, including Express.js, React.js, MongoDB, and Node.js, to provide a seamless and efficient voting experience to all users.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-bold text-white">Our Vision</h3>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            At our core, we believe in promoting democratic values and ensuring the active participation of citizens in the electoral process. Our vision is to build a platform that fosters transparency, trust, and accessibility in elections. We aim to empower voters by providing them with an easy-to-use platform that allows them to cast their votes securely and conveniently from the comfort of their homes.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-bold text-white">Key Features</h3>
          <ul className="mt-4 text-lg leading-8 text-gray-300 list-disc list-inside">
            <li>Sectional Navigation: Our online voting portal is divided into various sections to cater to different aspects of the electoral process, including Political Parties, Result Section, and Vote Section.</li>
            <li>Two Types of Elections: Our platform facilitates Normal Democratic Elections for common citizens and President Elections exclusive to members of the Shabha (Lok Sabha and Rajya Sabha).</li>
            <li>Secure Voting Process: We implement robust security measures, including bcrypt encryption for passwords and AES encryption for user votes.</li>
            <li>Real-Time Results: After the elections, we promptly publish the results, providing users with a detailed breakdown of votes received by each candidate, ensuring transparency in the electoral outcomes.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-bold text-white">Our Commitment</h3>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            As a team, we are committed to upholding the highest standards of security and privacy throughout our platform. The data of our users is treated with utmost confidentiality and protected using advanced encryption techniques. We continuously strive to enhance the user experience by incorporating user feedback and implementing necessary improvements.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-bold text-white">Contact Us</h3>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            We are excited to be a part of the democratic process, facilitating fair and honest elections. If you have any questions, suggestions, or concerns, please don't hesitate to reach out to our team at [ Email Address : 20001015054@jcboseust.ac.in ]. Your feedback is invaluable to us as we continue to improve and refine our Online Voting Portal.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Thank you for choosing our platform for your voting needs. Together, let's shape the future through democracy and transparency!
          </p>
        </div>
      </div>
      </div>

    </Layout>
  );
}

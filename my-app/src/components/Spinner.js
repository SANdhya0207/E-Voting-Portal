import React from 'react'
import Layout from './Layout'
 
const Spinners = () => {
  return (
      <Layout title={"Please Wait.."}>
            <strong className='p-4 m-4'>Loading...</strong> 
<div
  className="p-4 m-4 ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status"></div>
    </Layout>
  );
}

export default Spinners
// PageNotFound.js
import React from 'react';
import Notfound from './404.jpg'
const PageNotFound = () => {
  return (
    <div className=' align-items-center mx-auto '> 
      <div > <h1  className=' text-center p-3'>404 - Page Not Found</h1></div>
      <img src={Notfound} className='rounded-1 img-fluid img-sm-50 img-md-75'/>
    </div>
  );
};

export default PageNotFound;

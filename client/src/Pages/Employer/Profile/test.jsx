import React, { useEffect, useState } from 'react';
import { apigetCurrent } from '../../../api';

function test() {
    const [InforCompany,setInforCompany] = useState([]);
    useEffect(() => {
        const fetchCompany = async () => {
          try {
            const id = 1;
            const response = await apigetCurrent(id);
            setInforCompany(response.data.userData);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchCompany();
      }, []);
      console.log(InforCompany)
      // Access the updated InforCompany after rendering
    return (
        <div>
            <p>{InforCompany.Comapny.nameCompany}</p>
        </div>
    );
}

export default test;
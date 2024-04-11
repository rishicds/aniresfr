import React, { useState , useEffect } from 'react';
import styles from "./donationFront.module.css";
import { Link } from 'react-router-dom';
import Background from '../../../Components/backgroundComponent/Background';
import { TypeAnimation } from 'react-type-animation';

export const Donationfront = () => {
  
  const [donationType, setDonationType] = useState('us');
  const [showContent, setShowContent] = useState(true);
  const [ngoNames, setNgoNames] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  
  const handleToggleClick = (type) => {
    setDonationType(type);
    setShowContent(true);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const fetchNgoNames = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${url}/ngo`);
        if (response.ok) {
          const data = await response.json();
          setNgoNames(data); // Assuming the response is an array of objects with a 'name' property
        } else {
          console.error('Failed to fetch NGO names');
        }
      } catch (error) {
        console.error('Error fetching NGO names:', error);
      }
    };

    fetchNgoNames();
  }, []);

  return (
    <div>
      <Background/>
        <div className="flex flex-col h-[90vh] font-breeSerif items-center justify-center gap-[30px] p-3">
        <div className=" relative">
          <img className={styles.image} src="./images/Donation.png" alt='' />
          <h2 className="bg-white font-breeSerif rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-dashBoardCardImageShadow px-4 text-center pb-3 pt-3 flex justify-center items-center flex-col"> <span className="text-[#40025D] font-bold animate-fade-in-donation text-[1.6rem] drop-shadow-xl ">HELP US BRIGHTEN THEIR LIVES!</span></h2>
        </div>
        {/* MAIN CONTENTS */}
        <div className="w-full">
        {/* TOGGLE BUTTON CONTAINER */}
          <div className="w-full flex justify-center gap-2 py-3">         
              <button
                type='button'
                className="text-white focus:outline-none rounded-[30px] shadow-buttonShadow bg-gradient-to-b from-teal-300 to-teal-500 py-3 px-4 text-[1.5rem] sm:text-[1.5rem] hover:transform hover:duration-100 hover:scale-[1.01] `${donationType === 'us' ? styles.active : ''}`"
                onClick={() => handleToggleClick('us')}
              >
                Donate to US
              </button>
              <button
                type='button'
                className="text-white focus:outline-none rounded-[30px] shadow-buttonShadow bg-gradient-to-b from-pink-300 to-pink-800 py-3 px-4 text-[1.5rem] sm:text-[1.5rem] hover:transform hover:duration-100 hover:scale-[1.01] `${donationType === 'ngo' ? styles.active : ''}`"
                onClick={() => handleToggleClick('ngo')}
              >
                Donate to NGO
              </button>

          </div>
          {/* TOGGLED CONTENTS */}
          {showContent && (
            <>
            <div className="bg-white bg-opacity-57 w-[100%]  flex flex-col shadow-dashBoardCardImageShadow backdrop-blur-[5px]  rounded-[40px]">

            {/* Text and button container */}
            <div className="flex flex-col justify-between items-center gap-4">
             {/* allTextContainer */}
             <div> 
             {/*heading*/}
                <div className="text-[1.3rem] p-4 flex flex-col gap-[10px] drop-shadow-xl" >
                    <TypeAnimation
                      key={animationKey}
                      sequence={[
                        `${donationType === 'us' ? 'Donate to Us...' : 'Donate to an NGO...'}`,
                        1000
                      ]}
                      wrapper="span"
                      speed={1}
                      style={{ fontSize: '28px', display: 'inline-block', fontWeight: 'bold' }}
                    />
                  {donationType === 'us' && 'To help us save our little friends!'}
                  {donationType !== 'us' && 'Choose an NGO and donate to make a difference!'}
               </div>
                 {/* choose an ngo or teams */}
              <div className="flex flex-col items-center gap-4">
              {/* TOGGLE NGO */}
              {donationType === 'ngo' && (
                <select className="rounded-[30px] p-2 text-[20px] bg-white bg-opacity-45 outline-0">
                  <option>Choose an NGO</option>
                  {ngoNames.map((ngo, index) => (
                    <option className="bg-pink-200" key={index} value={ngo.name}>
                      {ngo.name}
                    </option>
                  ))}
                </select>
              )}
               {/* TOGGLE US */}
              {donationType === 'us' && (
                <p className="text-[22px]"> Explore our <Link className="inset-0 text-[22px] text-[#40025D] tracking-wider font-semibold font-baijam bg-gradient-to-b from-violet-200 to-violet-400 shadow-xl rounded-[30px] py-3 px-4 bg-opacity-47" to="/team">Crew!</Link> </p>
              )}
              </div>
            </div>
              {/* Button Container */}
              <div>
                <button
                  type='submit'
                  className="bg-gradient-to-b m-3 from-green-300 to-green-800 text-white focus:outline-none rounded-[30px] shadow-buttonShadow  py-3 px-4 text-[1.5rem]"
                >
                  <Link to="/donation">Donate</Link>
                </button>
              </div>
            </div>
            </div>
 </>
          )}
        </div>
        </div>
        </div>
  );
};

export default Donationfront;

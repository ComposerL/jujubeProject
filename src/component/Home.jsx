import React from 'react';

const Home = () => {
   
    return (
        <div id='home_wrap'>
            {process.env.REACT_APP_HOST}
        </div>
    )
}

export default Home;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Featured.scss';
import picture from './loo.svg';
// import picture from './logo.png';
// import picture from './logo.jpeg';
// import 
const Featured = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if(search) {
      navigate(`/gigs?search=${search}`);
    }
  }

  return (
    <div className='featured'>
      <div className="container">

        <div className="left">
          <h1>Browse Bargain Benefit </h1>
          <h1> Community <span> of </span> the students, <span> by </span> the students, <span>for</span> the students </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./media/search.png" alt="search" />
              <input type="search" placeholder='CS-100 Tutor' onChange={(({ target: { value } }) => setSearch(value))} />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Grocery</button>
            <button>Gifts</button>
            <button>Clothing</button>
          </div>
        </div>

        <div className="right">
          <img src={picture} alt="lumsvector" />
        </div>
        
      </div>
    </div>
  )
}

export default Featured
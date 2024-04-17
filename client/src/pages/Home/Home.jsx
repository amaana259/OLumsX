import { useEffect } from 'react';
import { Featured } from '../../components';
import './Home.scss';

const Home = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className='home'>
      <Featured />
    </div>
  )
}

export default Home
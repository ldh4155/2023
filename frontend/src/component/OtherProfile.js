import { useRef, useState } from 'react';
import style from '../style/imgStyle.module.css'
const OtherProfile = () => {
    const [image, setImg] = useState();
    const imgRef = useRef(null);
    const user = {
        name: 'test',
        
    };

    return (
        <div>
            <div className='style.box'>
                <img className='style.profile' src={user.profile} alt='profile'/>
                <p>{user.name}</p>
            </div>
        </div>
    );
}

export default OtherProfile;
import React from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';

import './Video.css';

const Intro=({ vid }) => {
    const [playVideo, setPlayVideo]=React.useState(false);
    const vidRef=React.useRef();

    return (
        <div className="app__video">
            <video
                ref={vidRef}
                src={vid}
                type="video/mp4"
                loop
                controls={false}
                muted
            />
            <div className="app__video-overlay flex justify-center items-center">
                <div
                    className="app__video-overlay_circle flex justify-center items-center bg-slate-500 opacity-30"
                    onClick={() => {
                        setPlayVideo(!playVideo);
                        if (playVideo) {
                            vidRef.current.pause();
                        } else {
                            vidRef.current.play();

                        }
                    }}
                >
                    {playVideo? (
                        <BsPauseFill color="#fff" className='text-[80px]' />
                    ):(
                        <BsFillPlayFill color="#fff" className='text-[80px]' />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Intro;
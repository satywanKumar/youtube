import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.webp'

const Home = () => {
  const [videos, setVideos] = useState([])
  const api = import.meta.env.VITE_API

  useEffect(() => {
    getVideo()
  }, [])

  const getVideo = async () => {
    const res = await axios.get(`${api}/video/allvideo`)
    console.log(res.data.videos)
    setVideos(res.data.videos.reverse())

  }
  return (
    <div className='home-wrapper'>
      <div className='video-wrapper'>
        {
          videos.map(video => (
            <div className='video-card' key={video._id}>
              <img className='video-thumbnail' src={video.thumbnailUrl} alt="thumbnail" />
              <div className='video-detail'>
                <h1>{video.title}</h1>
                <p>{video.description}</p>
                <div>
                  <div className='profile-box'>
                    <img className='user-profile' src={video.uploadedBy.profilePicUrl ? video.uploadedBy.profilePicUrl : profile} alt="profile" />
                  <p>{video.uploadedBy.channelName}</p>
                  </div>
                  <p>{Math.floor((Date.now() - new Date(video.createdAt))/(1000*60*60*24)) == 0 ? 'Today' :  Math.floor((Date.now() - new Date(video.createdAt))/(1000*60*60*24)) + ' day ago'}</p>
                  {/* {console.log(Date.now() - new Date(video.createdAt))} */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
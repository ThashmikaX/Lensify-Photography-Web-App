import React from 'react'
import {I1, I2, I3, I4, I5 } from '../assets/landscapes'

const ImageAnimation = () => {
    const images = [I1, I2, I3, I4, I5]
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === images.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 6000)
        return () => {
            clearInterval(interval)
        }
    }, [])

  return (
  <>
    <style>
        {`
        .image-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            overflow: hidden;
        }
        .image-animation img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        }
        .image-animation img.active {
            opacity: 1;
        }`}
    </style>
    <div className="image-animation">
      {images.map((image, i) => (
        <img src={image} className={i === index ? 'active' : ''} key={i} alt="background"/>
      ))}
    </div>
  </>
)
}

export default ImageAnimation
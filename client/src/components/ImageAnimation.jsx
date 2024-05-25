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
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                width: 100%;
            }
            img {
                left: 0px;
                top: 0px;
                z-index: -1;
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: cover;
                opacity: 0;
                transition: opacity 2s ease-in-out;
            }
            img.active {
                opacity: 1;
                }`}
        </style>
          {images.map((image, i) => (
            <img src={image} className={i === index ? 'active' : ''} key={i} style={{ overflowX: 'hidden' }}/>
          ))}
      </>
  )
}

export default ImageAnimation
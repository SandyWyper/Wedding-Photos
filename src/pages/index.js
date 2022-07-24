import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/a11y"

const IndexPage = ({
  data: {
    allFile: { nodes },
  },
}) => {
  const swiperStyles = {
    "background-color": "#0e0e0e",
  }
  const slideStyles = {
    display: "flex",
    "justify-content": "center",
  }
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      style={swiperStyles}
    >
      {nodes.map((each, index) => {
        const imageData = getImage(each.childImageSharp)
        console.log(each)

        return (
          <SwiperSlide style={slideStyles} zoom>
            <GatsbyImage
              image={imageData}
              loading="eager"
              width={100}
              quality={95}
              formats={["auto", "webp", "avif"]}
              alt=""
              style={{ margin: `0 auto` }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default IndexPage

export const data = graphql`
  {
    allFile(filter: { dir: { regex: "/gallery-pics/" } }) {
      nodes {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`

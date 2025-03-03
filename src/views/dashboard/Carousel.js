
import React from 'react'
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import bgImage1 from "../../assets/images/2021-07-06-copy.jpg"
import bgImage2 from "../../assets/images/2017-12-02.jpg"
import bgImage3 from "../../assets/images/2023-07-30.jpg"


const bibleVerses = [
    { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { verse: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
    { verse: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." }
  ];
  

const Carousel = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden',width: '100%', height: '100%'}}>
      <div style={{ width: '80%', height: '80%', overflow: 'hidden', boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)"}}>
        <CCarousel controls indicators interval={3000}>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage1} alt="slide 1" />
            <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage2} alt="slide 2" />
            <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage3} alt="slide 3" />
            <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[2].verse}</h5>
              <p>{bibleVerses[2].text}</p>
            </CCarouselCaption>
          </CCarouselItem>
        </CCarousel>
      </div>
    </div>
  )
}

export default Carousel;

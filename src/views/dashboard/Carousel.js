
import React from 'react'
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
//import bgImage1 from "../../assets/images/2021-07-06-copy.jpg"
//import bgImage2 from "../../assets/images/2017-12-02.jpg"
//import bgImage3 from "../../assets/images/2023-07-30.jpg"
import bgImage4 from "../../assets/images/WhatsApp Image 2025-03-14 at 09.25.46.jpeg" 
import bgImage5 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.34 (1).jpeg" 
import bgImage6 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.34.jpeg" 
import bgImage7 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.35 (1).jpeg" 
import bgImage8 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.35.jpeg" 

import bgImage9 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.36.jpeg" 
import bgImage11 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.37 (1).jpeg"

import bgImage12 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.37.jpeg" 

import bgImage13 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.38 (1).jpeg" 
import bgImage14 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.38.jpeg"

import bgImage15 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.39 (1).jpeg" 
import bgImage16 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.39.jpeg" 
import bgImage17 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.40.jpeg" 
import bgImage18 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.41 (1).jpeg"
import bgImage19 from "../../assets/images/couraselimage/WhatsApp Image 2025-03-20 at 01.35.41.jpeg"


const bibleVerses = [
    { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { verse: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
    { verse: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." }
  ];



  

const Carousel = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden',width: '100%', height: '100%'}}>
      <div style={{ width: '80%', height: '80%', overflow: 'hidden', boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)"}}>
        <CCarousel controls indicators interval={2000} ride="carousel">

        <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage4} alt="slide 1" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
        
          
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage6} alt="slide 2" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage7} alt="slide 3" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[2].verse}</h5>
              <p>{bibleVerses[2].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>

          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage8} alt="slide 4" />
          {/*  <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>

          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage9} alt="slide 5" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>

          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage11} alt="slide 6" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage12} alt="slide 7" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage13} alt="slide 8" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[2].verse}</h5>
              <p>{bibleVerses[2].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>


          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage14} alt="slide 9" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage15} alt="slide 10" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage16} alt="slide 11" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[2].verse}</h5>
              <p>{bibleVerses[2].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>

          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage17} alt="slide 12" />
           {/* <CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage18} alt="slide 13" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[1].verse}</h5>
              <p>{bibleVerses[1].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage19} alt="slide 14" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[2].verse}</h5>
              <p>{bibleVerses[2].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>

          <CCarouselItem>
            <CImage className="d-block w-100 h-100" style={{ objectFit: 'cover' }} src={bgImage5} alt="slide 15" />
            {/*<CCarouselCaption className="d-none d-md-block" style={{ backgroundColor: "#000" }}>
              <h5>{bibleVerses[0].verse}</h5>
              <p style={{padding: "0px 20px"}}>{bibleVerses[0].text}</p>
            </CCarouselCaption>*/}
          </CCarouselItem>
        
        </CCarousel>
      </div>
    </div>
  )
}

export default Carousel;

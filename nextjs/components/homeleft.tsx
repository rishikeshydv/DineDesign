import React from 'react'

function Homeleft() {
  return (
    <div className='flex flex-row'>
        <div style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(/images/aboutimg.jpg)",
      }}
      className="w-full bg-cover lg:px-15 md:px-10 sm:px-7 px-5 flex flex-col gap-6 py-5 items-center justify-center">        
        </div>

        <div style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(/images/aboutimg.jpg)",
      }}
      className="w-full bg-cover lg:px-15 md:px-10 sm:px-7 px-5 flex flex-col gap-6 py-5 items-center justify-center">        
        </div>

        <div>
            <h3>DineDesign News</h3>
        </div>
            <div>
            <h2>Spinach Month is Finally Here</h2>
            </div>

        <div>
            <p> I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. </p>
        </div>


        </div>
  )
}

export default Homeleft
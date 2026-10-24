//import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from "./home"


function App() {

	/*Example  --  . <nav>
        <Link to="/">Home</Link>
        <Link to="/automation">Automation</Link>
        <Link to="/options">Options</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/automation" element={<DoAutomation />} />
        <Route path="/options" element={<CellRangeForm />} />
      </Routes> */
	
    return (
    	<>
			  Testing the application
        <nav>
          <Link to="/home">Home</Link>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes> 
        
        </>
        
      )
}

export default App

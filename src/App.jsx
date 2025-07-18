import './App.css';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sectioms/HeroSEction.jsx';
import { JobCartSection } from './sectioms/JobCartSection';
import jobData from './JobsNoob.js'

function App() {

  return (
  <div>
    <Navbar />

    <main>
      <HeroSection />
      {jobData.map((job) => (
        <JobCartSection key={job.id} {...job} />
      ))}
      
    </main>

  </div>
  )
}

export default App
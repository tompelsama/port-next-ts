import './home.scss'
import ExperienceClient from '@/components/home/ExperienceClient'
import ValueComponent from '@/components/home/Value'
import AboutComponent from '@/components/home/About'
import CompaniesComponent from '@/components/home/Companies'
import Skillset from '@/components/home/Skillset'
import Projects from '@/components/home/Projects'
import Socials from '@/components/home/Socials'
import { companies } from '@/lib/companies'
import { skills } from '@/lib/skills'
import { projects } from '@/lib/projects'

export default function Home() {
    return (
        <main>
            <div className='canvas-wrapper'>
                <h1 className="title-experience">Imagination</h1>
                <ExperienceClient />
            </div>

            <div className="wrapper content">
                
                <ValueComponent />

                <AboutComponent />

                <CompaniesComponent companies={companies} title={'Work Experience'} />

                <Skillset skills={skills} title={'Skillset'} />

                <Projects projects={projects} title={'My Projects'} />

                <Socials />

            </div>
            
        </main>
    )
}

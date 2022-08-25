import Footer from "../Footer/Footer";
import NavBar from "../Nav/Nav";
import "./Home.css";
import Images from "../Images/Images";
import { Divider, Typography } from "@mui/material";
import { imageList } from "./images"
import "github-markdown-css/github-markdown-light.css"

interface MiniBlog {
    _id: string;
    name: string;
    description?: string;
}

interface UserInterface {
    _id: string;
    name: {
        first: string;
        last?: string;
    };
    email: string;
    blogs?: MiniBlog[];
    encryption: string;
}

interface Props {
    user: UserInterface;
    setUser: (newUser: UserInterface) => void;
}

export default function Home({user, setUser}: Props) {
    
    return (
        <div className="App">
            <NavBar isHome user={user} setUser={setUser}/>
            <header className="App-header">
                <Images imageList={imageList} />
                <Divider />
                <div className="markdown-body">
                    <h1 id="-the-committee-recommends-that-community-wide-awareness-and-education-programs-about-natural-disasters-be-made-a-national-priority-"><strong>The Committee recommends that community-wide awareness and education programs about natural disasters be made a national priority.</strong></h1>
                    <h2 id="to-achieve-this-goal-the-committee-proposes-that-information-campaigns-and-educational-efforts-be-developed-and-that-their-effectiveness-be-evaluated-and-where-possible-continually-improved">To achieve this goal, the Committee proposes that information campaigns and educational efforts be developed and that their effectiveness be evaluated and, where possible, continually improved</h2>
                    <ul>
                    <li>Home. Household survival plans should provide basic information on what hazardous events are most likely to occur in particular communities, what emergency equipment and supplies should be on hand, what precautions should be taken to limit damage, and what preparations should be made for escape and evacuation.</li>
                    <li>Such information might best be conveyed graphically, both in print and on television. Dramatic, easily recognizable graphic symbols signifying each natural hazard should be created and widely publicized to identify impending emergencies and quickly alert the public to the degree of seriousness and the imminence of danger.</li>
                    <li>To stimulate public awareness, brochures, posters, games, calendars, museum exhibits, public service announcements (for print, radio, and television), and even entertainment programming should be used. Materials produced by the American Red Cross, FEMA, the National Weather Service (NWS), the U.S. Forest Service (USFS), and other government agencies as well as insurance companies and other private sector entities are already available for such campaigns.</li>
                    <li>Organizations in the private sector, including the Advertising Council, public utilities, public relations firms, advertising agencies, and voluntary organizations, should be enlisted to create, produce, and disseminate new information materials.</li>
                    <li>The community. Community-wide planning and education should be encouraged. Schools, government organizations, community and church groups, business and neighborhood organizations, hospital and medical groups, and the news media should all be involved.</li>
                    <li>Checklists, information handouts, and training videos should be created and widely distributed to convey such information as the location of nearby emergency resources and appropriate use of the 911 system both during and after a disaster. Regional and community demonstration programs, disaster day exercises, volunteer courses, and conferences should be undertaken and evaluated for their effectiveness.</li>
                    </ul>
                    <h2 id="people-are-especially-motivated-by-approaches-in-which-they-themselves-participate-in-a-solution-and-especially-when-they-believe-it-is-their-own-idea-thefocus-of-participatory-learning-is-to-engage-people-in-discovery-and-problem-solving-for-disaster-risk-reduction-at-the-heart-of-all-of-these-activities-is-the-community-s-own-experience-of-empowerment-">People are especially motivated by approaches in which they themselves participate in a solution, and especially when they believe it is their own idea. The focus of participatory learning is to engage people in discovery and problem solving for disaster risk reduction. At the heart of all of these activities is the community’s own experience of empowerment.</h2>
                    <h3 id="this-involves-using-language-stories-songs-and-traditions-to-strengthen-the-emerging-culture-of-prevention-this-is-typically-accomplished-through-tools-such-as-">This involves using language, stories, songs and traditions to strengthen the emerging culture of prevention. This is typically accomplished through tools such as:</h3>
                    <ul>
                    <li>action-oriented research such as vulnerability and capacity assessment</li>
                    <li>disaster management planning</li>
                    <li>implementing risk reduction measures</li>
                    <li>monitoring and improving on plans through drills and simulations.
                    These four elements of participatory learning can be applied at three levels:</li>
                    <li>The organizational level – headquarters, branches, schools, businesses, workplaces, homes</li>
                    <li>The community level – being scaled up to reach villages, towns, cities, school
                    systems, and regions</li>
                    <li>The population level – being expanded to incorporate entire urban populations,
                    by taking advantage of internet-based tools and social media.
                    Parallel tools specifically for use with children, and for marginalized populations
                    can be valuable as well.
                    Specific tools within this approach include:</li>
                    <li>publications such as booklets</li>
                    <li>curricula, modules and presentations</li>
                    <li>participatory activities such as transect walk, risk and asset mapping,
                    seasonal calendar, group discussion, drills, simulations and tabletop exercises</li>
                    <li>audio and video materials, including videos, audio clips and songs or other music</li>
                    <li>web pages and activities such as workspaces</li>
                    <li>social media and telephone-based initiatives, such as text messaging and polling</li>
                    </ul>
                    <h3 id="specific-tools-that-can-be-used-for-informal-education-include-">Specific tools that can be used for informal education include:</h3>
                    <ul>
                    <li>Publications – posters, guidelines, flyers, brochures, booklets, activity books, paper models, comic books, story books, colouring books, assembly kits and teacher resources</li>
                    <li>Curricula, modules and presentations – teacher briefings and community training</li>
                    <li>E-learning – self-study curricula</li>
                    <li>Performing and cultural arts – plays, dances, poems, songs, street theatre, puppet theatre</li>
                    <li>Games and competitions – card games, board games, cooperative, activities role play, drawing competitions, writing competitions, tournaments, radio quizzes</li>
                    <li>Audio and video materials – short videos, radio programmes, television programmes</li>
                    <li>Web pages and activities – web sites, online games, online quizzes</li>
                    <li>Social media and telecommunications – SMS, early warning.</li>
                    </ul>   
                </div>
                <Divider />
            </header>
            <Footer />
        </div>
    )
}
import Footer from "../Footer/Footer";
import NavBar from "../Nav/Nav";
import "./Home.css";
import Images from "../Images/Images";
import { Divider, Grid, Typography } from "@mui/material";
import { imageList } from "./images"
import "github-markdown-css/github-markdown-light.css"
import News from "../News/News";
import Emergency from "../Emergency/Emergency";
import Line from "../Line/Line";

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
                <div className="ImageContainer">
                    <Images imageList={imageList} />
                    <Grid sx={{ flexGrow: 1 }} container spacing={'2rem'} className="ImageGrid">
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={'2rem'}>
                                <Emergency />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className="markdown-body">
                    <h1 id="-assisting-in-disaster-prevention-and-mitigation-" style={{color: '#1976d2' }}><strong>Assisting in Disaster Prevention and Mitigation</strong></h1>
                    <h2 id="-to-protect-our-communities-" style={{ color: '#1976d2' }}><strong>To protect our communities as a whole</strong></h2>
                    <h2 id="_-because-we-are-stronger-as-one-_" style={{ color: '#1976d2' }}><em><strong>because we are stronger as one.</strong></em></h2>
                    <h3 id="to-achieve-this-goal-information-campaigns-and-educational-efforts-should-be-developed-and-their-effectiveness-be-evaluated-and-where-possible-continually-improved">To achieve this goal, information campaigns and educational efforts should be developed and their effectiveness be evaluated and, where possible, continually improved</h3>
                    <ul>
                    <li><p><strong>Household survival plans (HSPs)</strong> should provide basic information on:</p>
                    <ul>
                    <li>what hazardous events are most likely to occur in particular communities</li>
                    <li>what emergency equipment and supplies should be on hand,</li>
                    <li>what precautions should be taken to limit damage, and</li>
                    <li>what preparations should be made for escape and evacuation.</li>
                    </ul>
                    </li>
                    <li><p>Such information might best be conveyed graphically, both in print and on television. <strong>Dramatic, easily recognizable graphic symbols</strong> signifying each natural hazard should be created and <strong>widely publicized to identify impending emergencies</strong> and quickly alert the public to the degree of seriousness and the imminence of danger.</p>
                    </li>
                    <li><p>To stimulate <strong>public awareness, brochures, posters, games, calendars,</strong> museum exhibits, public service announcements (for print, radio, and television), and even entertainment programming should be used.</p>
                    </li>
                    <li><p><strong>Community-wide planning and education</strong> should be encouraged. Schools, government organizations, community and church groups, business and neighborhood organizations, hospital and medical groups, and the news media should all be involved.</p>
                    </li>
                    <li><p><strong>Checklists, information handouts, and training videos</strong> should be created and widely distributed to convey such information as the location of nearby emergency resources. Regional and community demonstration programs, <strong>disaster day exercises, mock drills, volunteer courses</strong>, and conferences should be undertaken and evaluated for their effectiveness.</p>
                    </li>
                    </ul>
                    <hr />
                    <h2 id="-participatory-learning-" style={{color: '#1976d2' }}><strong>Participatory Learning</strong></h2>
                    <p>People are especially motivated by approaches in which they themselves participate in a solution, and especially when they believe it is their own idea.</p>
                    <blockquote>
                    <p>The focus of participatory learning is to engage people in discovery and problem solving for disaster risk reduction. At the heart of all of these activities is the community’s own experience of empowerment.</p>
                    </blockquote>
                    <p>This involves using language, stories, songs and traditions to strengthen the emerging culture of prevention. This is typically accomplished through tools such as:</p>
                    <ul>
                    <li>action-oriented research such as vulnerability and capacity assessment</li>
                    <li>disaster management planning</li>
                    <li>implementing risk reduction measures</li>
                    <li>monitoring and improving on plans through drills and simulations.</li>
                    </ul>
                    <p>These 4 elements of participatory learning can be applied at three levels:</p>
                    <ul>
                    <li><strong>The organizational level</strong> – headquarters, branches, schools, businesses, workplaces, homes</li>
                    <li><strong>The community level</strong> – being scaled up to reach villages, towns, cities, school
                    systems, and regions</li>
                    <li><p><strong>The population level</strong> – being expanded to incorporate entire urban populations,
                    by taking advantage of internet-based tools and social media.
                    Parallel tools specifically for use with children, and for marginalized populations
                    can be valuable as well.
                    Specific tools within this approach include:</p>
                    </li>
                    <li><p><strong>Publications</strong> – posters, guidelines, flyers, brochures, booklets, activity books, paper models, comic books, story books, colouring books, assembly kits and teacher resources</p>
                    </li>
                    <li><strong>Curricula, modules and presentations</strong> – teacher briefings and community training</li>
                    <li><strong>E-learning</strong> – self-study curricula</li>
                    <li><strong>Performing and cultural arts</strong> – plays, dances, poems, songs, street theatre, puppet theatre</li>
                    <li><strong>Games and competitions</strong> – card games, board games, cooperative, activities role play, drawing competitions, writing competitions, tournaments, radio quizzes</li>
                    <li><strong>Audio and video materials</strong> – short videos, radio programmes, television programmes</li>
                    <li><strong>Web pages and activities</strong> – web sites, online games, online quizzes</li>
                    <li><strong>Social media and telecommunications</strong> – SMS, early warning.</li>
                    </ul>
                </div>
                <Divider />
            </header>
            <h1 style={{ textAlign:'center', paddingBottom:'2rem', color:'#1976d2' }}>
                Latest News
            </h1>
            <Grid sx={{ flexGrow: 1 }} container spacing={'2rem'}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={'2rem'}>
                        <News />
                    </Grid>
                </Grid>
            </Grid>
            <Line />
            <Footer />
        </div>
    )
}
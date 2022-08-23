import './AboutUs.css'
import "github-markdown-css/github-markdown-light.css"
import NavBar from '../Nav/Nav'
import Footer from '../Footer/Footer';

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

export default function About({user, setUser}: Props) {
    return (
        <div>
            <NavBar isHome={false} user={user} setUser={setUser}/>
            <div className="markdown-body Container App-Logo">
                <h1 id="aboutus">About us</h1>
                <p>
                    We’re a team of undergraduate students from Indian Institute of
                    Information Technology, Sri City. We like to call ourselves the{" "}
                    <strong>Tricolored Technophiles</strong>. This website was created to
                    provide a single platform for providing information and guidance on
                    all stages of a disaster. It’s our little way of helping in preventing
                    and mitigating hazards which affect the lives of many and our
                    communities as a whole; because we are stronger as one.
                </p>
                <h1 id="missionandvalues"> Our mission and values</h1>
                <p>
                    KeyBlue prevents and alleviates human suffering in the face of
                    emergencies by mobilizing the power of volunteers and the use of
                    modern technology.
                </p>
                <h1 id="teammembers">Team members</h1>
                <h2 id="creativeteam">Creative Team</h2>
                <ul>
                    <li>
                        Paridhi Arya (UG-2, ECE) [
                        <a href="mailto:paridhi.a@iiits.in">paridhi.a@iiits.in</a>]
                    </li>
                </ul>
                <h2 id="webdevelopmentteam">Web Development Team</h2>
                <ul>
                    <li>
                        Sreevallabh Karanam (UG-2, CSE) [
                        <a href="mailto:sreevallabh.k21@iiits.in">
                            sreevallabh.k21@iiits.in
                        </a>
                        ]
                    </li>
                    <li>
                        Vaibhav Pandey (UG-2, CSE) [
                        <a href="mailto:vaibhav.p21@iiits.in">vaibhav.p21@iiits.in</a>]
                    </li>
                </ul>
                <h2 id="appdevelopmentteam">App Development Team</h2>
                <ul>
                    <li>
                        Pratik Agrawal (UG2, ECE) [
                        <a href="mailto:sreevallabh.k21@iiits.in">pratik.a21@iiits.in</a>]
                    </li>
                    <li>
                        Darshan Bennur (UG-2, CSE) [
                        <a href="mailto:sreevallabh.k21@iiits.in">darshan.b21@iiits.in</a>]
                    </li>
                    <li>
                        Pranjal Singh (UG-2, ECE) [
                        <a href="mailto:sreevallabh.k21@iiits.in">pranjal.s21@iiits.in</a>]
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}
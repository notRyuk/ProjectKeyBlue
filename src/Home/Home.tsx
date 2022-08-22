import Footer from "../Footer/Footer";
import NavBar from "../Nav/Nav";
import "./Home.css";
import logo from '../logo.svg';

export default function Home() {
    return (
        <div className="App">
            <NavBar isHome />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>App.tsx</code> and save to reload.</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <Footer />
        </div>
    )
}
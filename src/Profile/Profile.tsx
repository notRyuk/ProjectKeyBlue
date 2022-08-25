import "./Profile.css";

export default function Profile() {
    return (
        <div className="ProfileMain">
            <div className="profile">
                <div className="Name-img">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" />
                </div>
            </div>
            <div>
                <h1 className="fn">FName</h1>
                <h1 className="ln">LName</h1>
                <h1 className="em">Email</h1>
            </div>
            <div className="btn">
                <button type="submit">click me</button>
            </div>
        </div>
    );
}
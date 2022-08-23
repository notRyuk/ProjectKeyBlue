// import { Typography } from "@mui/material";
// import { useCallback, useState } from "react";
// import GoogleMapReact from 'google-map-react';
import "./Map.css";

// const AnyReactComponent = ({text}: any) => <div>{text}</div>

// export default function Map() {
//     const [location, setLocation] = useState<{ latitude: number, longitude: number }>()
//     navigator.geolocation.getCurrentPosition((position) => {
//         setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
//     }, (err) => {
//         console.log(err)
//     }, { timeout: 3000 })
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };

//     return (
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "" }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//             >
//                 <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                 />
//             </GoogleMapReact>
//         </div>
//     );

// }
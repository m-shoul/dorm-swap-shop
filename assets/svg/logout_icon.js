import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LogoutComponent = (props) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M5.10437 5H11.1044C11.6544 5 12.1044 4.55 12.1044 4C12.1044 3.45 11.6544 3 11.1044 3H5.10437C4.00437 3 3.10437 3.9 3.10437 5V19C3.10437 20.1 4.00437 21 5.10437 21H11.1044C11.6544 21 12.1044 20.55 12.1044 20C12.1044 19.45 11.6544 19 11.1044 19H5.10437V5Z"
            fill="black"
        />
        <Path
            d="M20.7544 11.65L17.9644 8.86C17.6444 8.54 17.1044 8.76 17.1044 9.21V11H10.1044C9.55437 11 9.10437 11.45 9.10437 12C9.10437 12.55 9.55437 13 10.1044 13H17.1044V14.79C17.1044 15.24 17.6444 15.46 17.9544 15.14L20.7444 12.35C20.9444 12.16 20.9444 11.84 20.7544 11.65Z"
            fill="black"
        />
    </Svg>
);
export default LogoutComponent;

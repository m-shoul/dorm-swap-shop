import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const ProfileComponent = (props) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12.5 5.9C13.66 5.9 14.6 6.84 14.6 8C14.6 9.16 13.66 10.1 12.5 10.1C11.34 10.1 10.4 9.16 10.4 8C10.4 6.84 11.34 5.9 12.5 5.9ZM12.5 14.9C15.47 14.9 18.6 16.36 18.6 17V18.1H6.4V17C6.4 16.36 9.53 14.9 12.5 14.9ZM12.5 4C10.29 4 8.5 5.79 8.5 8C8.5 10.21 10.29 12 12.5 12C14.71 12 16.5 10.21 16.5 8C16.5 5.79 14.71 4 12.5 4ZM12.5 13C9.83 13 4.5 14.34 4.5 17V19C4.5 19.55 4.95 20 5.5 20H19.5C20.05 20 20.5 19.55 20.5 19V17C20.5 14.34 15.17 13 12.5 13Z"
        //fill="black"
        />
    </Svg>
);
export default ProfileComponent;
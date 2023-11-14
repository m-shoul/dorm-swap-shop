import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SupportComponent = (props) => (
    <Svg
        width={34}
        height={34}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M12 3C7.03 3 3 7.03 3 12V19C3 20.1 3.9 21 5 21H9V13H5V12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12V13H15V21H19C20.1 21 21 20.1 21 19V12C21 7.03 16.97 3 12 3ZM7 15V19H5V15H7ZM19 19H17V15H19V19Z"
            fill="black"
        />
    </Svg>
);
export default SupportComponent;

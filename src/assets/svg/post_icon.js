import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PostComponent = (props) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12.5 7C11.95 7 11.5 7.45 11.5 8V11H8.5C7.95 11 7.5 11.45 7.5 12C7.5 12.55 7.95 13 8.5 13H11.5V16C11.5 16.55 11.95 17 12.5 17C13.05 17 13.5 16.55 13.5 16V13H16.5C17.05 13 17.5 12.55 17.5 12C17.5 11.45 17.05 11 16.5 11H13.5V8C13.5 7.45 13.05 7 12.5 7ZM12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM12.5 20C8.09 20 4.5 16.41 4.5 12C4.5 7.59 8.09 4 12.5 4C16.91 4 20.5 7.59 20.5 12C20.5 16.41 16.91 20 12.5 20Z"
            fill="black"
        />
    </Svg>
);
export default PostComponent;
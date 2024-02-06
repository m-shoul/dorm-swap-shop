import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EmailComponent = (props) => (
    <Svg
        width={24}
        height={27}
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M22 6.67819C22 5.45387 21.1 4.45215 20 4.45215H4C2.9 4.45215 2 5.45387 2 6.67819V20.0345C2 21.2588 2.9 22.2605 4 22.2605H20C21.1 22.2605 22 21.2588 22 20.0345V6.67819ZM20 6.67819L12 12.2433L4 6.67819H20ZM20 20.0345H4V8.90424L12 14.4693L20 8.90424V20.0345Z"
            fill="black"
        />
    </Svg>
);
export default EmailComponent;
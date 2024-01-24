import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ExpandComponent = (props) => (
    <Svg
        width={27}
        height={27}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15.8746 8.99953L11.9946 12.8795L8.11461 8.99953C7.72461 8.60953 7.09461 8.60953 6.70461 8.99953C6.31461 9.38953 6.31461 10.0195 6.70461 10.4095L11.2946 14.9995C11.6846 15.3895 12.3146 15.3895 12.7046 14.9995L17.2946 10.4095C17.6846 10.0195 17.6846 9.38953 17.2946 8.99953C16.9046 8.61953 16.2646 8.60953 15.8746 8.99953Z"
            fill="#B3B3B3"
        />
    </Svg>
);
export default ExpandComponent;
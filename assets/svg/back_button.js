import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackButtonComponent = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.0518 2.885C16.5618 2.395 15.7718 2.395 15.2818 2.885L6.87185 11.295C6.48185 11.685 6.48185 12.315 6.87185 12.705L15.2818 21.115C15.7718 21.605 16.5618 21.605 17.0518 21.115C17.5418 20.625 17.5418 19.835 17.0518 19.345L9.71185 12.005L17.0618 4.655C17.5418 4.165 17.5418 3.375 17.0518 2.885Z"
            fill="black"
        />
    </Svg>
);
export default BackButtonComponent;
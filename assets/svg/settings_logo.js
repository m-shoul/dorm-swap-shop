import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const SettingsLogo = (props) => (
    <Svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect width={120} height={120} rx={20} fill="white" />
        <Path
            d="M87 60C87 59.2333 86.9666 58.5 86.9 57.7333L93.1 53.0333C94.4333 52.0333 94.8 50.1666 93.9666 48.7L87.7333 37.9333C86.9 36.4666 85.1 35.8666 83.5666 36.5333L76.4 39.5666C75.1666 38.7 73.8666 37.9333 72.5 37.3L71.5333 29.6C71.3333 27.9333 69.9 26.6666 68.2333 26.6666H55.8C54.1 26.6666 52.6666 27.9333 52.4666 29.6L51.5 37.3C50.1333 37.9333 48.8333 38.7 47.6 39.5666L40.4333 36.5333C38.9 35.8666 37.1 36.4666 36.2666 37.9333L30.0333 48.7333C29.2 50.2 29.5666 52.0333 30.9 53.0666L37.1 57.7666C37.0333 58.5 37 59.2333 37 60C37 60.7666 37.0333 61.5 37.1 62.2666L30.9 66.9666C29.5666 67.9666 29.2 69.8333 30.0333 71.3L36.2666 82.0666C37.1 83.5333 38.9 84.1333 40.4333 83.4666L47.6 80.4333C48.8333 81.3 50.1333 82.0666 51.5 82.7L52.4666 90.4C52.6666 92.0666 54.1 93.3333 55.7666 93.3333H68.2C69.8666 93.3333 71.3 92.0666 71.5 90.4L72.4666 82.7C73.8333 82.0666 75.1333 81.3 76.3666 80.4333L83.5333 83.4666C85.0666 84.1333 86.8666 83.5333 87.7 82.0666L93.9333 71.3C94.7666 69.8333 94.4 68 93.0666 66.9666L86.8666 62.2666C86.9666 61.5 87 60.7666 87 60ZM62.1333 71.6666C55.7 71.6666 50.4666 66.4333 50.4666 60C50.4666 53.5666 55.7 48.3333 62.1333 48.3333C68.5666 48.3333 73.8 53.5666 73.8 60C73.8 66.4333 68.5666 71.6666 62.1333 71.6666Z"
            fill="#112D4E"
        />
    </Svg>
);
export default SettingsLogo;
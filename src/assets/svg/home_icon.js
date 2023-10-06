import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeComponent = (props) => (
  <Svg
  width={25}
  height={24}
  viewBox="0 0 25 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <Path
    d="M12.5 6.19L17.5 10.69V18.5H15.5V12.5H9.5V18.5H7.5V10.69L12.5 6.19ZM12.5 3.5L2.5 12.5H5.5V20.5H11.5V14.5H13.5V20.5H19.5V12.5H22.5L12.5 3.5Z"
    fill="black"
  />
</Svg>
);
export default HomeComponent;


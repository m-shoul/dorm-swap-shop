import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Xmark = (props) => (
    <Svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <G clipPath="url(#clip0_33_1641)">
            <Path
                d="M7.18849 19.0508C6.81935 19.4199 6.80177 20.0791 7.19728 20.4658C7.58399 20.8525 8.24317 20.8438 8.61231 20.4746L13.9912 15.0869L19.3789 20.4746C19.7568 20.8525 20.4072 20.8525 20.794 20.4658C21.1719 20.0703 21.1807 19.4287 20.794 19.0508L15.415 13.6631L20.794 8.28419C21.1807 7.90626 21.1807 7.25587 20.794 6.86915C20.3984 6.49122 19.7568 6.48243 19.3789 6.86036L13.9912 12.2481L8.61231 6.86036C8.24317 6.49122 7.5752 6.47364 7.19728 6.86915C6.81056 7.25587 6.81935 7.91505 7.18849 8.28419L12.5762 13.6631L7.18849 19.0508Z"
                fill="white"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_33_1641">
                <Rect width={28} height={28} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default Xmark;

import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_2_97"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <Rect width={20} height={20} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_2_97)">
      <Path
        d="M11.2369 17.916C9.84977 17.916 8.66816 17.4296 7.69203 16.4568C6.71592 15.4841 6.22786 14.3038 6.22786 12.916V12.4608C5.10286 12.3145 4.16189 11.8129 3.40495 10.9561C2.648 10.0992 2.26953 9.08587 2.26953 7.91599V3.87756C2.26953 3.66415 2.34171 3.48527 2.48607 3.34089C2.63045 3.19653 2.80934 3.12435 3.02274 3.12435H4.76953V2.91599C4.76953 2.73892 4.82945 2.59049 4.9493 2.4707C5.06915 2.35091 5.21765 2.29102 5.3948 2.29102C5.57195 2.29102 5.72037 2.35091 5.84003 2.4707C5.95968 2.59049 6.01951 2.73892 6.01951 2.91599V4.58266C6.01951 4.75974 5.95959 4.90818 5.83974 5.02797C5.71989 5.14776 5.57139 5.20766 5.39424 5.20766C5.21709 5.20766 5.06868 5.14776 4.94901 5.02797C4.82936 4.90818 4.76953 4.75974 4.76953 4.58266V4.37433H3.51951V7.91599C3.51951 8.83266 3.8459 9.61738 4.49868 10.2702C5.15146 10.9229 5.93618 11.2493 6.85284 11.2493C7.76951 11.2493 8.55423 10.9229 9.20701 10.2702C9.85979 9.61738 10.1862 8.83266 10.1862 7.91599V4.37433H8.93614V4.58266C8.93614 4.75974 8.87622 4.90818 8.75639 5.02797C8.63654 5.14776 8.48804 5.20766 8.31089 5.20766C8.13372 5.20766 7.98531 5.14776 7.86566 5.02797C7.746 4.90818 7.68618 4.75974 7.68618 4.58266V2.91599C7.68618 2.73892 7.74609 2.59049 7.86593 2.4707C7.98577 2.35091 8.13428 2.29102 8.31145 2.29102C8.4886 2.29102 8.637 2.35091 8.75666 2.4707C8.87631 2.59049 8.93614 2.73892 8.93614 2.91599V3.12435H10.6829C10.8964 3.12435 11.0752 3.19653 11.2196 3.34089C11.364 3.48527 11.4361 3.66415 11.4361 3.87756V7.91599C11.4361 9.08587 11.0577 10.0992 10.3007 10.9561C9.5438 11.8129 8.60282 12.3145 7.47782 12.4608V12.916C7.47782 13.9576 7.84318 14.8431 8.57391 15.5722C9.30463 16.3014 10.1919 16.666 11.2358 16.666C12.2775 16.666 13.1629 16.3014 13.8921 15.5722C14.6213 14.8431 14.9858 13.9576 14.9858 12.916V11.5682C14.5478 11.4304 14.1872 11.1758 13.9041 10.8043C13.621 10.4328 13.4794 10.0096 13.4794 9.5346C13.4794 8.94254 13.6868 8.4393 14.1014 8.02487C14.516 7.61042 15.0195 7.4032 15.6118 7.4032C16.2041 7.4032 16.7072 7.61042 17.1212 8.02487C17.5352 8.4393 17.7422 8.94254 17.7422 9.5346C17.7422 10.0096 17.6006 10.4328 17.3175 10.8043C17.0344 11.1758 16.6738 11.4304 16.2358 11.5682V12.916C16.2358 14.3038 15.7494 15.4841 14.7767 16.4568C13.8039 17.4296 12.624 17.916 11.2369 17.916ZM15.6108 10.416C15.8576 10.416 16.0662 10.3308 16.2366 10.1604C16.407 9.98999 16.4922 9.78139 16.4922 9.5346C16.4922 9.28779 16.407 9.07919 16.2366 8.90879C16.0662 8.73838 15.8576 8.65318 15.6108 8.65318C15.364 8.65318 15.1554 8.73838 14.985 8.90879C14.8146 9.07919 14.7294 9.28779 14.7294 9.5346C14.7294 9.78139 14.8146 9.98999 14.985 10.1604C15.1554 10.3308 15.364 10.416 15.6108 10.416Z"
        fill="#2F7FF2"
      />
    </G>
  </Svg>
);
export default SVGComponent;

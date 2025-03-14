import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
const SVGComponent = (props:any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_2_55"
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
    <G mask="url(#mask0_2_55)">
      <Path
        d="M8.82884 13.3333C7.24124 13.3333 5.89761 12.809 4.79794 11.7604C3.69827 10.7118 3.14844 9.43056 3.14844 7.91667C3.14844 6.40278 3.69827 5.12153 4.79794 4.07292C5.89761 3.02431 7.24124 2.5 8.82884 2.5C10.4164 2.5 11.7601 3.02431 12.8597 4.07292C13.9594 5.12153 14.5092 6.40278 14.5092 7.91667C14.5092 8.52778 14.4073 9.10417 14.2034 9.64583C13.9995 10.1875 13.7227 10.6667 13.3732 11.0833L18.267 15.75C18.4273 15.9028 18.5074 16.0972 18.5074 16.3333C18.5074 16.5694 18.4273 16.7639 18.267 16.9167C18.1068 17.0694 17.9029 17.1458 17.6553 17.1458C17.4077 17.1458 17.2038 17.0694 17.0436 16.9167L12.1497 12.25C11.7127 12.5833 11.2102 12.8472 10.6422 13.0417C10.0742 13.2361 9.4697 13.3333 8.82884 13.3333ZM8.82884 11.6667C9.92122 11.6667 10.8497 11.3021 11.6144 10.5729C12.3791 9.84375 12.7614 8.95833 12.7614 7.91667C12.7614 6.875 12.3791 5.98958 11.6144 5.26042C10.8497 4.53125 9.92122 4.16667 8.82884 4.16667C7.73645 4.16667 6.80793 4.53125 6.04326 5.26042C5.27859 5.98958 4.89625 6.875 4.89625 7.91667C4.89625 8.95833 5.27859 9.84375 6.04326 10.5729C6.80793 11.3021 7.73645 11.6667 8.82884 11.6667Z"
        fill="#1F1F1F"
      />
    </G>
  </Svg>
);
export default SVGComponent;

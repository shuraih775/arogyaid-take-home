import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const SVGComponent = ({color = "#222",...props}) => (
  <Svg
    width={33}
    height={32}
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M26.1874 31.1877H6.0523C5.38296 31.1877 4.79839 30.7349 4.63107 30.0868L2.59493 22.2004L1.82692 19.2257L0.895334 15.6174C0.655452 14.6883 1.35697 13.7827 2.31656 13.7827H3.01657V6.38975C3.01657 5.57909 3.67374 4.92192 4.4844 4.92192H8.01657V2.65558C8.01657 1.84492 8.67374 1.18774 9.4844 1.18774H23.3209C24.1316 1.18774 24.7887 1.84491 24.7887 2.65558V7.48521H27.9411C28.7518 7.48521 29.409 8.14238 29.409 8.95304V13.7827H29.9757C30.9374 13.7827 31.6393 14.692 31.3957 15.6223L27.6073 30.0917C27.4383 30.7374 26.8548 31.1877 26.1874 31.1877Z"
      fill="transparent"
    />
    <Path
      d="M8.01657 13.7827H24.7887M8.01657 13.7827V4.92192M8.01657 13.7827H3.01657M24.7887 13.7827V7.48521M24.7887 13.7827H29.409M8.01657 4.92192V2.65558C8.01657 1.84492 8.67374 1.18774 9.4844 1.18774H23.3209C24.1316 1.18774 24.7887 1.84491 24.7887 2.65558V7.48521M8.01657 4.92192H4.4844C3.67374 4.92192 3.01657 5.57909 3.01657 6.38975V13.7827M3.01657 13.7827H2.31656C1.35697 13.7827 0.655452 14.6883 0.895334 15.6174L1.82692 19.2257M24.7887 7.48521H27.9411C28.7518 7.48521 29.409 8.14238 29.409 8.95304V13.7827M29.409 13.7827H29.9757C30.9374 13.7827 31.6393 14.692 31.3957 15.6223L27.6073 30.0917C27.4383 30.7374 26.8548 31.1877 26.1874 31.1877H6.0523C5.38296 31.1877 4.79839 30.7349 4.63107 30.0868L2.59493 22.2004M1.82692 19.2257H6.87733M1.82692 19.2257L2.59493 22.2004M2.59493 22.2004H4.9153M13.4596 22.77H16.4976H19.5356M16.4976 19.5422V26.1245M11.0545 5.55483H22.0672M11.0545 9.92192H22.0672"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;

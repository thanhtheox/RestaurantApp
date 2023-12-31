import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
import { CUSTOM_COLOR } from "../../constants/color"

const SvgComponent = (props) => (
  <Svg
    width={21}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.25.688a.812.812 0 1 0 0 1.625h1.804l2.132 8.53a1.612 1.612 0 0 0 1.574 1.22H16.89a1.6 1.6 0 0 0 1.55-1.195l2.106-7.743h-1.701l-1.955 7.313H6.759L4.628 1.905A1.612 1.612 0 0 0 3.054.688H1.25Zm14.625 11.375a2.45 2.45 0 0 0-2.438 2.437 2.45 2.45 0 0 0 2.438 2.438 2.45 2.45 0 0 0 2.438-2.438 2.45 2.45 0 0 0-2.438-2.438Zm-7.313 0A2.45 2.45 0 0 0 6.126 14.5a2.45 2.45 0 0 0 2.438 2.438A2.45 2.45 0 0 0 11 14.5a2.45 2.45 0 0 0-2.438-2.438ZM11 .688V4.75H8.562L11.813 8l3.25-3.25h-2.437V.688H11Zm-2.438 13a.8.8 0 0 1 .813.812.8.8 0 0 1-.813.813.8.8 0 0 1-.812-.813.8.8 0 0 1 .813-.813Zm7.313 0a.8.8 0 0 1 .813.812.8.8 0 0 1-.813.813.8.8 0 0 1-.813-.813.8.8 0 0 1 .813-.813Z"
      fill={CUSTOM_COLOR.Primary}
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo

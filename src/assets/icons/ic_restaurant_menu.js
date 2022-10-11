import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    width={100}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h100v100H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="scale(.01)" />
      </Pattern>
      <Image
        id="b"
        width={100}
        height={100}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo

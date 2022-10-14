import * as React from 'react';
import Svg, {Path, Mask, G, Defs, Pattern, Use, Image} from 'react-native-svg';
import {memo} from 'react';
import {Text, View} from 'react-native';
import scale from '../../utils/responsive';

const SvgComponent = props => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <Path fill="url(#a)" d="M0 0h30v30H0z" />
    <Mask
      id="c"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={30}
      height={30}>
      <Path fill="url(#b)" d="M0 0h30v30H0z" />
    </Mask>
    <G mask="url(#c)">
      <Path fill="#4A4A4A" d="M0 0h30v30H0z" />
    </G>
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}>
        <Use xlinkHref="#d" transform="scale(.002)" />
      </Pattern>
      <Pattern
        id="b"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}>
        <Use xlinkHref="#d" transform="scale(.002)" />
      </Pattern>
      <Image
        id="d"
        width={500}
        height={500}
        xlinkHref="data:image/png;base64,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"
      />
      <View
        style={{
          height: scale(16),
          width: scale(16),
          backgroundColor: '#D60F0F',
          position: 'absolute',
          right: 0,
          top: 0,
          borderRadius: 360,
        }}>
        <Text style={{fontSize: scale(10), alignSelf: 'center'}}>96</Text>
      </View>
    </Defs>
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;

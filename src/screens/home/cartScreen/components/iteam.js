import {TouchableHighlight,StyleSheet, Text, View, Dimensions,Image,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import scale from '../../../../utils/responsive';
import FONT_FAMILY from '../../../../constants/fonts';
import {CUSTOM_COLOR} from '../../../../constants/color';
import { IC_Binoculars, IC_Cart, IC_CartDelete, IC_Delete, IC_Drawer, IC_Menu } from '../../../../assets/icons';
import Swipeable from 'react-native-swipeable-row';

const {width: screenWidth} = Dimensions.get('window');



const Item = props => {
  const [count1, setCount1] = useState(props.textNumber);
  const inCount = () => {
      setCount1(count1 + 1);
    };
  const decCount = () => {
    if(count1 > 1)
      setCount1(count1 - 1);
    else
      props.removeHandler(props.id);
    };
  useEffect(() => props.qtyChangeHandler(props.id, count1), [count1])

  const rightButtons = [ 
    <TouchableOpacity style={styles.viewDelete} onPress={() => props.removeHandler(props.id)}>
      <Text style={{color: CUSTOM_COLOR.White, fontSize: 11, fontFamily: FONT_FAMILY.NexaRegular}}>DELETE</Text>
      <IC_CartDelete/>
    </TouchableOpacity>,
  ];
  return (
      
    <View style={[props.style, styles.view2]} >
    
   
    <Swipeable  rightButtons={rightButtons} 

    >
  
<View style={styles.view2}>
      <View style={styles.viewImage}>
        <Image style={styles.image} source={{uri: `${props.img}`}}></Image>
      </View>

      <>
      <View style={styles.viewDad}>
      <View style={styles.viewInfo}>
        <View style={styles.viewTextName}>
          <Text style={styles.styleTextName} numberOfLines={1}>{props.textName}</Text>
        </View>
        <View style={{marginTop: scale(10)}}></View>

        <View style={styles.viewValue}>
          <TouchableOpacity style={styles.AddSub}
            onPress={decCount}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.textTouch}>-</Text>
          </TouchableOpacity>
          <Text onChange style={styles.styleTextNumber}>{count1}</Text>
          <TouchableOpacity style={styles.AddSub}
            onPress={inCount}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={styles.textTouch}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewPrice}>
          <Text style={styles.styleTextPrice}>{props.textPrice} VND</Text>
        </View>
      </View>
      </View>
      </>

      <>
      {/* <TouchableOpacity onPress={() => props.removeHandler(props.id)}> 
        <IC_CartDelete/>
      </TouchableOpacity> */}
      </>

      </View>
    </Swipeable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  // view1: {
  //   borderWidth: 1,
  //   width: screenWidth,
  //   height: scale(130),
  //   flexDirection: 'column',
  // },
  view2: {
    // borderWidth: 1,
    width: screenWidth,
    height: scale(130),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: CUSTOM_COLOR.Grey,
  },

  viewImage:{
    width: scale(120),
    height: scale(120),
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    },

  image:{
    width: '75%',
    height: '75%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDad:{
    // borderWidth: 1,
    width: scale(210),
    height: scale(120),
    marginLeft: scale(20),
    flexDirection: 'column',
    justifyContent: 'center',
    
  },
  viewInfo:{
    // borderWidth: 1,
    width: scale(210),
    height: scale(120),
    // marginLeft: scale(20),
    flexDirection: 'column',
    justifyContent: 'center',
    
  },
  viewValue: {
    width: scale(70),
    height: scale(30),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Grey,
    justifyContent: 'space-around',
    alignItems: 'center',

    
  },
  AddSub:{
    color: CUSTOM_COLOR.San_Juan,
    fontSize: scale(24),
    fontFamily: FONT_FAMILY.NexaRegular,
    lineHeight: scale(30.59),
    letterSpacing: scale(-0.67),
    opacity: scale(0.4859),


  },
  styleTextNumber: {
    fontFamily: FONT_FAMILY.NexaRegular,
    fontSize: 14,
    color: CUSTOM_COLOR.Primary,
    textAlign: 'center',
    letterSpacing: -0.47,
  },
  viewTextName: {
    width: scale(200),
    height: scale(27),
    overflow: 'hidden',
  },
  styleTextName: {
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.NexaRegular,
    fontSize: 17,
    letterSpacing: -0.39,
  },
  viewPrice: {
    // borderWidth: 1,
    width: scale(130),
    height: scale(35),
    justifyContent: 'center',
  },
  styleTextPrice: {
    color: CUSTOM_COLOR.Primary,
    fontFamily: FONT_FAMILY.NexaRegular,
    fontSize: 14,
    letterSpacing: -0.39,
  },
  textTouch: {
    color: CUSTOM_COLOR.Black,
  },
  viewDelete:{
    justifyContent: 'center',
    backgroundColor: CUSTOM_COLOR.Primary,
    flexGrow: 1,
    alignItems: 'center',
    width: scale(65),
  },
});
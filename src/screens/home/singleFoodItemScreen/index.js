import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CUSTOM_COLOR} from '../../../constants/color';
import {IC_GoBack, IC_Minus, IC_Plus} from '../../../assets/icons';
import scale from '../../../utils/responsive';
import FONT_FAMILY from '../../../constants/fonts';
import Gallery from './Gallery';

const SingleFoodItemScreen = props => {
  const {data} = props.route.params;
  const [category, setCategory] = useState([]);
  const getCategory = () => {
    const categoryURL = `https://restaurant-uit-server.herokuapp.com/category/${data.categoryId}`;

    return fetch(categoryURL)
      .then(res => res.json())
      .then(json => setCategory(json.category));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [count1, setCount1] = useState(1);
  const [price, setPrice] = useState(data.price);

  let inCount = () => {
    if (count1 < 100) {
      setCount1(count1 + 1);
      setPrice(data.price + price);
    }
  };
  let decCount = () => {
    if (count1 > 0) {
      setCount1(count1 - 1);
      setPrice(price - data.price);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <IC_GoBack style={styles.goBack} />
      </TouchableOpacity>
      <View style={styles.tittleBox}>
        <Text style={styles.screenTittle}>{data.name}</Text>
      </View>
      <View style={styles.tittleBox2}>
        <Text style={styles.screenTittle2}>{category.name}</Text>
      </View>

      <Gallery style={styles.galleryBox} images={data.images} />

 
        <View style={styles.contentBox}>
          <Text style={styles.content}>{data.description}</Text>
        </View>
        
        <View style={styles.addContainer}>
          <View style={{width: '100%'}}>
            <View style={styles.countBox}>
              <TouchableOpacity onPress={decCount}>
                <View style={styles.iconBox}>
                  <IC_Minus/>
                </View>
              </TouchableOpacity>
              <Text style={styles.amount}>{count1}</Text>
              <TouchableOpacity onPress={inCount}>
                <View style={styles.iconBox}>
                  <IC_Plus/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.price} adjustsFontSizeToFit>{Intl.NumberFormat('vn-VN').format(price)} ₫</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.AddButtonBox}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
    
      
    </SafeAreaView>
  );
};

export default SingleFoodItemScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_COLOR.White,
    flex: 1,
  },
  goBackButton: {
    position: 'absolute',
    left: scale(9),
    top: scale(18),
  },
  tittleBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: scale(20),
  },
  tittleBox2: {
    position: 'absolute',
    top: scale(23),
    left: scale(42),
  },
  screenTittle: {
    fontFamily: FONT_FAMILY.NexaBold,
    fontSize: scale(17),
    letterSpacing: scale(-0.42),
    color: CUSTOM_COLOR.Black,
  },
  screenTittle2: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(15),
    fontFamily: FONT_FAMILY.NexaRegular,
  },

  galleryBox: {
    position: 'absolute',
    top: scale(135),
    left: scale(15.5),
    width: scale(324),
    height: scale(215),
  },
  contentBox: {
    width: scale(385),
    //height: scale(36),
    top: scale(130),
    left: scale(15),
  },
  content: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(15),
    fontFamily: FONT_FAMILY.NexaRegular,
    lineHeight: scale(18),
    letterSpacing: scale(-0.39),
    opacity: 0.8,
  },

  addContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'nowrap'
  },
  countBox: {
    width: scale(108),
    height: scale(45),
    borderRadius: scale(1000),
    borderWidth: scale(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(17),
    fontFamily: FONT_FAMILY.NexaRegular,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceBox: {
    height: scale(44),
    width: scale(90),
    borderRadius: scale(8),
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: CUSTOM_COLOR.Black,
    fontSize: Math.max(25),
    fontFamily: FONT_FAMILY.NexaLight,
    lineHeight: scale(34.41),
    letterSpacing: scale(-0.75),
  },

  AddButtonBox: {
    backgroundColor: CUSTOM_COLOR.Primary,
    width: '100%',
    height: scale(44.9),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale(18),
    color: CUSTOM_COLOR.White,
    fontFamily: FONT_FAMILY.NexaRegular,
  },
});

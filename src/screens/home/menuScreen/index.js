import { StyleSheet, Text, View , SafeAreaView, ScrollView, Dimensions, FlatList} from 'react-native'
import { IMG_BestDeals1, IMG_BestDeals2, IMG_BestDeals3, IMG_BestDeals4, IMG_BestDeals5, IMG_BestDeals6, IMG_BestDeals7, IMG_BestDeals8 } from '../../../assets/images';
import { CUSTOM_COLOR } from '../../../constants/color';
import scale from '../../../utils/responsive';
import ImageTab from './components/imageTab';

const data=[
    {key: 1, source: IMG_BestDeals1, text: 'The Fancy Sandwich'},
    {key: 2, source: IMG_BestDeals2, text: 'Petty Cash Sandwich'},
    {key: 3, source: IMG_BestDeals3, text: 'Red Flag'},
    {key: 4, source: IMG_BestDeals4, text: 'Sandwiches'},
    {key: 5, source: IMG_BestDeals5, text: 'Breakfast'},
    {key: 6, source: IMG_BestDeals6, text: 'Forbidden Salad'},
    {key: 7, source: IMG_BestDeals7, text: 'Ramen'},
    {key: 8, source: IMG_BestDeals8, text: 'The Dirty Deed'},
    {key: 9, source: IMG_BestDeals1, text: 'The Fancy Sandwich'},
    {key: 10, source: IMG_BestDeals2, text: 'Petty Cash Sandwich'},
    {key: 11, source: IMG_BestDeals3, text: 'Red Flag'},
    {key: 12, source: IMG_BestDeals4, text: 'Sandwiches'},
    {key: 13, source: IMG_BestDeals5, text: 'Breakfast'},
    {key: 14, source: IMG_BestDeals6, text: 'Forbidden Salad'},
    {key: 15, source: IMG_BestDeals7, text: 'Ramen'},
    {key: 16, source: IMG_BestDeals8, text: 'The Dirty Deed'},
]

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}/>


        <FlatList 
        style={styles.scrollView} 
        contentContainerStyle={{alignContent: 'space-around'}}
        horizontal={false}
        data={data}   
        keyExtractor={tab => `${tab.key}`}
        numColumns={2}
        columnWrapperStyle={styles.wrapper}
        renderItem= {({item}) => (
            <View style={styles.view1}>
                    <ImageTab source={item.source} text={item.text}/>
                    <View style={{height: 20}}/>
                    </View>
        )}
        >
        </FlatList>
    </SafeAreaView>
  )
}

export default MenuScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
    },
    headerBar:{
        flex: 0.08,
    },
    scrollView:{
        flex: 0.92,

    },
    view1:{
        left: scale(20),
        flex: 0.5,
    },
    wrapper:{
        marginBottom: scale(5),
        
    }
    
})
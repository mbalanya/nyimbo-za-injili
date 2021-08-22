import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    TouchableOpacity,
    Image 
} from 'react-native';
import { FONTS, COLORS, SIZES, icons, images } from "../constants";
import songData from '../data/SongData';
import { useTheme } from '@react-navigation/native'

const AllSongs = ({ navigation }) => {
    const [songs, setSongs] = React.useState(songData);

    const { colors } = useTheme();

    const theme = useTheme();
    return (
        <View contentContainerStyle={{ flex: 1, paddingBottom: 0 }}>
            <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: "bold" }}>ALL SONGS</Text>
            </View>
            <View>
                <View style={{ paddingHorizontal: 0, marginTop: 0,paddingBottom: 60, backgroundColor: colors.background }}>
                    <FlatList
                        data={songs}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(category) => category.id}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    marginVertical: 5,
                                    marginHorizontal: 1,
                                    paddingVertical: SIZES.base,
                                    paddingHorizontal: SIZES.radius,
                                    borderRadius: 5,
                                    backgroundColor: colors.background,
                                    ...styles.shadow
                                }}
                                onPress={() => navigation.navigate("BookDetail", {
                                    song: item
                                })}
                            >
                                
                                <View style={{ marginLeft: 0, flexDirection: 'row', flex: 1 }}>
                                    <View style={{ margin: 5, alignContent: "center" }}>
                                        <Text style={{ ...FONTS.h2 }}>{item.songNumber}</Text>
                                    </View>
                                    <View style={{ marginLeft: 0, flexDirection: 'column', justifyContent: 'space-between', flex: 1 , backgroundColor: colors.background }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <View>
                                                <Text style={{ marginLeft: SIZES.base, color: "black", fontWeight: "bold", ...FONTS.h3 }}>{item.songName}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: colors.text, ...FONTS.body4 }} >{item.songNumber}</Text>
                                            </View> 
                                        </View>
                                        <View style={{ flexDirection: 'column'}} >
                                            <Text style={{ marginLeft: SIZES.base, color: colors.text, ...FONTS.body3 }}>({item.songTranslation})</Text>
                                        </View>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}
  

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 2,
    },
    container: {
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1/3,
        margin: 3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
    });


  export default AllSongs;
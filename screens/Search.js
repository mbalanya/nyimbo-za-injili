import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Linking, Button, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import songData from '../data/SongData';

const Search = ({ navigation }) => {
  const [songs, setSongs] = React.useState(songData);
  const [search, setSearch] = useState('');
  const [noData, setNoData] = useState(true);
  const [results, setResults] = useState([]);

  const { colors } = useTheme();

  const supportedUrl = "https://mbalanya.com";

  useEffect(() => {
    var searchSongs = []
    {songs.filter(song => song.songName.includes(search.toUpperCase()) || song.id == search).map(item => (
      searchSongs.push(item)
      ))}
      if (search !== "") {
        setResults(searchSongs)
        setNoData(false)
      }
  }, [search]);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      await Linking.openURL(url)
    }, [url])
    return <Button title={children} onPress={handlePress} />;
  };
  
  return (
    <>
      <View 
        style={[styles.header, {
        }]}
      >
          <View>
            <SearchBar
              round
              searchIcon
              onChangeText={(text) => setSearch(text)}
              onClear={(text) => setSearch('')}
              placeholder="Search Song Title or Number..."
              value={search}
            />
            
          </View>
          { noData 
          ? <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 40 }}>
            <Text style={{ fontSize: 25, color: COLORS.lightGray3 }}>Search Results will appear here!</Text>
          </View>
          : <View style={{ paddingHorizontal: 0, marginTop: 0, marginBottom: 20, backgroundColor: colors.background, paddingBottom: 40 }}>
                <FlatList
                    data={results}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(result) => result.id}
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
              }
        </View>
        <View 
            style={[styles.footer, {
            }]}
          >
            <Text style={styles.title}>Support Nyimbo Za Injili Development </Text>
            <Text style={styles.text}>We accept coffee!</Text>
            <Text style={styles.title}>M-Pesa: 0725267275</Text>
            <View style={styles.button}>
              <OpenURLButton url={supportedUrl}>mbalanya.com</OpenURLButton>
            </View>
          </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 5,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
      color: COLORS.black,
      fontSize: 20,
      marginTop: 3,
      fontWeight: 'bold'
  },
  caption: {
      color: COLORS.lightGray,
      fontSize: 18,
      lineHeight: 20,
      marginVertical: 15
  },
  text: {
    color: COLORS.black,
    fontSize:15,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize:16,
  },
  itemStyle: {
    padding: 10,
  },
  saveText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 0,
      paddingRight : 0,
      fontSize: 18,
  },
  saveButton:{
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: 15,
      paddingTop:5,
      paddingBottom:5,
      backgroundColor:'#000',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
  },
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

export default Search;
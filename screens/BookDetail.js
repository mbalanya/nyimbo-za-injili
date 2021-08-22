import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    FlatList,
    SafeAreaView
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const BookDetail = ({route, navigation}) => {

    const [song, setSong] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { song } = route.params;
        setSong(song)
    }, [song]);

    function renderSongInformationSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground 
                    source={song.songCover}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />

                {/* Color Overlay */}
                <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(240,240,232,0.9)"
                }}>
                </View>

                {/* Navigation Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: "#000"
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h2, fontWeight: "bold", color: "#000" }}>{song.songName}</Text>
                        <Text style={{ ...FONTS.body3, color: "#000" }}>({song.songTranslation})</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRight: SIZES.base }}
                        onPress={() => console.log("Click More")}
                    >
                        <Image 
                            source={icons.more_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: "#000",
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Song Cover */}
                <View style={{ flex: 5, paddingTop: SIZES.padding, alignItems: 'center' }}>
                    <Image 
                        source={song.songCover}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: "auto",
                            borderRadius: 10
                        }}
                    />
                </View>

                {/* Song Info */}
                <View style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}>
                    
                    {/* Song Number */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white, fontWeight: "bold" }}>{song.songNumber}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white, fontWeight: "bold" }}>Song Number</Text>
                    </View>

                    <LineDivider />

                    {/* verse */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white, fontWeight: "bold" }}>{song.verse}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white, fontWeight: "bold" }}>Bible Verse</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderSongDescription() {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

        let thisLyrics = song.lyrics;
        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                    <Animated.View 
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: COLORS.lightGray4,
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).
                                interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Song */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <SafeAreaView>
                            <FlatList
                                data={thisLyrics}
                                numColumns={1}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={thisLyrics => thisLyrics.id}
                                renderItem={({item}) => (
                                    <View style={{  marginVertical: SIZES.body3 }}>
                                        
                                        <View >
                                        <FlatList 
                                        data={item.wording}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.h2 }}>{item.text}</Text>}
                                        />
                                        </View>
                                        
                                    </View>
                                )}
                            />
                    </SafeAreaView>
                </ScrollView>
            </View>
        )
    }

    if (song) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                {/* Song Cover Section */}
                <View style={{ flex: 2 }}>
                    {renderSongInformationSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 4 }}>
                    {renderSongDescription()}
                </View>

                {/* Buttons */}
                <View style={{ height: 10, marginButton: 10 }}>
                    {/* {renderBottomButton()} */}
                </View>
            </View>
        )
    } else {
        return (<></>)
    }
}

export default BookDetail;
import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import { FONTS, COLORS, SIZES, icons, images } from "../constants";
import categoriesData from '../data/CategoriesData';

const Home = ({ navigation }) => {

    const titleData = {
        name: 'Nyimbo Za Injili',
        point: 200
    }

    
    const [title, setTitle] = React.useState(titleData);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);

    function renderTitle(title) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center', backgroundColor: COLORS.lightGray3 }}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: "bold" }}>Karibu kwa</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.black, fontWeight: "bold" }}>{title.name}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderCategoryHeader() {

        const renderItem = ({ item }) => {
            return (
                <>
                    <TouchableOpacity
                        style={{ flex: 1, marginRight: SIZES.padding }}
                        onPress={() => setSelectedCategory(item.id)}
                    >
                        {
                            selectedCategory == item.id && 
                            <View style={{ backgroundColor: COLORS.white, borderTopEndRadius: 7,borderTopStartRadius: 7, borderTopColor: "black", borderTopWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: SIZES.h2, color: COLORS.black, textDecorationLine: 'underline', fontWeight: "bold" }}>{item.categoryName}</Text>
                                <Text style={{ color: COLORS.black, textDecorationLine: 'underline', fontWeight: "bold" }}>({item.categoryNameTranslation})</Text>
                            </View>
                        }
                        {
                            selectedCategory != item.id && 
                            <View>
                                <Text style={{ fontSize: SIZES.h2, color: COLORS.lightGray }}>{item.categoryName}</Text>
                                <Text style={{ color: COLORS.lightGray }}>({item.categoryNameTranslation})</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </>
            )
        }

        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.radius, paddingTop: SIZES.padding }}>
                <FlatList 
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
                
            </View>
        )
    }

    function renderCategoryData() {
        var songs = []

        let selectedCategorySongs = categories.filter(a => a.id == selectedCategory)

        if (selectedCategorySongs.length > 0) {
            songs = selectedCategorySongs[0].songs
        }

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity 
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", {
                            song: item
                        })}
                    >
                        {/* Song Cover */}
                        <Image 
                            source={item.songCover}
                            resizeMode="cover"
                            style={{ width: 100, height: 120, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Song name and Translation */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.black }}>{item.songName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>({item.songTranslation})</Text>
                            </View>

                            {/* Song Info */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Image
                                    source={icons.page_filled_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Song Number: {item.songNumber}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.lightGray3, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.gray }}>{item.verse}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList 
                    data={songs}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Header Section */}
            <View style={{ height: 70 }}>
                {renderTitle(title)}
            </View>

            {/* Body Section */}
            <ScrollView style={{  }}>
                {/* Categories Section */}
                <View style={{  }}>
                    <View style={{ backgroundColor: COLORS.lightGray3 }}>
                        {renderCategoryHeader()}
                    </View>
                    <View>
                        {renderCategoryData()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
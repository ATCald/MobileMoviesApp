import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMoviesBySearch } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie>([]);
  const params = useLocalSearchParams<{ query?: string }>();

  // everytime the searchquery changes this will render
   useEffect(() => {
    const getMovies = async () => {
      if (params.query && params.query !== searchQuery) {
        try {
          setSearchQuery(params.query);
          const results = await fetchMoviesBySearch(params.query);
          setMovies(results);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getMovies();
  }, [params.query]); 

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    try {
      const results = await fetchMoviesBySearch(searchQuery)
      setMovies(results)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ImageBackground
      source={images.purpleBg}
      resizeMode="cover"
      className="flex flex-1"
    >
      <ScrollView className="w-full"
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="size-12 mt-20 mx-auto" />
        <View className="flex-1 mt-5 px-5">
          <SearchBar searchQuery={searchQuery} onChangeText={handleSearch} />
        </View>

        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          className="mt-5 pb-32 "
          contentContainerStyle={{
            justifyContent: "flex-start",
            gap: 20,
            marginBottom: 10,
          }}
          scrollEnabled={false}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default search;

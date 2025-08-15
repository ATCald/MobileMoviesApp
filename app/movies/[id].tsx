import FavoritesBtn from "@/components/FavoritesBtn";
import { icons } from "@/constants/icons";
import { fetchMoviesById } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const movieDetails = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams();

  // fetch movie for this id
  const [movieDetails, setMoviesDetails] = useState<MovieDetails | null>(null);
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getMovies = async () => {
      if (id) {
        const results = await fetchMoviesById(id.toString());
        setMoviesDetails(results);
        setMovies(results)
      }
    };
    getMovies();
  }, [id]);

  return (
    <View className="flex-1 bg-[#030014] py-10 p">
      {movieDetails ? (
        <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
        >
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
              
          <View className=" flex-col mt-5 px-5">
              <Text className="font-bold text-xl text-white mb-1">{movieDetails.title}</Text>
              <View className="flex-row">
                <Text className="font-semibold items-center text-[#a8b5db] text-sm ">{movieDetails.release_date.split('-')[0]}</Text>
                <Text className="italic text-[#a8b5db] text-sm items-center ml-2">{movieDetails.runtime}m</Text>
                <Text className="text-[#a8b5db] italic ml-2">{movieDetails.original_language}</Text>
              </View>
              <View className="flex-row bg-[#221f3d] w-[150px] h-[25px] px-1 py-1 mt-2 items-center">
                <Image source={icons.star} className="size-5"/>
                <Text className="text-bold text-white text-sm"> {Math.round(movieDetails.vote_average)}/10</Text>
                <Text className="text-[#a8b5db] text-sm text-semibold"> ({movieDetails.vote_count}) votes</Text>
              </View>
          </View>

          <View className="ml-3 mt-2">
            <FavoritesBtn movie={movies}/>
          </View>

         

          <View className="flex-col mt-5 px-5">
            <Text className="text-[#a8b5db] text-md ">Overview</Text>
            <Text className="text-[#afa1d3] font-semibold mt-2">{movieDetails.overview}</Text>
          </View>

          <View className="flex-col mt-5 px-5">
            <Text className="text-[#a8b5db] text-md">Genre</Text>
            <Text className="text-[#afa1d3]">{movieDetails.genres.map((genre) => genre.name).join(' - ') || 'N/A'}</Text>
          </View>

          <View className="flex-row mt-5 px-5">
            <Text className="text-[#a8b5db] text-md">Budget</Text>
            <Text className="text-[#afa1d3] text-sm ml-2">${movieDetails.budget / 1_000_000} million</Text>
            <Text className="text-[#a8b5db] text-md ml-5">Revenue</Text>
            <Text className="text-[#afa1d3] text-sm ml-2">${Math.round(movieDetails.revenue/ 1_000_000)}</Text>
          </View>

          
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity className=" absolute bottom-10 rounded-lg flex flex-row left-0 right-0 mx-5 bg-accent py-5 items-center justify-center z-50"
        onPress={router.back}
      >
        <Image 
          source={icons.backarrow}
          tintColor='white'
          className="font-bold items-center mr-2"
        />
        <Text className="font-bold text-lg text-white">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default movieDetails;

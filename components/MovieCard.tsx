import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FavoritesBtn from "./FavoritesBtn";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    
     <View className="w-[30%] ml-2.5">
        <Link href={`/movies/${movie.id}`} asChild>
            <TouchableOpacity>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                className="w-full h-52 rounded-lg"
                resizeMode="cover"
            />
            </TouchableOpacity>
        </Link>

        <View className="absolute mt-1 ml-1">
            <FavoritesBtn movie={movie} />
        </View>

        <Text className="text-white text-sm font-bold" numberOfLines={1}>
            {movie.title}
        </Text>
        <View className="flex-row items-center font-bold uppercase">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm justify-center items-center font-medium ml-1">
            {Math.round(movie.vote_average / 2)}
            </Text>
        </View>
        <View className="flex-row justify-between">
            <Text className="text-sm text-gray-200 font-medium">
            {movie.release_date.split("-")[0]}
            </Text>
            <Text className="text-sm text-gray-300 uppercase font-medium">MOVIE</Text>
        </View>
    </View>

  );
};

export default MovieCard;

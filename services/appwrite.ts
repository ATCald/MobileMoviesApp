import { Client, Databases, ID, Query } from "react-native-appwrite";

// track the searches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    console.log("🔍 Searching for existing term:", query);
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [ Query.equal("searchTerm", query) ]
    );
    console.log("📄 listDocuments result:", result.documents);

    if (result.documents.length > 0) {
      const existing = result.documents[0];
      console.log("✏️  Updating document", existing.$id);
      const updated = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existing.$id,
        { count: existing.count + 1 }
      );
      console.log("✅ updateDocument response:", updated);
    } else {
      console.log("➕ Creating new document for term:", query);
      const created = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
      console.log("✅ createDocument response:", created);
    }
  } catch (err) {
    console.error("❌ Appwrite error:", err);
    throw err;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined>=> {
    try {
        const result = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error)
        return undefined;
        
    }
}
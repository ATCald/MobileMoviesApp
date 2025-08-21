import { Account, Client, ID } from 'react-native-appwrite'
import 'react-native-url-polyfill/auto'

interface UserAuth {
    password: string
    username: string
}

export const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('689e1fc8002755109ac4')
    .setPlatform('com.mymoviesapp')

export const account = new Account(client)

export const signUp = ({ username, password }: UserAuth) =>
  account.create(ID.unique(), `${username}@app.local`, password, username);

export const signIn = ({ username, password }: UserAuth) =>
  account.createEmailPasswordSession(`${username}@app.local`, password);

export const currentUser = () => account.get();

export const signOut = () => account.deleteSession('current')
import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID! ,
    platform: "come.jane.FOOD",
    databaseId:'68bea58a000acef8ff83',
    userCollectionId:'68beae53003e55d75db9',
}



// Initialize Appwrite client
export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client); // This was missing!
const avatars = new Avatars(client);

// Create user function
export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        // Create account using the correct method
        // New (recommended) way to call the create method
        const newAccount = await account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: name,
        });

        if (!newAccount) throw new Error;

        // Sign in the user
        await signIn({ email, password });

        // Get avatar URL
        const avatarUrl = avatars.getInitialsURL(name);


        // Uses a single object for all parameters
        const userDocument = await databases.createDocument( {
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.userCollectionId,
            documentId: newAccount.$id,
            data: {
                accountId: newAccount.$id,
                email: newAccount.email,
                name: newAccount.name,
                avatar: avatarUrl,
            },
        });
           return userDocument;

    } catch (error) {
        throw new Error(error as string);
    }
};

// Sign in function
export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({
            email: email,
            password: password,
        });
    } catch (e){
        throw new Error(e as string);
    }
};
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            return null;
        }

        const currentUser = await databases.listDocuments({
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.userCollectionId,
            queries: [Query.equal('accountId', currentAccount.$id)],
        });

        if (!currentAccount) throw Error;

        return currentUser.documents[0];
    }catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}
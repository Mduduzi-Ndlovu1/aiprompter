import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                // Ensure database connection
                await connectToDB();

                // Find the user in the database
                const sessionUser = await User.findOne({ email: session.user.email });
                
                if (sessionUser) {
                    // Add user ID to session
                    session.user.id = sessionUser._id.toString();
                }

                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session; // Return session even if there's an error
            }
        },
        async signIn({ profile }) {
            try {
                // Ensure database connection
                await connectToDB();

                // Check if a user already exists
                const userExists = await User.findOne({ email: profile.email });

                // If user doesn't exist, create a new one
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Return false to prevent sign-in if there's an error
            }
        },
    }
});

export { handler as GET, handler as POST };

import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ session, setSession ] = useState(null);

    // Sign Up Function
    const signUpNewUser = async (email, password, fullname) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullname,
                },
            },
            
        });

        if(error) {
            console.error( "There was a problem signing up:", error.message );
            return { success: false, error };
        }
        return { success: true, data};

    };

    // Sign In Funtion
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                console.error('sign in error occured: ', error);
                return { success: false, error  };
            }
            console.log('sign in success: ', data)
            return { success: true, data };
        } catch (error) {
            console.error('There was an issue with signing in: ', error);
            
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(( { data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });


    }, []);

    // Sign out function
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error('There was an error: ', error);
        }
    }



    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}

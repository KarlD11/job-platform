import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ session, setSession ] = useState(null);
    const [ loading, setLoading ] = useState(true);

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

        if (error) {
            console.error("There was a problem signing up:", error.message);
            return { success: false, error };
        }

        if (data?.session) {
            setSession(data.session);
        }

        return { success: true, data };
    };

    // Sign In Function
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('sign in error occured: ', error);
                return { success: false, error };
            }

            if (data?.session) {
                setSession(data.session);
            }

            console.log('sign in success: ', data);
            return { success: true, data };
        } catch (error) {
            console.error('There was an issue with signing in: ', error);
            return { success: false, error };
        }
    }

    useEffect(() => {
        let mounted = true;

        const loadSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!mounted) return;
            setSession(session);
            setLoading(false);
        };

        loadSession();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            mounted = false;
            listener?.subscription?.unsubscribe();
        };
    }, []);

    // Sign out function
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('There was an error: ', error);
            return;
        }
        setSession(null);
    }



    return (
        <AuthContext.Provider value={{session, loading, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}

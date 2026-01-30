
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/LandingNavbar';
import { useState } from 'react';
import { UserAuth } from '@/context/AuthContext';


export default function SignInSection() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState("");
    const [ error, setError ] = useState("");

    const { session, signInUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session)
    console.log(email, password);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInUser(email, password)

            if(result.success) {
                navigate('/profile');

            }

        } catch (error) {
            console.error("An error occured: ", error);
            setError('An error occured')
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            {/* Navbar */}
            <LandingNavbar />
            
            <div>
            <form onSubmit={handleSignIn} className='pt-40 ml-20'>
                <h1 className="text-left text-7xl">Member Sign In</h1>
                <h4 className='pt-4'>Enter your details below. Not a memeber yet? {" "}  
                    <Link to="/signup" className='text-green-600'>
                        Get Started
                    </Link>
                </h4>
                <div className='flex flex-col py-20 max-w-md space-y-5'>
                    <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='p-3 mt-6 bg-gray-700' type="email" placeholder='Email'/>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-3 mt-6 bg-gray-700' type="password" placeholder='Password'/>

                    {error && <p className='text-red-600 pt-4'>{error}</p>}
                    
                    <div className='max-w-sm mt-15'>
                        <Button className='p-3' type='submit' disabled={loading} variant='outline'>Sign In</Button>
                    </div>
                    
                </div>

                

                </form>
            </div>
        </section>
    )
}

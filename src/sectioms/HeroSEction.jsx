


export const HeroSection = () => {
    return (
        <div className="container flex items-center 2xl:px-20 mx-auto my-10">
            <div className="border outline-none px-18 py-12 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-center mx-auto rounded-xl">
                <h2 className="text-2xl md:text-3xl font-medium mb-4">There's a job waiting to hear from you</h2>
                <p className="mb-6 max-w-xl mx-auto px-5 font-light text-sm">Start Your Career With Us!</p>
                <div className="flex items-center justify-between bg-white rounded-md text-gray-600 pl-4 mx-4 sm:mx-auto max-w-md">
                    <div>
                        <input type="text"
                        placeholder="What's Next For You?" 
                        className="max-sm:text-xs p-2 rounded-md outline-none w-full"/>
                    </div>
                    <div>
                        <input type="text"
                        placeholder="Location" 
                        className="max-sm:text-xs p-2 rounded-md outline-none w-full"/>
                    </div>
                    <button className="bg-blue-600 px-6 py-2 rounded-md text-white m-1">Search</button>
                </div>
            </div>
        </div>
    )
}
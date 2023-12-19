'use client'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

function Profile() {
    const { user, error, isLoading } = useUser();
    const { push } = useRouter();

    // arrow function that routes to the logout api from the [handleAuth] method
    const handleLogout = () => push('api/auth/logout');

    // handle isLoading state from Auth0
    if (isLoading) {
        return (
            <div>
                ...loading
            </div>
        )
    }
    // handle error state from Auth0
    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    console.log(user?.email);
    

    // main profile pagelayout
    return (
        <main className="max-w-[1900px] flex flex-col mx-auto mt-5 rounded-2xl overflow-hidden">
            <div className="h-[250px] bg-black relative" >
                <div className="h-[150px] w-[150px] rounded-full border-2 bg-gray-600 absolute -bottom-[75px] z-50 left-10 overflow-hidden">
                    <img src={user?.picture ?? 'default-image-url'} alt="" className="object-cover h-full, w-full"/>
                </div>

            </div>
            <div className="h-[300px] relative transl bg-slate-600 p-5 flex justify-between">
                <div>
                    <p className="mt-[90px] text-3xl font-bold">
                        {user?.name}
                    </p>
                    <p className="mt-[20px] text-2xl">
                        {user?.email}
                    </p>
                </div>
                <div>
                    <button onClick={handleLogout} className='border-2 border-black p-5 px-10 text-2xl rounded-lg cursor-pointer'>Log Out</button>
                </div>
            </div>
        </main>
    )
}

export default withPageAuthRequired(
    Profile, {
    onRedirecting: () => <div>Redirecting to Login ....</div>,
    onError: error => <div>{error.message}</div>
}

)
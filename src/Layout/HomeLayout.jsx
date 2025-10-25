import { Outlet } from "react-router";
import ChatIcon from "../components/AiChat/AIChat";
import Navbar from "../components/Navbar/Navbar";
import UseAuth from "../Hooks/UseAuth";
import Footer from "../components/Footer/Footer";

export function HomeLayout() {
    const { user } = UseAuth();

    // Make sure to use Firebase uid instead of _id
    const userId = user?.uid;

    return (
        <div className="min-h-screen ">
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
            {user && userId && (
                <ChatIcon user={{ id: userId, email: user.email, name: user.displayName }} />
            )}
        </div>
    );
}

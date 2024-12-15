import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// children as props, and children are of a type React.ReactNode
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main>
                <Header />
                <div className="flex">
                    <section className="flex min-h-screen flex-1 flex-col px-6 sm:px-14">
                        {/* mx-auto centers everything with margin horizontal */}
                        {/* <div className="mx-auto w-full max-w-5xl"> */}
                            {children}
                        {/* </div> */}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

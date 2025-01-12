import { Title } from "@mantine/core";
import NewsTab from "@/components/NewsTab";

// children as props, and children are of a type React.ReactNode
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main>

                <Title
                    order={1}
                    style={{
                        fontWeight: 800,
                        textAlign: "center",
                        margin: "2.5rem 0",
                    }}
                >
                    Latest News from Us
                </Title>
                <div className="flex">
                    <NewsTab/>
                    <section className="flex min-h-screen flex-1 flex-col px-6 sm:px-14">
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Layout;

import BlogLayout from "@modules/blog/layouts/blog.layout";
import SuscribeLayout from "@modules/blog/layouts/suscribe-layout";
import HomeTest from "./home-test";

const HomeBlogView = () => {
    return (
        <BlogLayout>
            <div className="section">
                <HomeTest />
            </div>
            <SuscribeLayout campaign={'newsletter'} />
        </BlogLayout>
    )
}

export default HomeBlogView;
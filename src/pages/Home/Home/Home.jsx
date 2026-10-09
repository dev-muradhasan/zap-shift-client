import Banner from "../Banner/Banner";
import BeAMerchant from "../BeAMerchant/BeAMerchant";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Reviews from "../Reviews/Reviews";


const reviewPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div className="space-y-12 md:space-y-16">
            <div>
                <Banner></Banner>
            </div>
            <div>
                <HowItWorks></HowItWorks>
            </div>
            <div>
                <OurServices></OurServices>
            </div>
            <div>
                <Brands></Brands>
            </div>
            <div>
                <Features></Features>
            </div>
            <div>
                <BeAMerchant></BeAMerchant>
            </div>
            <div>
                <Reviews reviewPromise={reviewPromise}></Reviews>
            </div>
        </div>
    );
};

export default Home;
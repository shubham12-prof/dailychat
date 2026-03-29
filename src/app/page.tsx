import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/...nextauth/options";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import UserReviews from "./components/UserReviews";

export default async function LandingPage() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar user={session?.user ?? null} />

      <HeroSection />

      <FeatureSection />

      <UserReviews />

      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/landingPage/Footer";
import UniversityCard from "../components/student/UniversityCard";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />
          <FeaturesSection />
          <UniversitiesShowcase />
          <CallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const HeroSection = () => (
  <section className="text-center  mb-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 rounded-lg shadow-xl">
    <h2 className="text-6xl font-extrabold mb-6 leading-tight">
      Find Your Perfect University
    </h2>
    <p className="text-2xl mb-10 max-w-2xl mx-auto opacity-90">
      Explore universities, view courses, and apply directly through our portal.
    </p>
    <button className="bg-white text-blue-600 py-4 px-10 rounded-full text-xl font-bold hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      Get Started
    </button>
  </section>
);

const FeaturesSection = () => (
  <section className="mb-24">
    <h3 className="text-4xl font-bold mb-12 text-gray-800 text-center">
      Our Features
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <FeatureCard
        title="Search Universities"
        description="Find the best universities tailored to your preferences."
        icon="🏫"
      />
      <FeatureCard
        title="View Courses"
        description="Explore detailed information about courses offered."
        icon="📚"
      />
      <FeatureCard
        title="Apply Online"
        description="Submit your applications easily through our portal."
        icon="📝"
      />
    </div>
  </section>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white shadow-xl rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-200">
    <div className="text-7xl mb-6 text-blue-500">{icon}</div>
    <h4 className="text-2xl font-bold mb-4 text-gray-800">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const UniversitiesShowcase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const fetchUniversities = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/universities?page=${page}&limit=2&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniversities(response.data.universities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities(page, debouncedSearchQuery);
  }, [page, debouncedSearchQuery]);

  return (
    <section className="mb-24">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {universities.map((university) => (
              <UniversityCard
                id={university._id}
                key={university._id}
                logo={university.logo || "https://dummyimage.com/30"}
                coverImage={
                  university.coverPhoto || "https://dummyimage.com/300"
                }
                name={university.name || "Unknown University"}
                description={university.about || "No description available"}
                address={
                  university.contactDetails?.address || "No address provided"
                }
                ratings={university.ratings || "N/A"}
              />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center p-5 bg-gray-100">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-16 rounded-lg shadow-2xl">
    <h3 className="text-4xl font-bold mb-6">Join Us Today</h3>
    <p className="text-xl mb-10 max-w-2xl mx-auto">
      Create your account and start exploring the best universities.
    </p>
    <button className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      Sign Up
    </button>
  </section>
);

export default LandingPage;

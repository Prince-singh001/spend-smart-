import { LuTrendingUpDown } from "react-icons/lu";
import CARD_2 from "../../assets/images/card2.png";

// ========================
// Stats Info Card
// ========================
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-lg">

      <div
        className={`w-12 h-12 flex items-center justify-center text-xl text-white rounded-full ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h4 className="text-2xl font-semibold text-gray-900">
          ${value}
        </h4>
      </div>
    </div>
  );
};

// ========================
// Auth Layout
// ========================
const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">

      {/* Left Section */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 bg-blue-200">
        <h1 className="text-lg font-medium text-blue-500 mb-6">
          SpendSmart App
        </h1>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[40vw] h-screen bg-[rgba(70,172,220,0.92)] relative overflow-hidden">

        {/* Top Left Big Rounded Shape */}
        <div className="absolute top-2 left-0 w-72 h-72  from-purple-600 to-fuchsia-600 rounded-br-[120px]" />

        {/* Right Side Rounded Border Shape */}
        <div className="absolute right-0 top-1/3 w-56 h-80 border-8 border-fuchsia-600 rounded-l-[80px]" />

        {/* Bottom Left Curve */}
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600 rounded-tr-[80px]" />

        {/* Content Wrapper */}
        <div className="relative z-10 p-10">

          {/* Floating Stats Card */}
          <div className="absolute top-16 left-16 right-10">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-purple-600"
            />
          </div>

          {/* Image Card */}
          <img
            src={CARD_2}
            alt="card"
            className="absolute top-80 left-10 w-[85%] rounded-2xl shadow-xl"
          />
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
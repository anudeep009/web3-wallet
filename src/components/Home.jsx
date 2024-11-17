import { useState, useContext } from 'react';
import { CheckCircle, Shield, BarChart3, Zap, Wallet, Globe } from 'lucide-react';


export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { isDarkMode } = true;
  const date = new Date();

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-white'}`}>
      {/* Hero Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Secure Your Crypto Assets with CryptoVault</h1>
          <p className="text-lg md:text-xl mb-8">
            The all-in-one platform for managing your cryptocurrency portfolio
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Explore More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white text-black'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose CryptoVault?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Bank-Grade Security',
                description:
                  'Your assets are protected with state-of-the-art encryption and multi-factor authentication.',
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description:
                  'Track your portfolio performance with advanced charts and insights.',
              },
              {
                icon: Zap,
                title: 'Lightning-Fast Trades',
                description:
                  'Execute trades across multiple exchanges with our high-speed API integration.',
              },
              {
                icon: Wallet,
                title: 'Multi-Wallet Support',
                description:
                  'Manage all your wallets in one place, supporting over 100 cryptocurrencies.',
              },
              {
                icon: Globe,
                title: 'Global Accessibility',
                description:
                  'Access your portfolio from anywhere in the world, on any device.',
              },
              {
                icon: CheckCircle,
                title: 'Compliance Ready',
                description:
                  'Stay compliant with built-in tax reporting and audit trail features.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg transition ${isDarkMode ? 'bg-gray-700 text-white hover:shadow-xl' : 'bg-gray-100 text-black hover:shadow-2xl'}`}
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 dark:text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-600 text-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Crypto Future?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of satisfied users who trust CryptoVault with their digital assets.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Explore More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto">
          <p>&copy; {date.getFullYear()} CryptoVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Bot, MapPin, Languages, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-blue-500" />,
      title: "AI Assistant",
      description: "Ask anything naturally. 'Where is my seat?' or 'Find the nearest food court.'"
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: "Live Mapping",
      description: "Interactive stadium map highlighting gates, restrooms, and medical rooms."
    },
    {
      icon: <Languages className="w-8 h-8 text-purple-500" />,
      title: "Multi-language",
      description: "Support for English, Hindi, Kannada, and more for global fans."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-16 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Your Smart Companion for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            FIFA World Cup 2026
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Navigate the stadium effortlessly, find amenities instantly, and get answers in your preferred language.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/chat"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            Start Chatting <ArrowRight size={20} />
          </Link>
          <Link
            to="/map"
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold transition-colors"
          >
            View Map
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 w-full">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

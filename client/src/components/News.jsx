import React from 'react';

// This component displays a list of recent news and updates.
// The data is static for this prototype but could be fetched from an API in a real application.

const News = () => {
  // An array of news article objects.
  const newsList = [
    {
      id: 1,
      headline: 'New Government Subsidy Announced for Jute Farmers in West Bengal',
      date: 'August 27, 2025',
      summary: 'The state government has announced a new subsidy to support local jute farmers, aiming to boost production and provide financial relief.',
      category: 'Agriculture'
    },
    {
      id: 2,
      headline: 'Mobile Health Clinic to Visit Hindustan Cables Town Next Week',
      date: 'August 25, 2025',
      summary: 'A free mobile health clinic will be available near the community hall, offering general check-ups and distributing essential medicines.',
      category: 'Health'
    },
    {
      id: 3,
      headline: 'Digital Literacy Workshop for Villagers Scheduled for Saturday',
      date: 'August 23, 2025',
      summary: 'A workshop focusing on basic computer skills and safe internet usage will be held at the local school to empower community members.',
      category: 'Community'
    }
  ];

  return (
    <section id="news" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 relative inline-block">
          News & Updates
          {/* Underline accent */}
          <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></span>
        </h2>

        {/* News Articles Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {newsList.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 text-left transition-shadow duration-300 flex flex-col sm:flex-row items-start"
            >
              {/* Date Section */}
              <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0 text-center">
                <div className="text-3xl font-bold text-green-600">{new Date(article.date).getDate()}</div>
                <div className="text-sm uppercase text-gray-500">{new Date(article.date).toLocaleString('default', { month: 'short' })}</div>
              </div>
              
              {/* Content Section */}
              <div className="flex-grow">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 cursor-pointer">
                  {article.headline}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

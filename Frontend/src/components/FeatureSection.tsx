const FeatureSection = () => {
    return (
      <section className="w-full h-full bg-white text-gray-800 flex flex-col justify-center items-center p-10">
         <h2 className="text-4xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
         <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p>Find people who truly match your interests and personality.</p>
         </div>
         <div className="p-6 bg-gray-100 rounded-xl shadow">
           <h3 className="text-xl font-semibold mb-2">Real Connections</h3>
           <p>Our algorithm prioritizes meaningful interactions over likes.</p>
         </div>
         <div className="p-6 bg-gray-100 rounded-xl shadow">
           <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
           <p>Your data belongs to you. We protect it with top-grade security.</p>
         </div>
        </div>
       </section>
    );
};

export default FeatureSection;

// muss noch an global.css und _app.tsx angepasst werden
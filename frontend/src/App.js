import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">¡Bienvenido a React con Tailwind!</h1>
        <p className="text-gray-700 text-center mb-6">
          Este es tu proyecto inicial, decorado con Tailwind CSS.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300">
          Presiona
        </button>
      </div>
    </div>
  );
}

export default App;

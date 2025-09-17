function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-64px)] bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Bienvenido 🎬</h1>
      <p className="text-lg text-gray-600 max-w-lg text-center">
        Desde aquí podrás gestionar directores, géneros, países, actores y películas.
      </p>
    </div>
  );
}

export default Home;

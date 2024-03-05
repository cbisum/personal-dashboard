import Button from "@/Components/Button/Button";



export default function Home() {
  return (
    <main className="flex min-h-screen mx-3 flex-col items-center p-24">
      <div className="text-center mt-8">
      <h1 className="text-4xl font-bold relative inline-block">
        Your Personal App
        <svg
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-full text-blue-500"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <rect width="100" height="1" fill="currentColor" />
        </svg>
      </h1>
    </div>
      <Button />
    </main>
  );
}

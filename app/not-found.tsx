import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-black mb-8">404</h1>

        <h2 className="text-2xl font-semibold text-black mb-8">
          Упс! Страница не найдена
        </h2>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 px-6 text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-medium"
          >
            Главная
          </Link>

          <Link
            href="/club"
            className="block w-full py-3 px-6 text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-medium"
          >
            Клуб
          </Link>

          <Link
            href="/bowling"
            className="block w-full py-3 px-6 text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-medium"
          >
            Боулинг
          </Link>

          <Link
            href="/delivery"
            className="block w-full py-3 px-6 text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-medium"
          >
            Доставка
          </Link>

          <Link
            href="/banquet"
            className="block w-full py-3 px-6 text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-medium"
          >
            Банкеты
          </Link>
        </div>
      </div>
    </div>
  );
}

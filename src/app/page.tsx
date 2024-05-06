"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [nisn, setnisn] = useState("");
  const [siswa, setSiswa] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
    const fetchAnnouncementDate = async () => {
      try {
        const response = await fetch(`${apiUrl}/waktu-pengumuman`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const announcementDate = new Date(data[0].waktu_pengumuman);
            startCountdown(announcementDate);
          } else {
            throw new Error("Invalid announcement date response");
          }
        } else {
          throw new Error("Failed to fetch announcement date");
        }
      } catch (error) {
        console.error("Error fetching announcement date:", error);
      }
    };

    fetchAnnouncementDate();
  }, [apiUrl]);


  const startCountdown = (announcementDate: Date) => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = announcementDate.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(
          `Waktu tersisa: ${days} hari ${hours} jam ${minutes} menit ${seconds} detik`
        );
        setIsDisabled(true);
      } else {
        clearInterval(intervalId);
        setCountdown("Pengumuman telah berlangsung!");
        setIsDisabled(false);
      }
    }, 1000);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/siswa/${nisn}`);
      if (response.ok) {
        const data = await response.json();
        setSiswa(data);
        setError(null);
        setLoading(false);
        router.push(`/siswa/${nisn}`);
      } else {
        setError("Siswa tidak ditemukan");
        setLoading(false);
        setSiswa(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat melakukan permintaan");
    }
  };

  useEffect(() => {
    if (isDisabled || !countdown) {
      router.replace("/");
    }
  }, [isDisabled, countdown, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <div className="max-w-lg w-full p-5 md:p-9 bg-white rounded-lg shadow-xl">
        <Image
          src="/cropped-SMKN-2-Kudus.png"
          alt="Logo Sekolah"
          className="mx-auto w-16 lg:w-20 mb-5"
          width={100}
          height={100}  
        />
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-7 text-center text-gray-800">
          Pengumuman Kelulusan SMKN 2 Kudus Tahun 2024
        </h1>
        <p className="text-sm md:text-base lg:text-lg mb-2 md:mb-4 text-center text-gray-600">
          <span className="font-semibold">{countdown}</span>
        </p>
        <form onSubmit={handleSubmit} className="mb-2 md:mb-4">
          <p className="text-sm md:text-base text-gray-800 text-center">
            Masukkan 10 Angka  <b className="text-black">NISN</b>
          </p>
          <input
            type="number"
            value={nisn}
            required
            placeholder="Masukkan NISN"
            onChange={(e) => setnisn(e.target.value)}
            className="w-full mt-5 p-1 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className={`group relative mt-5 w-full flex justify-center py-1 md:py-3 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className={`h-5 w-5 ${loading ? "animate-spin" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#eff3f6"
                  d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                />
              </svg>
            </span>
            Submit
          </button>
        </form>
        <div className="text-gray-600 text-sm flex items-center justify-center">
          <svg
            fill="gray"
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          <p className="text-xs md:text-sm">
            Jika Anda lupa NISN, silakan hubungi admin
            sekolah, wali kelas atau <a className="text-blue-500 font-bold" target="_blank" href="https://nisn.data.kemdikbud.go.id/index.php/Cindex/formcaribynama">link berikut</a>
          </p>
        </div>
        {error && <p className="text-red-500 font-bold mt-2 text-center">{error}</p>}
      </div>
     <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 py-2 text-center text-xs text-gray-500">
  &copy; Ismail TJKT {new Date().getFullYear()}. |{" "}
  <a
    href="https://github.com/username"
    target="_blank"
    rel="noopener noreferrer"
    className="text-indigo-600 hover:underline flex items-center justify-center gap-1"
  >
    <svg
      xmlns="https://github.com/KaivanKeren"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.488.5.092.682-.216.682-.482 0-.237-.009-.866-.014-1.701-2.782.604-3.37-1.338-3.37-1.338-.454-1.154-1.108-1.463-1.108-1.463-.905-.617.068-.604.068-.604 1.002.07 1.531 1.03 1.531 1.03.893 1.531 2.344 1.09 2.913.833.091-.643.349-1.088.636-1.338-2.224-.252-4.563-1.118-4.563-4.97 0-1.098.393-1.997 1.032-2.698-.103-.252-.448-1.277.098-2.66 0 0 .845-.27 2.77 1.03.803-.223 1.658-.334 2.51-.338.851.004 1.705.115 2.51.338 1.924-1.3 2.768-1.03 2.768-1.03.547 1.383.202 2.408.1 2.66.64.701 1.03 1.6 1.03 2.698 0 3.861-2.344 4.714-4.574 4.961.36.313.679.926.679 1.864 0 1.346-.012 2.429-.012 2.759 0 .269.18.581.688.482C19.139 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      ></path>
    </svg>
    GitHub
  </a>
</footer>
    </main>
    
  );
}

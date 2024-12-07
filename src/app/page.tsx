"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Clock } from "lucide-react";

export default function Home() {
  const [nisn, setNisn] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isDisabled, setIsDisabled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchAnnouncementDate = async () => {
      try {
        const response = await fetch(`${apiUrl}/waktu-pengumuman`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const announcementDate = new Date(data[0].waktu_pengumuman);
            startCountdown(announcementDate);
          }
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
        setCountdown(`${days} hari • ${hours} jam • ${minutes} menit`);
        setIsDisabled(true);
      } else {
        clearInterval(intervalId);
        setCountdown("Pengumuman Dimulai!");
        setIsDisabled(false);
      }
    }, 1000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nisn.length !== 10) {
      setError("NISN harus 10 digit");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/siswa/${nisn}`);
      if (response.ok) {
        const data = await response.json();
        setError(null);
        setLoading(false);
        router.push(`/siswa/${nisn}`);
      } else {
        setError("NISN tidak ditemukan");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Gagal terhubung");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-600 text-white p-6 text-center">
            <Image
              src="/cropped-SMKN-2-Kudus.png"
              alt="Logo Sekolah"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">SMKN 2 Kudus</h1>
            <p className="text-sm opacity-80">
              Pengumuman Kelulusan {currentYear}
            </p>
          </div>

          {/* Countdown Section */}
          {countdown && (
            <div className="bg-blue-50 p-3 text-center flex items-center justify-center space-x-2 text-blue-600">
              <Clock size={18} />
              <span className="font-medium text-sm">{countdown}</span>
            </div>
          )}

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                value={nisn}
                required
                placeholder="Masukkan NISN"
                onChange={(e) => {
                  const value = e.target.value.slice(0, 10);
                  setNisn(value);
                }}
                className="w-full p-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-wider"
              />

              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center space-x-2 
              ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
              >
                {loading ? (
                  <div className="animate-pulse">Memproses...</div>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Cek Kelulusan</span>
                  </>
                )}
              </button>

              {error && (
                <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </form>

            <div className="mt-4 text-center text-gray-500 text-xs">
              <p>
                Lupa NISN? Hubungi Admin, Wali Kelas atau
                <a
                  href="https://nisn.data.kemdikbud.go.id/index.php/Cindex/formcaribynama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold ml-1 hover:underline"
                >
                  Cek Online
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a
              href="https://github.com/KaivanKeren/"
              target="_blank"
              className="hover:underline text-blue-500"
            >
              Ismail
            </a>
            . TJKT
          </span>
        </div>
      </footer>
    </>
  );
}

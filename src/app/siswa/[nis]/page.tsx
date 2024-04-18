"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Image from "next/image";

interface Siswa {
  program_keahlian: string;
  kompetensi_keahlian: string;
  nama: string;
  tempat_tanggal_lahir: string;
  nama_orangtua: string;
  nis: string;
  nisn: string;
  status: string;
}

export default function Siswa() {
  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const nis = window.location.pathname.split("/").pop();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/siswa/${nis}`);
        setSiswa(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal memuat data siswa !");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const element = document.getElementById("siswa-info");
    const opt = {
      margin: 1,
      filename: "Surat Pengumuman Kelulusan.pdf",
    };
    html2pdf().from(element).set(opt).save();
  };

   const shortenName = (name: string) => {
    const words = name.split(" ");
    if (words.length === 5) {
      words[4] = words[4].charAt(0) + "."; // Mengambil huruf pertama dari kata kelima dan menambahkan titik
      return words.slice(0, 5).join(" ");
    }
    return name;
  };


  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 font-bold text-2xl justify-center items-center text-center mt-5">
        {error}
      </div>
    );
  if (!siswa) return <div>Data siswa tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-5 md:mx-auto bg-white rounded-md shadow-md p-4 sm:p-8 my-8">
      <div className="max-w-lg hidden mx-auto bg-white border rounded-md p-8 my-8">
        <div id="siswa-info" className="flex flex-col p-14 -mt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
 <img
  src="/Logo Provinsi Jawa Tengah.png"
  width={100}
  height={120}
  alt="Logo Provinsi Jawa Tengah"
  className="mt-5 mr-3 md:mr-0"
/>
</div>

            <div className="-ml-80 border-spacing-x-3 pb-5 border-b-4 border-black">
              <p className="text-center text-lg font-bold">
                PEMERINTAH PROVINSI JAWA TENGAH
              </p>
              <p className="text-center text-lg font-bold">
                DINAS PENDIDIKAN DAN KEBUDAYAAN
              </p>
              <p className="text-center text-2xl font-bold">
                SMK NEGERI 2 KUDUS
              </p>
              <p className="text-center text-sm">
                Jalan : Desa Rejosari Dawe Kudus Kode Pos 59353 Telp. (0291)
                4101149
              </p>
              <p className="text-center text-sm">
                Website &nbsp;
                <a
                  href="https://www.smkn2kudus.sch.id"
                  className="text-blue-500 underline"
                >
                  www.smkn2kudus.sch.id
                </a>
                , Surat Elektronik smk2kudus@gmail.com
              </p>
            </div>
          </div>
          <h2 className="text-lg font-bold text-center mb-2">
            SURAT PENGUMUMAN KELULUSAN
          </h2>
          <h3 className="text-lg font-bold text-center mb-2">
            SMK NEGERI 2 KUDUS
          </h3>
          <h3 className="text-lg font-bold text-center mb-6">
            TAHUN PELAJARAN 2023/2024
          </h3>
          <p className="text-center underline mb-4">Nomor : </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-bold">Program Keahlian</p>
              <p className="font-bold">Kompetensi Keahlian</p>
            </div>
            <div>
              <p>: {siswa.program_keahlian}</p>
              <p>: {siswa.kompetensi_keahlian}</p>
            </div>
          </div>
          <p className="text-justify mb-4">
            Yang bertanda tangan di bawah ini, Kepala Sekolah Menengah Kejuruan
            Negeri 2 Kudus, Provinsi Jawa Tengah menerangkan bahwa :
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p>Nama</p>
              <p>Tempat dan Tanggal Lahir</p>
              <p>Nama Orang Tua/Wali</p>
              <p>Nomor Induk Siswa</p>
              <p>Nomor Induk Siswa Nasional</p>
            </div>
            <div>
              <p>: {shortenName(siswa.nama)}</p>
              <p>: {siswa.tempat_tanggal_lahir}</p>
              <p>: {siswa.nama_orangtua}</p>
              <p>: {siswa.nis}</p>
              <p>: {siswa.nisn}</p>
            </div>
          </div>
          <div className="text-center mb-8">
            <p className="text-lg leading-6">Dinyatakan</p>
            <p className="text-3xl font-bold">{siswa.status}</p>
          </div>
          <p className="text-justify mb-8">
            dari satuan pendidikan berdasarkan kriteria kelulusan Sekolah
            Menengah Kejuruan Negeri 2 Kudus Tahun Pelajaran 2023/2024.
          </p>
          <div className="flex justify-end mb-4">
            <div className="text-right">
              <p className="text-sm">Kudus, 6 Mei 2024</p>
              <p className="text-sm mb-16">Kepala Sekolah,</p>
              <p className="mt-4 text-lg font-bold">BUDI SUSANTO, S.Pd, M.Pd</p>
              <p className="text-sm">NIP. 19670815 199512 1 003</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-xs sm:text-sm md:text-base mb-4 md:p-10 bg-gray-100 border rounded-md shadow-md">
        <div className="hidden font-bold md:block">
          <p>Nama</p>
          <p>Tempat dan Tanggal Lahir</p>
          <p>Nama Orang Tua/Wali</p>
          <p>Nomor Induk Siswa</p>
          <p>Nomor Induk Siswa Nasional</p>
          <p>Program Keahlian</p>
          <p>Kompetensi Keahlian</p>
        </div>
        <div>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">Nama :</span>
            <span className="hidden md:block">:</span>{shortenName(siswa.nama)}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Tempat dan Tanggal Lahir :
            </span>
            <span className="hidden md:block">:</span>{siswa.tempat_tanggal_lahir}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Nama Orang Tua/Wali :
            </span>
            <span className="hidden md:block">:</span>{siswa.nama_orangtua}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Nomor Induk Siswa :
            </span>
            <span className="hidden md:block">:</span>{siswa.nis}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Nomor Induk Siswa Nasional :
            </span>
            <span className="hidden md:block">:</span>{siswa.nisn}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Program Keahlian :
            </span>
            <span className="hidden md:block">:</span>{siswa.program_keahlian}
          </p>
          <p className="mb-2 md:mb-0 md:flex md:gap-1">
            <span className="block md:hidden font-bold">
              Kompetensi Keahlian :
            </span>
            <span className="hidden md:block">:</span>{siswa.kompetensi_keahlian}
          </p>
        </div>
      </div>
      {siswa.status === "Lulus" && (
        <div className="mx-auto p-3 w-full md:text-base sm:text-sm text-xs bg-gray-100 border rounded-md shadow-md">
          <h1 className="font-bold">Selamat</h1>
          <p className="text-gray-800 md:text-sm">
            Anda dinyatakan <b>Lulus</b> dari satuan pendidikan SMKN 2 Kudus
          </p>
        </div>
      )}
      {siswa.status === "Tidak Lulus" && (
        <div className="mx-auto p-3 w-full md:text-base sm:text-sm text-xs bg-red-50 border rounded-md">
          <h1 className="font-bold">Maaf</h1>
          <p className="text-gray-800 md:text-sm">
            Anda dinyatakan <b>Tidak Lulus</b> dari satuan pendidikan SMKN 2
            Kudus
          </p>
        </div>
      )}
      <button
        onClick={downloadPDF}
        className="flex px-5 my-5 py-2 text-xs sm:text-sm md:text-base items-center justify-center gap-6 w-full rounded-md shadow-sm bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white"
      >
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="#ffffff"
            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
          />
        </svg>
        Download Bukti Kelulusan
      </button>
    </div>
  );
}

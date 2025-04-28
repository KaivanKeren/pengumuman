"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { Download } from "lucide-react";
import Footer from "@/app/components/Footer";
import { Separator } from "@/components/ui/separator";

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

interface ConfigData {
  id: number;
  tanggal_surat: string;
  nomor_surat: string;
  nama_kepala_sekolah: string;
  jabatan_kepala_sekolah: string;
  nip_kepala_sekolah: string;
  tahun_ajaran: string;
  ttd_kepala_sekolah: string;
}

export default function Siswa() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [siswa, setSiswa] = useState<Siswa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConfigData>({
    id: 0,
    tanggal_surat: "",
    nomor_surat: "",
    nama_kepala_sekolah: "",
    jabatan_kepala_sekolah: "",
    nip_kepala_sekolah: "",
    tahun_ajaran: "",
    ttd_kepala_sekolah: "",
  });
  const [signatureFile, setSignatureFile] = useState<any[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const nisn = window.location.pathname.split("/").pop();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/siswa/${nisn}`);
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

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/config/siswa`);

        if (!response.ok) {
          throw new Error("Failed to fetch config data");
        }

        const data = await response.json();
        setConfig(data);

        // Initialize form data with current values
        setFormData({
          id: data.id || 0,
          tanggal_surat: data.tanggal_surat || "",
          nomor_surat: data.nomor_surat || "",
          nama_kepala_sekolah: data.nama_kepala_sekolah || "",
          jabatan_kepala_sekolah: data.jabatan_kepala_sekolah || "",
          nip_kepala_sekolah: data.nip_kepala_sekolah || "",
          tahun_ajaran: data.tahun_ajaran || "",
          ttd_kepala_sekolah: data.ttd_kepala_sekolah || "",
        });

        // If there's an existing signature, add it to FilePond
        if (data.ttd_kepala_sekolah) {
          const signatureUrl = data.ttd_kepala_sekolah.startsWith("data:")
            ? data.ttd_kepala_sekolah
            : `${
                process.env.NEXT_PUBLIC_STORAGE_URL
              }/${data.ttd_kepala_sekolah.replace(/^\/+/, "")}`;

          setSignatureFile([
            {
              source: signatureUrl,
              options: {
                type: "local",
              },
            },
          ]);
        }
      } catch (err) {
        setError("Failed to load configuration data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [apiUrl]);

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
      words[3] = words[3].charAt(0) + ".";
      words[4] = words[4].charAt(0) + ".";
      return words.join(" ");
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
    <>
      <div className="max-w-4xl mx-5 md:mx-auto bg-white rounded-md shadow-md p-4 sm:p-8 my-8">
        <div className="max-w-lg hidden mx-auto bg-white border rounded-md p-8 my-8">
          <div id="siswa-info" className="flex flex-col p-14 pb-1.5 -mt-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="ml-4 mt-2">
                <Image
                  src="/Logo Provinsi Jawa Tengah.png"
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 17vw, 100px"
                  alt="Logo Provinsi Jawa Tengah"
                  className="w-auto h-auto max-w-full"
                  style={{ objectFit: "contain", maxHeight: "120px" }}
                  priority
                />
              </div>

              <div className="-ml-72">
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
            <Separator className="h-1 bg-black" orientation="horizontal" />
            <h2 className="text-lg font-bold text-center">
              SURAT PENGUMUMAN KELULUSAN
            </h2>
            <h3 className="text-lg font-bold text-center">
              SMK NEGERI 2 KUDUS
            </h3>
            <h3 className="text-lg font-bold text-center mb-3">
              TAHUN PELAJARAN {formData.tahun_ajaran}
            </h3>
            <p className="text-center underline mb-4">
              Nomor : {formData.nomor_surat}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="font-bold">Program Keahlian</p>
                <p className="font-bold ml-5">Kompetensi Keahlian</p>
              </div>
              <div>
                <p>: {siswa.program_keahlian}</p>
                <p>: {siswa.kompetensi_keahlian}</p>
              </div>
            </div>
            <p className="text-justify mb-4">
              Yang bertanda tangan di bawah ini, Kepala Sekolah Menengah
              Kejuruan Negeri 2 Kudus, Provinsi Jawa Tengah menerangkan bahwa :
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
              <p className="text-3xl font-bold uppercase">{siswa.status}</p>
            </div>
            <p className="text-justify mb-8">
              dari satuan pendidikan berdasarkan kriteria kelulusan Sekolah
              Menengah Kejuruan Negeri 2 Kudus Tahun Pelajaran{" "}
              {formData.tahun_ajaran}.
            </p>
            <div className="flex justify-end mb-4">
              <div className="text-left">
                <p className="text-sm">
                  Kudus,{" "}
                  {new Date(formData.tanggal_surat).toLocaleDateString(
                    "id-ID",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </p>

                <p className="text-sm mb-5 z-10">Kepala Sekolah,</p>
                {formData.ttd_kepala_sekolah && (
                  <Image
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 15vw, 80px"
                    className="w-auto h-auto max-w-full"
                    style={{ objectFit: "contain", maxHeight: "100px" }}
                    priority
                    src={
                      formData.ttd_kepala_sekolah.startsWith("data:")
                        ? formData.ttd_kepala_sekolah
                        : `${storageUrl}/${formData.ttd_kepala_sekolah.replace(
                            /^\/+/,
                            ""
                          )}`
                    }
                    alt="TTD"
                  />
                )}

                <p className="text-lg font-bold z-10">
                  {formData.nama_kepala_sekolah}
                </p>
                <p className="text-sm">{formData.jabatan_kepala_sekolah}</p>
                <p className="text-sm">NIP. {formData.nip_kepala_sekolah}</p>
              </div>
            </div>
            <div className="mx-auto pt-1 mt-4 w-full text-center">
              <Separator className="h-1" orientation="horizontal" />
              <p>
                <span className="font-bold">Catatan</span> : Surat ini mohon
                dicetak/print dan digunakan sebagai bukti untuk pengambilan SKL
              </p>
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
              <span className="hidden md:block">:</span>
              {shortenName(siswa.nama)}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Tempat dan Tanggal Lahir :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.tempat_tanggal_lahir}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Nama Orang Tua/Wali :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.nama_orangtua}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Nomor Induk Siswa :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.nis}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Nomor Induk Siswa Nasional :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.nisn}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Program Keahlian :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.program_keahlian}
            </p>
            <p className="mb-2 md:mb-0 md:flex md:gap-1">
              <span className="block md:hidden font-bold">
                Kompetensi Keahlian :
              </span>
              <span className="hidden md:block">:</span>
              {siswa.kompetensi_keahlian}
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
        {siswa.status === "Lulus Bersyarat" && (
          <div className="mx-auto p-3 w-full md:text-base sm:text-sm text-xs bg-red-50 border rounded-md">
            <h1 className="font-bold">Maaf</h1>
            <p className="text-gray-800 md:text-sm">
              Anda dinyatakan <b>Lulus Bersyarat</b> dari satuan pendidikan SMKN
              2 Kudus
            </p>
          </div>
        )}
        <button
          onClick={downloadPDF}
          className="flex px-5 my-5 py-2 text-xs sm:text-sm md:text-base items-center justify-center gap-6 w-full rounded-md shadow-sm bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white"
        >
          <Download />
          Download Bukti Kelulusan
        </button>
      </div>
      <Footer />
    </>
  );
}

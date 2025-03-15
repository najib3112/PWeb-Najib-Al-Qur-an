import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailTafsir = () => {
    const { id } = useParams(); 
    const [detail, setDetail] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`https://equran.id/api/v2/tafsir/${id}`);
                setDetail(response.data.data); 
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError("Terjadi kesalahan saat mengambil data."); 
            } finally {
                setLoading(false); 
            }
        };
        fetchDetail();
    }, [id]);

   
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    
    if (!detail) return <div className="p-4">Data tidak ditemukan.</div>;


    const removeHtmlTags = (text) => {
        return text.replace(/<[^>]*>/g, ''); 
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{detail.namaLatin} ({detail.nama})</h1>
            <p className="mt-2"><strong>Arti:</strong> {removeHtmlTags(detail.arti)}</p>
            <p className="mt-2"><strong>Jumlah Ayat:</strong> {detail.jumlahAyat}</p>
            <p className="mt-2"><strong>Tempat Turun:</strong> {detail.tempatTurun}</p>

            <h2 className="mt-4 text-xl font-semibold">Deskripsi:</h2>
            <p className="mt-2">{removeHtmlTags(detail.deskripsi)}</p>

            <h2 className="mt-4 text-xl font-semibold">Tafsir:</h2>
            <ul className="mt-2">
                {detail.tafsir && detail.tafsir.map((tafsir, index) => (
                    <li key={index} className="mt-1">
                        <strong>Ayat {tafsir.ayat}:</strong> <br />
                        <span>{removeHtmlTags(tafsir.teks)}</span>
                    </li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl font-semibold">Audio Bacaan:</h2>
            <ul className="mt-2">
                {Object.entries(detail.audioFull).map(([key, audioUrl]) => (
                    <li key={key} className="mt-1">
                        <audio controls>
                            <source src={audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <span className="ml-2">Qari {key}</span>
                    </li>
                ))}
            </ul>

            <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
                Kembali ke Daftar Surat
            </Link>
        </div>
    );
};

export default DetailTafsir;
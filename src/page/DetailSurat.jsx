import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailSurat = () => {
    const { id } = useParams(); 
    const [detail, setDetail] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{detail.namaLatin} ({detail.nama})</h1>
            <p className="mt-2"><strong>Arti:</strong> {detail.arti}</p>
            <p className="mt-2"><strong>Jumlah Ayat:</strong> {detail.jumlahAyat}</p>
            <p className="mt-2"><strong>Tempat Turun:</strong> {detail.tempatTurun}</p>
            <p className="mt-2"><strong>Urutan:</strong> {detail.nomor}</p>

            <h2 className="mt-4 text-xl font-semibold">Ayat:</h2>
            <ul className="mt-2">
                {detail.ayat && detail.ayat.map((ayat, index) => (
                    <li key={index} className="mt-1">
                        <strong>{ayat.nomorAyat}:</strong> {ayat.teksArab} <br />
                        <span className="text-gray-600">{ayat.teksLatin}</span> <br />
                        <span className="text-gray-500">{ayat.teksIndonesia}</span>
                        <div className="mt-1">
                            <strong>Audio:</strong>
                            <audio controls className="ml-2">
                                <source src={ayat.audio["01"]} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl font-semibold">Audio Bacaan:</h2>
            <audio controls>
                <source src={detail.audioFull["01"]} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <span className="ml-2">Audio Bacaan Qari 01</span>

            <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
                Kembali ke Daftar Surat
            </Link>
        </div>
    );
};

export default DetailSurat;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [surat, setSurat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurat = async () => {
            try {
                const response = await axios.get('https://equran.id/api/v2/surat');
                console.log(response.data); 
                setSurat(response.data.data); 
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Gagal mengambil data surat.");
            } finally {
                setLoading(false);
            }
        };
        fetchSurat();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Surat</h1>
            <ul className="space-y-2">
                {surat.map(s => (
                    <li key={s.nomor} className="border p-2 rounded">
                        <Link to={`/detail/${s.nomor}`} className="text-blue-500 hover:underline">
                            <h2 className="font-bold">{s.namaLatin} ({s.nama})</h2>
                            <p>Jumlah Ayat: {s.jumlahAyat}</p>
                            <p>Tempat Turun: {s.tempatTurun}</p>
                            <p>Arti: {s.arti}</p>
                        </Link>
                        <Link to={`/tafsir/${s.nomor}`} className="text-green-500 hover:underline mt-2 block">
                            Lihat Tafsir
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
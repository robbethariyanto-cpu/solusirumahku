import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const firebaseConfig = {
  projectId: config.projectId,
  appId: config.appId,
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, config.firestoreDatabaseId);

const defaultCategories = [
  { id: '1', name: 'Alat Listrik', icon: 'zap' },
  { id: '2', name: 'Lampu & Penerangan', icon: 'lightbulb' },
  { id: '3', name: 'Kabel & Steker', icon: 'plug' },
  { id: '4', name: 'Perkakas Tangan', icon: 'hammer' },
  { id: '5', name: 'Perkakas Mesin', icon: 'drill' },
  { id: '6', name: 'Peralatan Tukang', icon: 'tool' },
  { id: '7', name: 'Baterai & Senter', icon: 'battery' },
  { id: '8', name: 'Aksesoris Listrik', icon: 'cpu' },
  { id: '9', name: 'Perlengkapan Rumah', icon: 'home' },
  { id: '10', name: 'Kran & Pipa', icon: 'droplet' },
  { id: '11', name: 'Kotak & Penyimpanan', icon: 'box' },
];

const defaultProducts = [
  {
    id: 'p1',
    categoryId: '1',
    brand: 'Broco',
    name: 'Stop Kontak 4 Lubang + Saklar',
    price: 35000,
    description: 'Stop kontak berkualitas dari Broco dengan 4 lubang dan saklar on/off individual untuk keamanan.',
    specs: ['4 Lubang', 'Kabel 1.5 Meter', 'Maksimal 10A / 250V', 'SNI'],
    image: 'https://images.unsplash.com/photo-1558227031-64d88e637cc3?auto=format&fit=crop&q=80&w=400',
    stock: 50,
    favoriteRank: 1,
  },
  {
    id: 'p2',
    categoryId: '4',
    brand: 'Tekiro',
    name: 'Obeng Plus Minus Set',
    price: 45000,
    description: 'Set obeng presisi dari bahan Chrome Vanadium yang kuat dan tahan lama dengan gagang karet anti-slip.',
    specs: ['Bahan CR-V', 'Gagang Karet', 'Termasuk Obeng (+) dan (-)'],
    image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=80&w=400',
    stock: 30,
    favoriteRank: 2,
  },
  {
    id: 'p3',
    categoryId: '2',
    brand: 'Philips',
    name: 'Lampu LED 10 Watt Putih',
    price: 32000,
    description: 'Lampu hemat energi dengan cahaya putih terang, tahan hingga 15.000 jam pemakaian.',
    specs: ['Daya 10 Watt', 'Warna Cool Daylight (Putih)', 'Fitting E27'],
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400',
    stock: 100,
    favoriteRank: 3,
  },
  {
    id: 'p4',
    categoryId: '5',
    brand: 'Bosch',
    name: 'Mesin Bor Tembok 13mm',
    price: 550000,
    description: 'Mesin bor tangguh untuk mengebor beton, besi, dan kayu. Dilengkapi fitur variable speed dan putaran bolak-balik.',
    specs: ['Daya 550 Watt', 'Kapasitas Chuck 13mm', 'Impact Rate 0-41600 bpm'],
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400',
    stock: 15,
  },
  {
    id: 'p5',
    categoryId: '3',
    brand: 'Eterna',
    name: 'Kabel Listrik NYM 2x1.5 (50 Meter)',
    price: 320000,
    description: 'Kabel instalasi rumah standar SNI, aman dan tahan lama untuk pemasangan di dalam ruangan.',
    specs: ['Tipe NYM', 'Ukuran 2x1.5 mm', 'Panjang 50 Meter', 'Warna Putih'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=400',
    stock: 20,
  },
  {
    id: 'p6',
    categoryId: '9',
    brand: 'Kenmaster',
    name: 'Gembok Pagar Kuningan 50mm',
    price: 28000,
    description: 'Gembok bahan kuningan solid yang anti karat, cocok untuk mengamankan pagar atau pintu.',
    specs: ['Bahan Kuningan', 'Ukuran 50mm', 'Termasuk 3 Anak Kunci'],
    image: 'https://images.unsplash.com/photo-1558000143-a6ecfb58fbf6?auto=format&fit=crop&q=80&w=400',
    stock: 45,
  },
  {
    id: 'p7',
    categoryId: '4',
    brand: 'Nankai',
    name: 'Set Obeng Presisi 32 in 1',
    price: 25000,
    description: 'Set obeng lengkap untuk memperbaiki berbagai barang elektronik kecil.',
    specs: ['32 Mata Obeng', 'Bahan Baja CR-V', 'Kotak Penyimpanan'],
    image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=80&w=400',
    stock: 25,
  },
  {
    id: 'p8',
    categoryId: '10',
    brand: 'Toto',
    name: 'Kran Air Tembok',
    price: 125000,
    description: 'Kran air berkualitas untuk kamar mandi dengan bahan kuningan anti karat.',
    specs: ['Bahan Kuningan', 'Finishing Chrome', 'Ukuran Drat 1/2 Inch'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    stock: 40,
  },
  {
    id: 'p9',
    categoryId: '2',
    brand: 'Hannochs',
    name: 'Lampu LED Downlight 12W',
    price: 45000,
    description: 'Lampu plafon (downlight) tipis dan terang, cocok untuk interior modern.',
    specs: ['12 Watt', 'Warna Putih 6500K', 'Bentuk Bulat'],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=400',
    stock: 60,
  },
  {
    id: 'p10',
    categoryId: '7',
    brand: 'Energizer',
    name: 'Baterai AA Alkaline (Isi 4)',
    price: 38000,
    description: 'Baterai alkaline tahan lama untuk berbagai perangkat elektronik Anda.',
    specs: ['Ukuran AA', 'Tegangan 1.5V', 'Anti Bocor'],
    image: 'https://images.unsplash.com/photo-1610421255869-2f22292f70b1?auto=format&fit=crop&q=80&w=400',
    stock: 150,
  },
  {
    id: 'p11',
    categoryId: '11',
    brand: 'Lion Star',
    name: 'Kotak Perkakas (Toolbox) Besar',
    price: 95000,
    description: 'Kotak penyimpanan serbaguna untuk merapikan perkakas kerja Anda.',
    specs: ['Bahan Plastik Tebal', '2 Susun', 'Kunci Klip'],
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=400',
    stock: 20,
  }
];

const seed = async () => {
  for (const cat of defaultCategories) {
    await setDoc(doc(db, 'categories', cat.id), cat);
  }
  for (const prod of defaultProducts) {
    await setDoc(doc(db, 'products', prod.id), prod);
  }
  console.log('Seeding complete');
  process.exit(0);
};

seed();

import andersonChevrolet from '../assets/portfolio/commercial/Anderson_Chevrolet_Kingman_Az.webp';
import aquilaPlace from '../assets/portfolio/commercial/Aquila_Place_Apache_Junction.webp';
import arizonaFinancial from '../assets/portfolio/commercial/Arizona_Financial_Kingman_Az.webp';
import bjBrewhouseQueenCreek from '../assets/portfolio/commercial/BJ_Brewhouse_Queen_Creek_Az.webp';
import bjBrewhousePhoenix from '../assets/portfolio/commercial/BJ_Brewhouse_Phoenix_Az.webp';
import freseniusMedical from '../assets/portfolio/commercial/Fresenius_Medical_Care_Kingman_Az.webp';
import greenprintApartments from '../assets/portfolio/commercial/Greenprint_Apartments_Phoenix_AZ.webp';
import historicalDowntownBuilding from '../assets/portfolio/commercial/Historical_Downtown_Building_Kingman_Az.webp';
import historicalDowntown from '../assets/portfolio/commercial/Historical_Downtown_Kingman_Az.webp';
import hondaDealership from '../assets/portfolio/commercial/Honda_Dealership_Kingman_Az.webp';
import hyundaiGilbert from '../assets/portfolio/commercial/Hyundai_Gilbert_Gilbert_Az.webp';
import jimmyJohns from '../assets/portfolio/commercial/Jimmy_Johns_Kingman_Az.webp';
import kmrcMainCampus from '../assets/portfolio/commercial/KMRC_Medical_Center_Main_Campus_Kingman_Az.webp';
import krmcHualapaiMountain from '../assets/portfolio/commercial/KRMC_Hualapai_Mountain_Campus_Kingman_Az.webp';
import krmcMedicalMain from '../assets/portfolio/commercial/KRMC_Medical_Center_Main_Kingman_Az.webp';
import laQuintaHotel from '../assets/portfolio/commercial/La_Quinta_Hotel_Kingman_Az.webp';
import ldsChurch from '../assets/portfolio/commercial/LDS_Church_Addition_Litchfield_Park_Az.webp';
import medicalFacility from '../assets/portfolio/commercial/Medical_Facility_Kingman_Az.webp';
import lasVegas28th from '../assets/portfolio/commercial/28th_Sunrise_Las_Vegas_Nv_6.webp';
import dunkinDonut from '../assets/projects/Dunkin Donut Plaza_Kingman Az.webp';
import eosFitness from '../assets/projects/EOS Fitness_Tempe Az.webp';
import goodAndGather from '../assets/projects/Good and Gather_ Phoenix Az.webp';
import customHome3 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_3.webp';
import customHome4 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_4.webp';
import customHome5 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_5.webp';
import customHome6 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_6.webp';
import hospiceHome from '../assets/portfolio/residential/Hospice_Home_Kingman_Az.webp';
import surpriseHome from '../assets/portfolio/residential/Surprise_Custom_Home_Surprise_Az.webp';

export const COMMERCIAL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'multi-family', label: 'Multi-Family' },
  { id: 'medical', label: 'Medical' },
  { id: 'government', label: 'Government' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'retail', label: 'Retail' },
  { id: 'dealerships', label: 'Dealerships' },
  { id: 'industrial', label: 'Industrial' },
];

export const RESIDENTIAL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'custom-home', label: 'Custom Homes' },
  { id: 'development', label: 'Developments' },
  { id: 'model-home', label: 'Model Homes' },
];

export const commercialProjects = [
  { id: 'aquila-place', name: 'Aquila Place', location: 'Apache Junction, AZ', category: 'multi-family', trade: 'Roofing & Stucco', src: aquilaPlace },
  { id: 'greenprint-apartments', name: 'Greenprint Apartments', location: 'Phoenix, AZ', category: 'multi-family', trade: 'Stucco', src: greenprintApartments },
  { id: '28th-sunrise-las-vegas', name: '28th & Sunrise', location: 'Las Vegas, NV', category: 'multi-family', trade: 'Stucco', src: lasVegas28th },
  { id: 'kmrc-main-campus', name: 'KMRC Medical Center', location: 'Kingman, AZ', category: 'medical', trade: 'Roofing', src: kmrcMainCampus },
  { id: 'krmc-hualapai', name: 'KRMC Hualapai Mountain Campus', location: 'Kingman, AZ', category: 'medical', trade: 'Roofing', src: krmcHualapaiMountain },
  { id: 'krmc-medical-main', name: 'KRMC Medical Center', location: 'Kingman, AZ', category: 'medical', trade: 'Roofing', src: krmcMedicalMain },
  { id: 'fresenius-medical', name: 'Fresenius Medical Care', location: 'Kingman, AZ', category: 'medical', trade: 'Roofing', src: freseniusMedical },
  { id: 'medical-facility-kingman', name: 'Medical Facility', location: 'Kingman, AZ', category: 'medical', trade: 'Roofing', src: medicalFacility },
  { id: 'anderson-chevrolet', name: 'Anderson Chevrolet', location: 'Kingman, AZ', category: 'dealerships', trade: 'Roofing', src: andersonChevrolet },
  { id: 'hyundai-gilbert', name: 'Hyundai Gilbert', location: 'Gilbert, AZ', category: 'dealerships', trade: 'Roofing', src: hyundaiGilbert },
  { id: 'honda-dealership', name: 'Honda Dealership', location: 'Kingman, AZ', category: 'dealerships', trade: 'Roofing', src: hondaDealership },
  { id: 'la-quinta-kingman', name: 'La Quinta Hotel', location: 'Kingman, AZ', category: 'hospitality', trade: 'Roofing', src: laQuintaHotel },
  { id: 'bj-brewhouse-queen-creek', name: "BJ's Brewhouse", location: 'Queen Creek, AZ', category: 'restaurants', trade: 'Roofing', src: bjBrewhouseQueenCreek },
  { id: 'bj-brewhouse-phoenix', name: "BJ's Brewhouse", location: 'Phoenix, AZ', category: 'restaurants', trade: 'Roofing', src: bjBrewhousePhoenix },
  { id: 'jimmy-johns-kingman', name: "Jimmy John's", location: 'Kingman, AZ', category: 'restaurants', trade: 'Roofing', src: jimmyJohns },
  { id: 'dunkin-donut-kingman', name: 'Dunkin Donut Plaza', location: 'Kingman, AZ', category: 'restaurants', trade: 'Roofing', src: dunkinDonut },
  { id: 'good-gather-phoenix', name: 'Good & Gather', location: 'Phoenix, AZ', category: 'retail', trade: 'Roofing', src: goodAndGather },
  { id: 'eos-fitness-tempe', name: 'EOS Fitness', location: 'Tempe, AZ', category: 'retail', trade: 'Roofing', src: eosFitness },
  { id: 'arizona-financial', name: 'Arizona Financial', location: 'Kingman, AZ', category: 'retail', trade: 'Roofing', src: arizonaFinancial },
  { id: 'historical-downtown-building', name: 'Historical Downtown Building', location: 'Kingman, AZ', category: 'industrial', trade: 'Roofing', src: historicalDowntownBuilding },
  { id: 'historical-downtown', name: 'Historical Downtown', location: 'Kingman, AZ', category: 'industrial', trade: 'Roofing', src: historicalDowntown },
  { id: 'lds-church-litchfield', name: 'LDS Church Addition', location: 'Litchfield Park, AZ', category: 'government', trade: 'Roofing', src: ldsChurch },
];

export const residentialProjects = [
  { id: 'custom-home-kingman-3', name: 'Custom Home', location: 'Kingman, AZ', category: 'custom-home', trade: 'Roofing & Stucco', src: customHome3 },
  { id: 'custom-home-kingman-4', name: 'Custom Home', location: 'Kingman, AZ', category: 'custom-home', trade: 'Roofing & Stucco', src: customHome4 },
  { id: 'custom-home-kingman-5', name: 'Custom Home', location: 'Kingman, AZ', category: 'custom-home', trade: 'Roofing', src: customHome5 },
  { id: 'custom-home-kingman-6', name: 'Custom Home', location: 'Kingman, AZ', category: 'custom-home', trade: 'Roofing', src: customHome6 },
  { id: 'hospice-home-kingman', name: 'Kian & Diana Hospice Home', location: 'Kingman, AZ', category: 'custom-home', trade: 'Roofing', src: hospiceHome },
  { id: 'surprise-custom-home', name: 'Custom Home', location: 'Surprise, AZ', category: 'custom-home', trade: 'Roofing & Stucco', src: surpriseHome },
];

export const allProjects = [...commercialProjects, ...residentialProjects];

// ===================== SAMPLE DATA (would come from MySQL/Firebase via API in production) =====================

const QUICK_ACCESS = [
  {icon:"📜",en:"Schemes",te:"పథకాలు",page:"schemes"},
  {icon:"🌾",en:"Land Services",te:"భూమి సేవలు",page:"land"},
  {icon:"🚜",en:"Agriculture",te:"వ్యవసాయం",page:"agriculture"},
  {icon:"💼",en:"Jobs",te:"ఉద్యోగాలు",page:"jobs"},
  {icon:"🏥",en:"Health",te:"ఆరోగ్యం",page:"health"},
  {icon:"🎓",en:"Education",te:"విద్య",page:"education"},
  {icon:"🚌",en:"Transport",te:"రవాణా",page:"transport"},
  {icon:"🪪",en:"MeeSeva",te:"మీసేవ",page:"villageservices"},
  {icon:"🛒",en:"Marketplace",te:"మార్కెట్",page:"marketplace"},
  {icon:"🚨",en:"Emergency",te:"అత్యవసరం",page:"emergency"},
  {icon:"🏗️",en:"Development",te:"అభివృద్ధి",page:"development"},
  {icon:"📝",en:"Complaints",te:"ఫిర్యాదులు",page:"complaints"},
];

const UPDATES = [
  {date:"28 Jun 2026",en:"Rythu Bharosa next installment dates announced for Kharif season.",te:"ఖరీఫ్ సీజన్‌కు రైతు భరోసా తదుపరి విడత తేదీలు ప్రకటించబడ్డాయి."},
  {date:"24 Jun 2026",en:"Dharani portal updated with new mutation tracking feature.",te:"ధరణి పోర్టల్‌లో కొత్త మ్యుటేషన్ ట్రాకింగ్ ఫీచర్ జోడించబడింది."},
  {date:"20 Jun 2026",en:"MGNREGS job card renewal camp scheduled at Gram Panchayat office.",te:"గ్రామ పంచాయతీ కార్యాలయంలో MGNREGS జాబ్ కార్డ్ పునరుద్ధరణ శిబిరం."},
  {date:"15 Jun 2026",en:"Free health camp by Aarogyasri team this Saturday.",te:"ఈ శనివారం ఆరోగ్యశ్రీ బృందం ద్వారా ఉచిత ఆరోగ్య శిబిరం."},
];

const SCHEMES = {
  central:[
    {name:"PM Kisan Samman Nidhi",icon:"🌱",eligibility:"All landholding farmer families",documents:"Aadhaar, Land Records, Bank Passbook",benefits:"₹6,000/year in 3 installments",lastDate:"31 Jul 2026",link:"https://pmkisan.gov.in"},
    {name:"Ayushman Bharat (PMJAY)",icon:"🏥",eligibility:"BPL families as per SECC database",documents:"Aadhaar, Ration Card",benefits:"₹5 lakh health cover per family/year",lastDate:"Ongoing",link:"https://pmjay.gov.in"},
    {name:"PM Awas Yojana (Gramin)",icon:"🏠",eligibility:"Houseless / kutcha house families",documents:"Aadhaar, Income Certificate",benefits:"₹1.2 lakh house construction assistance",lastDate:"31 Aug 2026",link:"https://pmayg.nic.in"},
    {name:"PM Fasal Bima Yojana",icon:"🌾",eligibility:"All farmers growing notified crops",documents:"Land Records, Aadhaar, Bank Details",benefits:"Crop insurance against natural calamities",lastDate:"15 Jul 2026",link:"https://pmfby.gov.in"},
  ],
  state:[
    {name:"Rythu Bharosa",icon:"🚜",eligibility:"All farming families in Telangana",documents:"Pattadar Passbook, Aadhaar",benefits:"₹10,000/acre/year investment support",lastDate:"Ongoing",link:"https://rythubharosa.telangana.gov.in"},
    {name:"Rythu Bima",icon:"🛡️",eligibility:"Farmers aged 18-59",documents:"Aadhaar, Land Records, Nominee Details",benefits:"₹5 lakh life insurance cover",lastDate:"Ongoing",link:"https://rythubima.telangana.gov.in"},
    {name:"Kalyana Lakshmi / Shaadi Mubarak",icon:"💍",eligibility:"Girls from BPL families at marriage",documents:"Aadhaar, Income Certificate, Marriage Invitation",benefits:"₹1,00,116 financial assistance",lastDate:"3 months from marriage",link:"https://kalyanalakshmi.telangana.gov.in"},
    {name:"Telangana Dalit Bandhu",icon:"🤝",eligibility:"SC families in Telangana",documents:"Caste Certificate, Aadhaar",benefits:"₹10 lakh business assistance",lastDate:"Ongoing",link:"#"},
    {name:"Aasara Pension",icon:"👵",eligibility:"Elderly, widows, disabled, weavers",documents:"Aadhaar, Age/Disability Proof",benefits:"Monthly pension ₹2,016–₹4,016",lastDate:"Ongoing",link:"#"},
  ]
};

const LAND_SERVICES = [
  {icon:"🖥️",en:"Dharani Services",te:"ధరణి సేవలు",desc:"Online land record management portal for Telangana.",link:"https://medak.telangana.gov.in/service/land-records/"},
  {icon:"📘",en:"Pattadar Passbook",te:"పట్టాదార్ పాస్‌బుక్",desc:"Apply for / download digital passbook for agricultural land.",link:"https://bhubharati.telangana.gov.in/knowLandStatus"},
  {icon:"🔄",en:"Mutation",te:"మ్యుటేషన్",desc:"Transfer of land ownership records after sale/inheritance.",link:"https://www.india.gov.in/services/details/telangana-mutation-e-passbook-application-form"},
  {icon:"📝",en:"Registration",te:"రిజిస్ట్రేషన్",desc:"Register land/property documents at sub-registrar office.",link:"https://registration.telangana.gov.in/"},
  {icon:"📐",en:"Survey",te:"సర్వే",desc:"Land survey and boundary demarcation requests.",link:"https://bhubharati.telangana.gov.in/knowLandStatus"},
  {icon:"📄",en:"Encumbrance Certificate",te:"ఎన్‌కంబరెన్స్ సర్టిఫికెట్",desc:"Verify property is free of legal/financial liabilities.",link:"#"},
  {icon:"🏗️",en:"Land Conversion",te:"భూమి మార్పిడి",desc:"Convert agricultural land to non-agricultural use (NALA).",link:"#"},
];

const AGRI_SERVICES = [
  {icon:"🚜",en:"Rythu Bharosa",te:"రైతు భరోసా",desc:"Investment support scheme for farmers.",link:"https://rythubharosa.telangana.gov.in/"},
  {icon:"🛡️",en:"Rythu Bima",te:"రైతు బీమా",desc:"Life insurance scheme for farmers.",link:"https://www.rythubharosa.telangana.gov.in/Default_Home.aspx"},
  {icon:"🌦️",en:"Crop Insurance",te:"పంట బీమా",desc:"Insurance against crop loss due to calamities.",link:"https://agritech.tnau.ac.in/banking/crbank_nasb_4bofindia_crop%20finance.html"},
  {icon:"🌱",en:"Seeds",te:"విత్తనాలు",desc:"Subsidized quality seed distribution centers.",link:"https://ossds.telangana.gov.in/"},
  {icon:"🧪",en:"Fertilizers",te:"ఎరువులు",desc:"Fertilizer availability and subsidy information.",link:"https://agriolms.telangana.gov.in/Default.aspx"},
  {icon:"☁️",en:"Weather Updates",te:"వాతావరణ సమాచారం",desc:"Daily forecasts for farming decisions.",link:"https://mausam.imd.gov.in/hyderabad/"},
  {icon:"💰",en:"Market Prices",te:"మార్కెట్ ధరలు",desc:"Daily mandi prices for crops.",link:"https://www.agriplus.in/prices/all/telangana/hyderabad"},
  {icon:"💡",en:"Farming Tips",te:"వ్యవసాయ చిట్కాలు",desc:"Expert advice for better yield."},
];

const JOBS = [
  {icon:"🏛️",en:"Government Jobs",te:"ప్రభుత్వ ఉద్యోగాలు",desc:"Latest TSPSC, Panchayat & district recruitment notifications.",link:"https://websitenew.tgpsc.gov.in/notifications"},
  {icon:"🏢",en:"Private Jobs",te:"ప్రైవేట్ ఉద్యోగాలు",desc:"Local company & factory job openings.",link:"https://www.linkedin.com/jobs/private-jobs-hyderabad/?currentJobId=4431592652&originalSubdomain=in"},
  {icon:"👷",en:"MGNREGS",te:"MGNREGS",desc:"100 days guaranteed rural employment scheme work.",link:"https://mgnregaweb2.nic.in/"},
  {icon:"🛠️",en:"Skill Development",te:"నైపుణ్యాభివృద్ధి",desc:"Free skill training programs (TS-PRIDE, etc.)",link:"https://tspride.telangana.gov.in/"},
  {icon:"🎓",en:"Apprenticeships",te:"అప్రెంటిస్‌షిప్‌లు",desc:"On-job training opportunities for youth.",link:"https://www.apprenticeship.gov.in/"},
];

const BUSINESS = [
  {icon:"🛒",en:"Kirana Shops",te:"కిరాణా దుకాణాలు"},{icon:"🥛",en:"Milk Collection Centres",te:"పాల సేకరణ కేంద్రాలు"},
  {icon:"💊",en:"Medical Shops",te:"మెడికల్ షాపులు"},{icon:"🔧",en:"Hardware Shops",te:"హార్డ్‌వేర్ షాపులు"},
  {icon:"🐔",en:"Poultry Farms",te:"పౌల్ట్రీ ఫారాలు"},{icon:"🐄",en:"Dairy Farms",te:"పాడి పరిశ్రమ"},
  {icon:"🌾",en:"Fertilizer Shops",te:"ఎరువుల దుకాణాలు"},{icon:"🏪",en:"Local Businesses",te:"స్థానిక వ్యాపారాలు"},
];

const HEALTH = [
  {icon:"🏥",en:"Hospitals",te:"ఆసుపత్రులు"},{icon:"➕",en:"PHCs",te:"పీహెచ్‌సీలు"},
  {icon:"💳",en:"Aarogyasri",te:"ఆరోగ్యశ్రీ"},{icon:"🚑",en:"Ambulance",te:"అంబులెన్స్"},
  {icon:"🩸",en:"Blood Banks",te:"రక్తనిధులు"},{icon:"⛺",en:"Health Camps",te:"ఆరోగ్య శిబిరాలు"},
];

const EDUCATION = [
  {icon:"🏫",en:"Schools",te:"పాఠశాలలు"},{icon:"🎓",en:"Colleges",te:"కళాశాలలు"},
  {icon:"💸",en:"Scholarships",te:"స్కాలర్‌షిప్‌లు"},{icon:"🛏️",en:"Hostels",te:"హాస్టళ్లు"},
  {icon:"📚",en:"Libraries",te:"గ్రంథాలయాలు"},
];

const TRANSPORT = [
  {icon:"🚌",en:"Bus Timings",te:"బస్సు సమయాలు"},{icon:"🗺️",en:"Bus Routes",te:"బస్సు మార్గాలు"},
  {icon:"🚆",en:"Railway Information",te:"రైల్వే సమాచారం"},
];

const VILLAGE_SERVICES = [
  {icon:"🖥️",en:"MeeSeva",te:"మీసేవ"},{icon:"🪪",en:"Aadhaar",te:"ఆధార్",link:"https://meeseva.telangana.gov.in/meeseva/home.htm"},
  {icon:"🗳️",en:"Voter ID",te:"ఓటర్ ఐడీ"},{icon:"👶",en:"Birth Certificate",te:"జనన ధృవీకరణ పత్రం",link:"https://voters.eci.gov.in/"},
  {icon:"🕊️",en:"Death Certificate",te:"మరణ ధృవీకరణ పత్రం"},{icon:"💰",en:"Income Certificate",te:"ఆదాయ ధృవీకరణ పత్రం",link:"https://bnd.ghmc.gov.in/Death_Certificate.aspx"},
  {icon:"📜",en:"Caste Certificate",te:"కుల ధృవీకరణ పత్రం"},{icon:"🏠",en:"Residence Certificate",te:"నివాస ధృవీకరణ పత్రం",link:"https://castcertificatewb.gov.in/"},
];

const MARKETPLACE = [
  {icon:"🔁",en:"Buy & Sell",te:"కొనుగోలు & అమ్మకం"},{icon:"🚜",en:"Agriculture Equipment",te:"వ్యవసాయ పరికరాలు"},
  {icon:"🐐",en:"Livestock",te:"పశువులు"},{icon:"🚗",en:"Used Vehicles",te:"వాడిన వాహనాలు"},
];

const EMERGENCY = [
  {icon:"👮",en:"Police",te:"పోలీసు",num:"100"},{icon:"🔥",en:"Fire",te:"అగ్నిమాపక దళం",num:"101"},
  {icon:"🚑",en:"Ambulance",te:"అంబులెన్స్",num:"108"},{icon:"⚡",en:"Electricity",te:"విద్యుత్",num:"1912"},
  {icon:"🚰",en:"Water Supply",te:"నీటి సరఫరా",num:"1916"},
];

const DEVELOPMENT = [
  {icon:"🛣️",en:"Roads",te:"రోడ్లు"},{icon:"🚰",en:"Water Supply",te:"నీటి సరఫరా"},
  {icon:"🕳️",en:"Drainage",te:"డ్రైనేజీ"},{icon:"💡",en:"Street Lights",te:"వీధి దీపాలు"},
  {icon:"🌳",en:"Parks",te:"పార్కులు"},{icon:"🏛️",en:"Community Hall",te:"కమ్యూనిటీ హాల్"},
  {icon:"🚻",en:"Public Toilets",te:"పబ్లిక్ టాయిలెట్లు"},
];

const WEATHER_MARKET = [
  {en:"Today's Weather",te:"ఈరోజు వాతావరణం",value:"32°C, Partly Cloudy"},
  {en:"Rice (per quintal)",te:"వరి (క్వింటాల్‌కు)",value:"₹2,150"},
  {en:"Cotton (per quintal)",te:"పత్తి (క్వింటాల్‌కు)",value:"₹7,400"},
  {en:"Maize (per quintal)",te:"మొక్కజొన్న (క్వింటాల్‌కు)",value:"₹2,020"},
];

const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const vehicles = [
    {brand:'Toyota',model:'Avanza',generation:'Gen 3',yearStart:2022,bodyType:'MPV',engine:'1.5L',pcd:'5x100',boltCount:5,centerBore:60.1,stockOffset:40,nutSize:'M12x1.25',oemTire:'185/60 R15',oemWheel:'6Jx15 ET40',tirePressure:'33 PSI',description:'All New Avanza DNGA',upgradeNotes:'PCD 5x100 baru'},
    {brand:'Toyota',model:'Innova',generation:'Zenix',yearStart:2022,bodyType:'MPV',engine:'2.0L Hybrid',pcd:'5x114.3',boltCount:5,centerBore:60.1,stockOffset:40,nutSize:'M12x1.5',oemTire:'215/55 R17',oemWheel:'7Jx17 ET40',tirePressure:'33 PSI',description:'Innova TNGA-C',upgradeNotes:'R17 standar'},
    {brand:'Toyota',model:'Fortuner',generation:'Gen 2',yearStart:2016,bodyType:'SUV',engine:'2.4L Diesel',pcd:'6x139.7',boltCount:6,centerBore:106.1,stockOffset:30,nutSize:'M12x1.5',oemTire:'265/65 R17',oemWheel:'7.5Jx17 ET30',tirePressure:'33 PSI',description:'SUV ladder frame',upgradeNotes:'R18 populer'},
    {brand:'Honda',model:'Jazz',generation:'GK',yearStart:2014,bodyType:'Hatchback',engine:'1.5L',pcd:'4x100',boltCount:4,centerBore:64.1,stockOffset:45,nutSize:'M12x1.5',oemTire:'185/55 R16',oemWheel:'6.5Jx16 ET45',tirePressure:'33 PSI',description:'Honda Jazz GK',upgradeNotes:'R17 populer'},
    {brand:'Honda',model:'HR-V',generation:'Gen 2',yearStart:2022,bodyType:'SUV',engine:'1.5L Turbo',pcd:'5x114.3',boltCount:5,centerBore:64.1,stockOffset:40,nutSize:'M12x1.5',oemTire:'215/55 R17',oemWheel:'7Jx17 ET40',tirePressure:'33 PSI',description:'All New HR-V',upgradeNotes:'R18 populer'},
    {brand:'Mitsubishi',model:'Xpander',generation:'Gen 1',yearStart:2017,bodyType:'MPV',engine:'1.5L',pcd:'5x114.3',boltCount:5,centerBore:66.1,stockOffset:40,nutSize:'M12x1.5',oemTire:'205/55 R16',oemWheel:'6.5Jx16 ET40',tirePressure:'33 PSI',description:'MPV terlaris',upgradeNotes:'R17 populer'},
    {brand:'Suzuki',model:'Jimny',generation:'Gen 4',yearStart:2019,bodyType:'Off-Road',engine:'1.5L',pcd:'5x139.7',boltCount:5,centerBore:108,stockOffset:5,nutSize:'M12x1.5',oemTire:'195/80 R15',oemWheel:'5.5Jx15 ET5',tirePressure:'26 PSI',description:'Off-road legendaris',upgradeNotes:'PCD unik 5x139.7'},
    {brand:'Hyundai',model:'Creta',generation:'Gen 2',yearStart:2022,bodyType:'SUV',engine:'1.5L',pcd:'5x114.3',boltCount:5,centerBore:67.1,stockOffset:40,nutSize:'M12x1.5',oemTire:'215/60 R17',oemWheel:'7Jx17 ET40',tirePressure:'33 PSI',description:'Compact SUV Hyundai',upgradeNotes:'R18 populer'},
    {brand:'Wuling',model:'Almaz',generation:'-',yearStart:2019,bodyType:'SUV',engine:'1.5L Turbo',pcd:'5x114.3',boltCount:5,centerBore:60.1,stockOffset:40,nutSize:'M12x1.5',oemTire:'215/55 R17',oemWheel:'7Jx17 ET40',tirePressure:'33 PSI',description:'SUV Wuling',upgradeNotes:'R18 populer'},
  ];
  for (const v of vehicles) {
    const id = v.brand+v.model+v.generation;
    await p.vehicle.upsert({where:{id},update:v,create:{id,...v}});
  }
  const brands = [
    {name:'Bridgestone',country:'Jepang',category:'Premium',founded:1931,description:'Produsen ban terbesar',strengths:['Kualitas konsisten'],weaknesses:['Harga tinggi'],popularItems:['Ecopia EP150','Turanza T005A'],priceRange:'Rp 350rb-3jt',type:'tire'},
    {name:'Dunlop',country:'Jepang',category:'Mid-Range',founded:1889,description:'Brand legendaris',strengths:['Performa sporty'],weaknesses:['Umur tapak'],popularItems:['SP Sport LM705'],priceRange:'Rp 350rb-2.5jt',type:'tire'},
    {name:'GT Radial',country:'Indonesia',category:'Budget',founded:1951,description:'Produk Indonesia',strengths:['Harga terjangkau'],weaknesses:['Kurang premium'],popularItems:['Champiro Eco'],priceRange:'Rp 250rb-1.2jt',type:'tire'},
    {name:'Enkei',country:'Jepang',category:'Premium',founded:1950,description:'Velg forged',strengths:['Ringan'],weaknesses:['Harga tinggi'],popularItems:['RPF1'],priceRange:'Rp 2jt-15jt/pc',type:'wheel'},
  ];
  for (const b of brands) {
    await p.brand.upsert({where:{name:b.name},update:b,create:{id:b.name.toLowerCase(),...b}});
  }
  const glossary = [
    {term:'PCD',category:'Velg',definition:'Pitch Circle Diameter',example:'5x114.3'},
    {term:'Offset (ET)',category:'Velg',definition:'Jarak mounting ke centerline',example:'ET35'},
    {term:'Center Bore',category:'Velg',definition:'Diameter lubang tengah velg',example:'Toyota 60.1mm'},
    {term:'Load Index',category:'Ban',definition:'Kapasitas beban maksimal',example:'88 = 560kg'},
    {term:'Speed Rating',category:'Ban',definition:'Kecepatan maksimal ban',example:'H = 210km/h'},
  ];
  for (const g of glossary) {
    await p.glossaryTerm.upsert({where:{term:g.term},update:g,create:{id:g.term.toLowerCase().replace(/[^a-z0-9]/g,'-'),...g}});
  }
  console.log('Seeded OK');
}
main().catch(console.error).finally(()=>p.());

var catalog = [];

$('document').ready(function(){
	 $.get("http://raw.githubusercontent.com/OpenExoplanetCatalogue/oec_tables/master/comma_separated/open_exoplanet_catalogue.txt", function(data) {
		fillCatalog(catalog,parseText(data),function(){
			for(p in catalog){
				if(catalog[p].surfTempC<60 && catalog[p].surfTempC>0 && catalog[p].jMass<.03){
					console.log(catalog[p])
				}
			}
		});
	    });
});

function parseText(txt){
	txt = txt.split('\n');
	txt.splice(0,30);
	for(e in txt){
		var ne=txt[e].split(',');
		txt[e]=ne;
	}
	return txt;
};

function fillCatalog(cat, data, Callback){
	for(planet in data){
		cat.push(new Exoplanet(data[planet]));
	}
	Callback();
	//console.log(catalog);
}

function Exoplanet(kEntry){
	this.id=kEntry[0];
	this.binary=parseInt(kEntry[1]); // 0=no known stellar binary companion; 1=P-type binary (circumbinary); 2=S-type binary; 3=orphan planet (no star)
	this.jMass=parseFloat(kEntry[2]); // Jupiter Masses
	this.jRad=parseFloat(kEntry[3]); // Jupiter radii
	this.period=parseFloat(kEntry[4]); // days
	this.semiMajor=parseFloat(kEntry[5]); // AU
	this.ecc=parseFloat(kEntry[6]);
	this.periast=parseFloat(kEntry[7]); // degrees
	this.longitude=parseFloat(kEntry[8]); // degrees
	this.ascendNode=parseFloat(kEntry[9]);// degrees
	this.incline=parseFloat(kEntry[10]); // degrees
	this.surfTempK=parseFloat(kEntry[11]); // Kelvin
	this.surfTempC=parseFloat((this.surfTempK>0 ? this.surfTempK-273.15 : "")); //Celsius
	this.age=parseFloat(kEntry[12]); // Gyr
	this.discMethod=kEntry[13];
	this.discYr=parseInt(kEntry[14]); // yyyy
	this.updated=kEntry[15]; // yy/mm/dd
	this.RA=kEntry[16]; // hh mm ss
	this.DEC=kEntry[17]; // +/- dd mm ss
	this.dist=kEntry[18]; // From Sun in parsecs
	this.starMass=parseFloat(kEntry[19]); // Solar Masses
	this.starRad=parseFloat(kEntry[20]); // Solar Radii
	this.starMetal=parseFloat(kEntry[21]); // log relative to solar
	this.starTemp=parseFloat(kEntry[22]); // Kelvin
	this.starAge=parseFloat(kEntry[23]); // Gyr
}

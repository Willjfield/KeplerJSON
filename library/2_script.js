var catalog = [];
//Load the text, fill catalog with parsed text file
$('document').ready(function(){
	 $.get("http://raw.githubusercontent.com/OpenExoplanetCatalogue/oec_tables/master/comma_separated/open_exoplanet_catalogue.txt", function(data) {
		space.fillCatalog(catalog,space.parseExoText(data),function(){
			for(p in catalog){
					console.log(catalog[p])
			}
		});
	    });
});

var space = function(){
	this.url = "http://raw.githubusercontent.com/OpenExoplanetCatalogue/oec_tables/master/comma_separated/open_exoplanet_catalogue.txt";	
}

//Parse the csv and return an array
space.prototype.parseExoText = function (txt){
	txt = txt.split('\n');
	txt.splice(0,30);
	for(e in txt){
		var ne=txt[e].split(',');
		txt[e]=ne;
		
		if(txt[e].length<2){
			txt.splice(e,1);
		}
	}
	return txt;
};
//fill the catalog with exoplanet objects made from the array data
space.prototype.fillCatalog = function (cat, data, Callback){
	for(planet in data){
		cat.push(new Exoplanet(data[planet]));
	}
	Callback();
}
//Constructor for exoplanets
space.prototype.Exoplanet = function (kEntry){
	this.id=kEntry[0];
	
	this.planProps = {
		jMass : parseFloat(kEntry[2]), // Jupiter Masses
		jRad : parseFloat(kEntry[3]), // Jupiter radii
		surfTempK : parseFloat(kEntry[11]), // Kelvin
		surfTempC : parseFloat(kEntry[11])+273.15, //Celsius
		age : parseFloat(kEntry[12]) // Gyr
	}

	this.orbit={
		period:parseFloat(kEntry[4]), // days
		semiMajor:parseFloat(kEntry[5]), // AU
		ecc:parseFloat(kEntry[6]),
		periast:parseFloat(kEntry[7]), // degrees
		longitude:parseFloat(kEntry[8]), // degrees
		ascendNode:parseFloat(kEntry[9]),// degrees
		incline:parseFloat(kEntry[10]) // degrees
	}

	this.history = {
		discMethod : kEntry[13],
		discYr : parseInt(kEntry[14]), // yyyy
		updated : kEntry[15] // yy/mm/dd
	}

	this.astroCoords={
		RA:{
			h : parseFloat(kEntry[16].split(' ')[0]),
			m : parseFloat(kEntry[16].split(' ')[1]),
			s : parseFloat(kEntry[16].split(' ')[2]),
		}, // hh mm ss
		DEC:{
			d : parseFloat(kEntry[17].split(' ')[0]),
			m : parseFloat(kEntry[17].split(' ')[1]),
			s : parseFloat(kEntry[17].split(' ')[2]),
		}, // +/- dd mm ss
		dist:parseFloat(kEntry[18]) // From Sun in parsecs
	}

	this.suns={
		type : parseInt(kEntry[1]), // 0=no known stellar binary companion; 1=P-type binary (circumbinary); 2=S-type binary; 3=orphan planet (no star)
		starMass : parseFloat(kEntry[19]), // Solar Masses
		starRad : parseFloat(kEntry[20]),  // Solar Radii
		starMetal : parseFloat(kEntry[21]), // log relative to solar
		starTemp : parseFloat(kEntry[22]), // Kelvin
		starAge : parseFloat(kEntry[23]), // Gyr
	}
}

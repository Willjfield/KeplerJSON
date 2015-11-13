var rawData;
$('document').ready(function(){
	 $.get("http://raw.githubusercontent.com/OpenExoplanetCatalogue/oec_tables/master/comma_separated/open_exoplanet_catalogue.txt", function(data) {
		 rawData=data.split('\n');
		 rawData.splice(0,30);
		 console.log(rawData);
	    });
});

function exoplanet(kEntry){
	this.id=kEntry[0];
	this.binary=kEntry[1];
	this.jMass=kEntry[2];
	this.jRad=kEntry[3];
	this.period=kEntry[4];
	this.semiMajor=kEntry[5];
	this.ecc=kEntry[6];
	this.periast=kEntry[7];
	this.longitude=kEntry[8];
	this.ascendNode=kEntry[9];
	this.incline=kEntry[10];
	this.surfTemp=kEntry[11];
	this.age=kEntry[12];
	this.discMethod=kEntry[13];
	this.discYr=kEntry[14];
	this.updated=kEntry[15];
	this.RA=kEntry[16];
	this.DEC=kEntry[17];
	this.dist=kEntry[18];
	this.starMass=kEntry[19];
	this.starRad=kEntry[20];
	this.starMetal=kEntry[21];
	this.starTemp=kEntry[22];
	this.starAge=kEntry[23];
}

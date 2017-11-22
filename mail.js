var sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('enter API key here');
sendgrid.setSubstitutionWrappers('{{', '}}');

var fs = require('fs');

var content = fs.readFileSync('vols.csv', 'utf-8');
var rows = content.split('\n');

var hour = 7;
var min = 0;

var getmin = function(n){
	return n>9? ""+n: "0"+n;
};

var html = fs.readFileSync('body.html', 'utf-8');

for (var i = 0; i < rows.length; i++)
{
	var data = rows[i].split(",");

	var params = {
        to: data[1],
        from: {
        	email: 'sender email',
        	name: 'Gokulan Ravi'
        },
        subject: 'enter subject here ',
        substitutions: {
        	name: data[0],
        	time: getmin(hour)+":"+getmin(min)
        },
        html : html
    };

	// sendgrid.send(params);
    console.log(hour + ";" + min);
	min = (min+10)%60;
	if(min==0) hour+=1;
}
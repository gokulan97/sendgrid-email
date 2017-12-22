var sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('');
sendgrid.setSubstitutionWrappers('{{', '}}');

var fs = require('fs');

var content = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
var html = fs.readFileSync('body.html', 'utf-8');

for(var i=0; i<content.length; i++)
{
    var params = {
        to: content[i].email,
        from: {
            email: 'queries@shaastra.org',
            name: 'Shaastra 2018'
        },
        subject: 'Shaastra 2018 - Important Announcement',
        substitutions: {
            name: content[i].name,
            festID: content[i].festID
        },
        html : html
    };
    sendgrid.send(params);
    console.log("sent to" + content[i].email, i+1)
}
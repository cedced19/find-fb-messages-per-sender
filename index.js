const login = require('facebook-chat-api');
const config = require('./config.json');

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'name': prop,
                'number': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return b.number - a.number; });
    return arr;
}

login(config, (err, api) => {
		    if(err) return console.error(err);
				api.getThreadHistory(config.threadID, 20000, undefined, (err, history) => {
        if(err) return console.error(err);

				var people = {};
				history.forEach(function (msg) {
          /*
          To take only messages since a specific date
          if (msg.timestamp < 1496268000000) {
          return false;
          }
          */
					if (people.hasOwnProperty(msg.senderName)) {
						people[msg.senderName]++;
					} else {
						people[msg.senderName] = 1;
					}
				});

        console.log('Number of messages since the beginning: \x1b[36m' + history.length + '\x1b[0m');
        console.log('Number of messages for each users:');

        var sorted = sortObject(people);
        sorted.forEach(function(user) {
          console.log('\x1b[36m' + user.number + '\x1b[0m by ' + user.name)
        });


    });
});

var result = {people : []};

$('table')
    .first()
    .children('tbody')
    .children(['role=row'])
        .each((ind,r) =>
            {
                var person = {}
                var tds = $(r).children('td');
                person.fullName = tds.find('h4').text().trim();
                person.email = tds.find('.email').text().trim();
                person.presence = [];

                var presence = $(tds[2]).text();
                person.presence.push({start: presence });
                
                // skip persons with no start date and persons with several start dates
                if(person.fullName.length > 0 && presence.length < 11)
                  result.people.push(person);
            });

console.log(JSON.stringify(result, null, 2));

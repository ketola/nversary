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

                if(person.fullName.length > 0 && presence.length < 8)
                  result.people.push(person);
            });

console.log(JSON.stringify(result, null, 2));

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
                person.presence.push({start: $(tds[2]).text() });                

                result.people.push(person);
            }); 

console.log(JSON.stringify(result, null, 2));

const cafeList = document.querySelector('#cafe-list');

//create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li'),
        name = document.createElement('span'),
        city = document.createElement('span');

        li.setAttribute('data-id', doc.id);//hooking up the firebase document Id as the Id for this particular li
    
        //creating a text content for the span tags
        name.textContent = doc.data().name;
        city.textContent = doc.data().city;

        //appending the text content to the city and 
        li.appendChild(name);
        li.appendChild(city);

        cafeList.appendChild(li);//adding the li to the cafelist
};


db.collection('cafes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
})
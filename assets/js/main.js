const cafeList = document.querySelector('#cafe-list'),
     form = document.querySelector('#add-cafe-form');


//create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li'),
        name = document.createElement('span'),
        city = document.createElement('span'),
        cross = document.createElement('div');

        li.setAttribute('data-id', doc.id);//hooking up the firebase document Id as the Id for this particular li
    
        //creating a text content for the span tags
        name.textContent = doc.data().name;
        city.textContent = doc.data().city;
        cross.textContent = 'x';//giving the cross a text content

        //appending the text content to the city and 
        li.appendChild(name);
        li.appendChild(city);
        li.appendChild(cross);

        cafeList.appendChild(li);//adding the li to the cafelist
        
        /**deleting data */
        cross.addEventListener('click', (e) => {
            e.stopPropagation();

            let id = e.target.parentElement.getAttribute('data-id');
            
            db.collection('cafes').doc(id).delete();//deleting the document that corresponds to the location of the tag 
     });

     /**END OF FUNCTION FOR DELETING */
};


db.collection('cafes').where('city', '==', 'london').orderBy('name').get().then(snapshot => {//getting data
    snapshot.docs.forEach(doc => {
        renderCafe(doc);//passing document details to the frontend
    });
});

/**saving data */
form.addEventListener('submit', (e) => {
    e.preventDefault();//stoping the form from submiting

    db.collection('cafes').add({//creating connection to database
        name : form.name.value,
        city : form.city.value
    });

    //emptying the form fields
    form.name.value = '';
    form.city.value = '';
})
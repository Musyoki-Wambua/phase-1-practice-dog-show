document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('dog-form').addEventListener('submit', handleSubmit);

    fetchDogs();
})


function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(json => json.forEach(dog => createDog(dog)))
}


function createDog(dog) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
    `
    
    tr.querySelector('button').addEventListener('click', (event) => handleEdit(event, dog));

    
    document.querySelector('#table-body').appendChild(tr);
}


function handleEdit(event, dog) {
    let dogForm = document.querySelector('#dog-form');
    dogForm.name.id = dog.id;

    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
}


function handleSubmit(event) {
    let dogObject = {
        id:event.target.name.id,
        name:event.target.name.value,
        breed:event.target.breed.value,
        sex:event.target.sex.value
    }

    
    patchDogs(dogObject);
}


function patchDogs(dog) {
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    //.then(resp => resp.json())
    //.then(dog => console.log(dog))
}
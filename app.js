

const loadVideos = (text = "iphone") => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
    .then((res) => res.json())
    .then((data) => {
        const ttlPhones = data.data;
        showVideos(ttlPhones)
    })
}
const showVideos = (phones) => {
    const container = document.getElementById('phonesContainer');
    container.innerHTML = '';
    
    if(phones.length === 0){
        container.classList.remove('grid');
        container.innerHTML = `
          <div class="min-g-[600px] flex justify-center items-center">
             <h2>No Product Found :)</h2>
          </div>
        `;
        return;
    }else{
        container.classList.add('grid');
    }

    phones.forEach(p => {
        console.log(p);
        const phoneBox = document.createElement('div'); 
        phoneBox.classList.add('card', 'bg-base-100', 'shadow-xl'); 
        phoneBox.innerHTML = `
            <figure class="px-10 pt-10">
              <img
                src=${p.image}
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${p.phone_name}</h2>
              <div class="card-actions">
                <button onclick="openModal('${p.slug}')" class="btn btn-primary">show details</button>
              </div>
            </div>  
        `;
        container.appendChild(phoneBox)
    });
}

const openModal = (pId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${pId}`)
    .then((res) => res.json())
    .then((data) => {
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `
            <div class="flex flex-col gap-2 m-2">
                <div>
                   <img src=${data.data.image} />
                </div>
                <p class="text-xl font-semibold py-4">${data.data.name}</p>
                <p>${data.data.mainFeatures.storage}</p>
                <p>${data.data.mainFeatures.displaySize}</p>
                <p>${data.data.mainFeatures.memory}</p>
                <p>${data.data.slug}</p>
                <p>${data.data.releaseDate}</p>
            </div>   
        `;
        document.getElementById('modal').showModal();
    })
}

const showAll = () => {
    document.getElementById('show').classList.add('bg-red-500')

    document.getElementById('spin').classList.remove('hidden');
    document.getElementById('spin').classList.add('block');
     
    setTimeout(() => {
        
        document.getElementById('spin').classList.add('hidden');
        document.getElementById('spin').classList.remove('block');
        loadVideos('');
        //showVideos(ttlPhones.slice(0,15))
        //showVideos(allPhones);
       
    },2000)
}

 
document.getElementById('input').addEventListener('keyup', (e) => {
    const searchText = e.target.value;
    if(searchText){
        loadVideos(searchText);
    }else{
        loadVideos("iphone");
    }
})


loadVideos()






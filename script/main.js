const loadButtons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
      .then(response => response.json())
      .then(data => displayButtons(data.data))
      .catch(error => console.log('Error:', error));
  }
  
  const buttonsContainer = document.getElementById('lesson-buttons');
  const cardContainer = document.getElementById('lesson-card-container');
  
  const displayButtons = (buttons) => {
    buttons.forEach((button) => {
      const lessonButton = document.createElement('button');
      lessonButton.classList.add('btn');
      lessonButton.style.marginRight = '10px';
      lessonButton.innerHTML = ` <img src="img/fa-book-open.png"/> <h4>Lesson -</h4> ${button.level_no} `;
      

    
    lessonButton.addEventListener('click', function () {
      document.getElementById('empty-message').classList.add('hidden');
      const allButtons = document.querySelectorAll('#lesson-buttons .btn');
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active-btn');
      }

     
      lessonButton.classList.add('active-btn');

      
      loadLesson(button.level_no);
    });
  
      buttonsContainer.append(lessonButton);
    });
  }
  
  const loadLesson = (levelNo) => {
   
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => displayLessons(data.data))
      .catch(error => console.log('Error:', error));
  }
  


  const displayLessons = (lessons) => {
    
    cardContainer.innerHTML = '';
  
    
    const lessonCardContainer = document.getElementById('lesson-card-container');

if (lessons.length === 0) {
    lessonCardContainer.classList.remove('grid');
   
    cardContainer.innerHTML = `
      <div class="bg-[#F8F8F8] p-8">
        <div class="text-center flex justify-center">
          <div class="text-center">
            <img src="img/alert-error.png" class="inline mb-5"/>
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3>নেক্সট Lesson এ যান</h3>
          </div>
        </div>
      </div>
    `;
    return;

} else {
    lessonCardContainer.classList.add('grid');
}


 

   
    lessons.forEach(lesson => {
      const lessonCard = document.createElement('div');
      lessonCard.classList.add('card',  'bg-base-100',   'p-[56px]', 'rounded-lg', 'shadow-xl');
      lessonCard.innerHTML = `
        <div class="card-body items-center text-center">
    <h2 class="text-4xl font-bold">${lesson.word}</h2>
    <h3 class="text-2xl font-medium">Meaning /Pronounciation </h3>
    <h2 class="text-[#18181B] font-semibold text-[32px]">${lesson.meaning ? lesson.meaning : "No word found"}</h2>

 

  </div>

  <div class="flex justify-between">
     <div class="bg-[#A9D6F7] p-3 rounded-lg">
      <button onclick="loadDetails('${lesson.id}')">  <i class="fa-solid fa-circle-info"></i></button>
     </div>
     <div class="bg-[#A9D6F7] p-3 rounded-lg">
     <button><i class="fa-solid fa-volume-high"></i></button>
     </div>
     </div>  
      `;
      cardContainer.appendChild(lessonCard);
    });
  }
  
  const loadDetails = async(lessonid)=>{
   
    
    const uri = `https://openapi.programming-hero.com/api/word/${lessonid}`
    const response = await fetch(uri);
    const data = await response.json();
    
    displayDetails(data.data);
    
  }

  
  const displayDetails =(detail)=>{
    
    const modalContent = document.getElementById('modalContent');
    document.getElementById('customeModal').showModal();
    modalContent.innerHTML =`
    <div class="flex gap-8 mb-8">
     <h2 class="text-4xl font-semibold">${detail.word}</h2> <span class="text-4xl font-semibold">(<i class="  fa-solid fa-microphone-lines mr-4  ">:</i>${detail.pronunciation})</span> 
     
    
    </div>
    <h3 class="mb-2 text-2xl font-semibold">Meaning</h3>
     <h4 class="mb-8 text-2xl font-medium">${detail.meaning? detail.meaning : "No Word Found"}</h4>
     <h3 class="mb-2 text-2xl font-semibold">Example</h3>
     <h4 class="mb-8 text-2xl">${detail.sentence}</h4>
     <h3 class="mb-2 text-2xl font-medium">সমার্থক শব্দ গুলো</h3>
      

    
    `
    if(detail.synonyms.length > 0){
      for(let i = 0; i < detail.synonyms.length; i++){
        const synonym = document.createElement('button');
        synonym.classList.add('btn', 'bg-[#A9D6F7]', 'text-[#18181B]', 'rounded-lg', 'p-2', 'mr-4', 'mb-4');
        synonym.innerText = detail.synonyms[i];
        modalContent.appendChild(synonym);
      }

    }else{

      const noWord = document.createElement('button');
    noWord.classList.add('btn', 'bg-[#FECACA]', 'text-[#7F1D1D]', 'rounded-lg', 'p-2', 'mr-4', 'mb-4');
    noWord.innerText = "No Word Found";
    modalContent.appendChild(noWord);
    }
  
  }
  loadButtons(); 

  const showAll = () => {
    const nameInput = document.getElementById('name-field');
    const passwordInput = document.getElementById('password-field');
    const nameField = nameInput.value;
    const passwordField = passwordInput.value;
    const passwordFieldNumber = parseInt(passwordField);
    const banner = document.getElementById('banner');

  
    if (nameField !== "" && passwordFieldNumber === 123456) {
      alert('congratulation! you are logged in successfully');
      banner.classList.add('hidden');
      document.getElementById('learn').classList.remove('hidden');
      document.getElementById('faq').classList.remove('hidden');
      nameInput.value = '';
      passwordInput.value = '';
    } else {
      alert("Invalid user ID or password");
    }
  }

  const logout =()=>{
    const banner = document.getElementById('banner');
    banner.classList.remove('hidden');
    document.getElementById('learn').classList.add('hidden');
    document.getElementById('faq').classList.add('hidden');
    document.getElementById('header').classList.add('hidden');
   
  }
  
  



  
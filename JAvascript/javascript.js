
let sliderImages = document.querySelectorAll('.slide'),
    arrowLeft = document.querySelector('#left-arrow'),
    arrowRight = document.querySelector('#right-arrow'),
    current=0;
    
    function reset(){
      for(let i = 0; i < sliderImages.length; i++){
        sliderImages[i].style.display='none';
      }
    }
    
    function startSlide(){
      reset();
      sliderImages[0].style.display='block';  
    }
    
    function slideLeft(){
      reset();
      sliderImages[current -1].style.display='block';
      current --;
    }

function slideRight(){
      reset();
      sliderImages[current +1].style.display='block';
      current ++;
    }

arrowLeft.addEventListener('click',function(){
  if(current === 0){
    current = sliderImages.length;
  }
  slideLeft();
});

arrowRight.addEventListener('click',function(){
  if (current===sliderImages.length -1 ){
    current=-1
  }
  slideRight();
});

startSlide();

document.addEventListener("DOMContentLoaded", () => {
  enhance("statement1");
  enhance("statement2");
  enhance("statement3");
  enhance("statement4");
});

const enhance = id => {
    const element=document.getElementById(id),
    text=element.innerText.split("");

    element.innerText="";
    text.forEach(letter => {
        
        const span=document.createElement("span");

        span.className="letter";

        span.innerText=letter;

        element.appendChild(span);
    })
}

enhance("statement1");
enhance("statement2");
enhance("statement3");
enhance("statement4");
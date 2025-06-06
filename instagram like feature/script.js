var con = document.querySelector('.container');
var btn = document.querySelector('.i1');
var like = document.querySelector('.i2');

btn.addEventListener('dblclick', function(){
    btn.classList.remove("ri-heart-line");
    btn.classList.add("ri-heart-3-fill","filled");
    like.style.transform = 'translate(-50%, -50%) scale(1.5)';
    like.style.opacity = '0.8';
    setTimeout(function(){
        like.style.opacity = '0';
    },1000);
    setTimeout(function(){
        like.style.transform = 'translate(-50%, -50%) scale(0)';
    },1000);
    setTimeout(function(){
        btn.classList.remove("ri-heart-3-fill","filled");
        btn.classList.add("ri-heart-line");
    },1000);
})
var buttonsLength = document.querySelectorAll('.drum').length
var buttons = document.querySelectorAll('.drum')


for (i = 0; i < buttonsLength; i++) {
    document.querySelectorAll('.drum')[i].addEventListener("click", function(){
        playSound(this.innerHTML);
        this.classList.add('pressed');

        setTimeout(()=> {
            this.classList.remove('pressed');
        }, 100);
    })
}


document.addEventListener("keydown", function (event){
        playSound(event.key);
        this.classList.add('pressed');
        setTimeout(()=> {
            this.classList.remove('pressed');
        }, 100);

})



function playSound(key){
    switch (key) {

        case "w":
            var tom1 = new Audio("./sounds/tom-1.mp3")
            tom1.play()
            break;

        case "a":
            var tom2 = new Audio("./sounds/tom-2.mp3")
            tom2.play()
            break;

        case "s":
            var tom3 = new Audio("./sounds/tom-3.mp3")
            tom3.play()
            break;

        case "d":
            var tom4 = new Audio("./sounds/tom-4.mp3")
            tom4.play()
            break;

        case "j":
            var snare = new Audio("./sounds/snare.mp3")
            snare.play()
            break;

        case "k":
            var kick = new Audio("./sounds/kick-bass.mp3")
            kick.play()
            break;

        case "l":
            var crash = new Audio("./sounds/crash.mp3")
                crash.play()
            break;

        default:
            console.log(key)
            break;

    }
}

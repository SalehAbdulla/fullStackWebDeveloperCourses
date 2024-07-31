

const files = ["./images/dice1.png",
    "./images/dice2.png",
    "./images/dice3.png",
    "./images/dice4.png",
    "./images/dice5.png",
    "./images/dice6.png"
];

var random_number_one = Math.floor(Math.random() * files.length);
var random_number_two = Math.floor(Math.random() * files.length);
var choose_file_one = files[random_number_one];
var choose_file_two = files[random_number_two];

document.querySelector('.img1').setAttribute("src", choose_file_one);
document.querySelector('.img2').setAttribute("src", choose_file_two);




if (choose_file_one === choose_file_two){
    document.querySelector('h1').innerHTML = 'Draw';
};


if (random_number_one > random_number_two){
    document.querySelector('h1').innerHTML = 'Player One Won!'
} else{
    document.querySelector('h1').innerHTML = "Player Two Won!"
}





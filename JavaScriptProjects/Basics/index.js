var guests = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"];
console.log(guests[0]);

// ask user for their name
// check name if exist
// welcome or sorry

userName = prompt("Enter You Name")
if (guests.includes(userName)){
    alert("You're welcome")
} else {
    alert("Sorry, maybe next time")
}



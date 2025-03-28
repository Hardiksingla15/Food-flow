function submitReview() {
    var reviewText = document.getElementById('reviewText').value;
    if (reviewText === "Add your review" || reviewText.trim() === "") {
        alert("Please enter a valid review!");
    } else {
        document.getElementById('responseMessage').innerText = "Your review is submitted!";
    }
}

function submitmail(){
    var youremail=document.getElementById('youremail').value;
    if(youremail === "Enter your email" || youremail.trim()===""){
        alert("Please enter a valid email!");
    } else{
        document.getElementById('responsemail').innerHTML="You have subscribed";
        
    }
}
async function register(){
    const response=await fetch("http://4.224.186.213/evaluation-service/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:"sairoshan10b@gmail.com",
            name:"Kondaparthi Sai Roshan",
            mobileNo:"9014213338",
            githubUsername:"roshankondparthy",
            rollno:"VTU25624",
            accessCode:"juFphv"
        })
    });
    const data=await response.json();
    console.log(data);
}
register();
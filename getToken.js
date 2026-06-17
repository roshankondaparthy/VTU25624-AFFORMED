async function getToken(){
    const response=await fetch("http://4.224.186.213/evaluation-service/auth",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:"sairoshan10b@gmail.com",
            name:"Kondaparthi Sai Roshan",
            rollNo:"VTU25624",
            accessCode:"juFphv",
            clientID:"48ec3aae-41e3-4320-be82-71124978d526",
            clientSecret:"VcpsawrCGRxDujQE"
        })
    });
    const data=await response.json();
    console.log(data);
}
getToken();
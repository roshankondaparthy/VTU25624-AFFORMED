const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const TYPE_WEIGHT={
    Placement:300,
    Result:200,
    Event:100,
};
function getScore(notification){
    const typeScore =TYPE_WEIGHT[notification.Type] || 0;
    const recencyScore=new Date(notification.Timestamp).getTime()/1e10;
    return typeScore+recencyScore;
}
async function getTopNotifications(n=10){
    const response = await fetch(API_URL, {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlyb3NoYW4xMGJAZ21haWwuY29tIiwiZXhwIjoxNzgxNjc4MzkzLCJpYXQiOjE3ODE2Nzc0OTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NDlkYjlhMi03ODY2LTQzZjUtODg2Yi1kNTY5NmE2NjA5NjUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrb25kYXBhcnRoaSBzYWkgcm9zaGFuIiwic3ViIjoiNDhlYzNhYWUtNDFlMy00MzIwLWJlODItNzExMjQ5NzhkNTI2In0sImVtYWlsIjoic2Fpcm9zaGFuMTBiQGdtYWlsLmNvbSIsIm5hbWUiOiJrb25kYXBhcnRoaSBzYWkgcm9zaGFuIiwicm9sbE5vIjoidnR1MjU2MjQiLCJhY2Nlc3NDb2RlIjoianVGcGh2IiwiY2xpZW50SUQiOiI0OGVjM2FhZS00MWUzLTQzMjAtYmU4Mi03MTEyNDk3OGQ1MjYiLCJjbGllbnRTZWNyZXQiOiJWY3BzYXdyQ0dSeER1alFFIn0.p0TCRDtstAELmWaqKMpMvCA-Qfi1LDvWfAQ5UiYfvhA"
  }
});
    const data=await response.json();
    console.log("API Response:",JSON.stringify(data,null,2));
    if(!data.notifications){
        console.log("ERROR: notifications not found in response");
        return;
    }
    const notifications =data.notifications;
    const scored=notifications.map((notif)=>({
        ...notif,
        score: getScore(notif),
    }));
    scored.sort((a,b)=> b.score -a.score);
    const top=scored.slice(0,n);
    console.log(`Top ${n} Priority Notifications:\n`);
    top.forEach((notif,i)=>{
        console.log(
            `${i+1}.[${notif.Type}] ${notif.Message} | ${notif.Timestamp} | Score: ${notif.score.toFixed(2)}`
        );
    });
    return top;
}
getTopNotifications(10);
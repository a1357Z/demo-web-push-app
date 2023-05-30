function setToken(token){
    console.log("setToken", token)
    fetch("/subscribe-2", {
        method: "POST",
        body: JSON.stringify(token),
        headers: {
            "content-type": "application/json"
        }
    });
}



const gas_deployment_id='AKfycbxUSm0IjP-X5FgCOuQl1C14L1QUgggePnmWyzmKk4TVq-EdVkFDm5VyI5fc3rpR7hqIFA'
const gas_end_point = 'https://script.google.com/macros/s/'+gas_deployment_id+'/exec'  

async function get_data(params, callback){
    
    //This function is used to invoke a function in Google App Script
    //if a callback is not provided  this function waits until the call is complete
    query=[]
    for(const [param, value] of Object.entries(params)){
        query.push(`${param}=${encodeURIComponent(value)}`)
    }
    const url=gas_end_point + "?" + query.join("&")
    console.log("url", url)

    if(callback){// execute the requst and let callback handle the response
        fetch(url)
        .then(response => response.json())
        .then(callback);
    }else{ //execute the request and wait for the response so it can be returned
        const reply = await fetch(url)
        //The request is made of Google App Script and the response is set to "response"
        const response = await reply.json()
        console.log("in get data", response)     

        //the response from google app script is returned.
        return response
    }
}

async function start_me_up(){
    console.log("starting")
    const data=await get_data({mode:"data"})
    console.log("data", data)
    tag("body").innerHTML ="<pre>" +  JSON.stringify(data,"",4) + "</pre>"

}

async function show_conflicts(){
    console.log("get conflicts")
    const conflicts=await get_data({mode:"conflicts"})
    console.log("conflicts", conflicts)

}

function tag(id){
    return document.getElementById(id)
}
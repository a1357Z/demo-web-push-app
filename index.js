//Express
const express = require('express');

//web-push
const webpush = require('web-push');

//path
const path = require('path');

//using express 
const app = express();

//using inbuilt bodyparser
app.use(express.json())


//storing the keys in variables
const publicVapidKey = 'BE9vGNFZPvHtOzw3fvtiSlCStnavkNOL9bRcEpEZjsLYXMXVDr9RQK7xsowDMyD_Ehn_-qdvnT6RBkeVzPegR_w';
const privateVapidKey = '4MrT6gxhjIHwQX_NXilTX-tE2AwMUPyOlxABGQmoB0M';

//setting vapid keys details
webpush.setVapidDetails('mailto:ajay.yadav@netcorecloud.com', publicVapidKey,privateVapidKey);

//array of subscribers
let subscribers = []

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;
    subscribers.push(subscription);

    //send status 201 for the request
    res.status(201).json( {message : "we will send u notifications regarding time."} )
})

let CronJob = require('cron').CronJob;
let job = new CronJob(
	'* * * * *',
	function() {
		console.log('Time to send notifications to the clients');

        //create paylod: specified the detals of the push notification
        const payload = JSON.stringify({title: 'Demo Push Notification', message: `Your current time is: ${new Date().toLocaleDateString()}` });

        //pass the object into sendNotification fucntion and catch any error
        subscribers.forEach(subscription => {
            webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
        })
        
	},
	null,
	true,
	'Asia/Kolkata'
);

//set the static path 
app.use(express.static(path.join(__dirname, "client")));

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});
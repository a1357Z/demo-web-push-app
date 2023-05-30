
self.addEventListener("push", e => {
    const data = e.data.json();
    if(data.origin != "vendor1")return;
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: data.message, //the body of the push notification
            image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
            icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
        }
    );
});

self.addEventListener("push", e => {
  const data = e.data.json();
  if(data.origin != "vendor2")return;
  self.registration.showNotification(
      data.title, // title of the notification
      {
          body: data.message, //the body of the push notification
          image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
          icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
      }
  );
});
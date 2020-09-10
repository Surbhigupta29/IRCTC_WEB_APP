## RailwayApp
It is a backend(NodeJs) of e-ticketing system like IRCTC Web Application which communicates via API.

## Getting Started
Just Git-Pull the files and run npm install then start the server using npm start

## Prerequisites
NodeJS must be installed

## Rest APIs
### Train

A. /train  
- This is a Post endpoint for creating train record wih all the fields required like (fromStn, toStn, TrainNo. etc).
It has restriction that "Admin can only add trains". 

B. /train
- This is a GET endpoint which has query parameter to provide train details according to filters so that One can select any train amongst multiple options or else all the trains will be returned.

C. /train/:trainId
- This is a DELETE endpoint which will delete any particular train record according to the path parameter trainId.
It has restriction that "Admin can only delete the trains". 

D. /train/:trainId
- This is a PUT endpoint which has a path parameter of trinId. It can update the train's field according to the trainId defined in the route. It has restriction that "Admin can only update the train records".

### User

A. /signup
- This is a POST endpoint. It reads the new user details send inside the request body and save them in the database.

B. /login
- This is a POST endpoint. It reads the username and password sent inside request body and validate them with values in the database and send the validation status in response.

C. /user/bookTicket
- This is a POST endpoint. It reads the array of passengerInformation, trainId (which will refer to the train collection), userEmail sent inside request body and then the logic is applied of giving the discount the older age people and to authenticate the user who is booking the ticket. And then the final result with all the information is saved in userBookingHistory collection.
It has restriction that "User role can only book the tickets + that person should be loggedin".

D.  /user/cancelTicket
- This is a POST endpoint. It reads the passengerInformationId, sent inside request body and then change in userBookingHstory the passengerInformaion status to cancelled.
It has restriction that "User role can only cancel the tickets + that person should be loggedin and that person can only cancel the tickets which is registered through his/her mailId in userbookingHistory collection".

### User Booking History

A. /userBookingHistory
- This is a GET endpoint. IT will return the particular user booking history. According to the token passed in the authorization header. Only user role users can see the booking history.

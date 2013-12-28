grocerybox-app
==============

GroceryBox Application

Simple app for buying groceries online.


THIS IS A DRAFT ONLY

We will have 4 hosts in general.



1. grocerybox - this in-charge of serving static files
2. mobile.grocerybox - this is optimize for mobile devices
3. main.grocerybox - this is the main host
4. data.grocerybox - this is for the database


The default format for every request follows:
    
	host:port/transaction-id/transaction-path...

Example:
    
	grocerybox.com/sfsifop053443ngkdf/home

By doing this we are sure that the client is partially verified because the server can track them through transaction ID.

The transaction ID will act as a gateway thus this will prevent unwanted requests.

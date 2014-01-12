grocerybox-app
==============

GroceryBox Application

Simple app for buying groceries online.


THIS IS A DRAFT ONLY

We will have 4 hosts in general.



1. `grocerybox` - this in-charge of serving static files
2. `mobile.grocerybox` - this is optimize for mobile devices
3. `main.grocerybox` - this is the main host
4. `data.grocerybox` - this is for the database


The default format for every request follows:
    
	host:port/transaction-id/transaction-path...

Example:
    
	grocerybox.com/sfsifop053443ngkdf/home

By doing this we are sure that the client is partially verified because the server can track them through transaction ID.

The transaction ID will act as a gateway thus this will prevent unwanted requests.


#Draft REST API Specifications#

##/get##

###/get/groups
This will return the list of groups of products.
>**Request Format**
> 
> 	Method: 		GET
> 	Host: 			data.grocerybox.com
> 	Port: 
> 	Protocol: 		HTTPS
> 	Encoding: 		UTF8
> 	Path: 			/transaction-id/get/groups
> 	MIME Type: 		application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

>**Response Format**
> 
> 	On normal response:
> 	Response code: 200
> 	Response body:
> 	{
> 		"status": "success"|"failed",
> 		"result": [
> 			{
> 				"name": "price-range",
> 				"title": "Price Range"
> 			},
> 			{
> 				"name": "store",
> 				"title": "Store"
> 			},
> 			{
> 				"name": "category",
> 				"title": "Category"
> 			},
> 			{
> 				"name": "section",
> 				"title": "Section"
> 			}
> 		] | null
> 	}
> 	
> 	On server error response:
> 	Response code: 404/500
> 	Response body: none


###/get/categories
This will return the list of categories of products.
>**Request Format**
> 
> 	Method: 		GET
> 	Host: 			data.grocerybox.com
> 	Port: 
> 	Protocol: 		HTTPS
> 	Encoding: 		UTF8
> 	Path: 			/transaction-id/get/categories
> 	MIME Type: 		application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

>**Response Format**
> 
> 	On normal response:
> 	Response code: 200
> 	Response body:
> 	{
> 		"status": "success"|"failed",
> 		"result": [
> 			{
> 				"name": "meat",
> 				"title": "Meat"
> 			},
> 			{
> 				"name": "beverage",
> 				"title": "Beverage"
> 			},
> 			{
> 				"name": "utensil",
> 				"title": "Utensil"
> 			},
> 			{
> 				"name": "dairy",
> 				"title": "Dairy"
> 			}
> 			...
> 		] | null
> 	}
> 	
> 	On server error response:
> 	Response code: 404/500
> 	Response body: none

###/get/sections
This will return the list of sections of products. Products grouped by sections will return products under a specific usage. Like if it used for breakfast, house cleaning, house decorations etc.
>**Request Format**
> 
> 	Method: 		GET
> 	Host: 			data.grocerybox.com
> 	Port: 
> 	Protocol: 		HTTPS
> 	Encoding: 		UTF8
> 	Path: 			/transaction-id/get/sections
> 	MIME Type: 		application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

>**Response Format**
> 
> 	On normal response:
> 	Response code: 200
> 	Response body:
> 	{
> 		"status": "success"|"failed",
> 		"result": [
> 			{
> 				"name": "household-cleaning",
> 				"title": "Meat"
> 			},
> 			{
> 				"name": "food",
> 				"title": "Food"
> 			},
> 			{
> 				"name": "breakfast",
> 				"title": "Breakfast"
> 			},
> 			{
> 				"name": "party-wines",
> 				"title": "Party Wines"
> 			}
> 			...
> 		] | null
> 	}
> 	
> 	On server error response:
> 	Response code: 404/500
> 	Response body: none

###/get/group/by/price-range
This will return the list of products grouped according to the price range. Note that this requires a price range parameter.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/group/by/price-range
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/group/by/store
This will return the list of products grouped according to the grocery store only (excluding the location of the store). Note that this requires a near-location parameter.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/group/by/store
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/group/by/category
This will return the list of products grouped according to the category of the product based on the categorization of the grocery store. Note that this will return all categories that is limited to 30 products per category.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/group/by/category
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/group/by/section
This will return the list of products grouped according to the section or usage of the products. Note that this will return all sections that is limited to 30 products per sections.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/group/by/section
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/products/under/group/group-name
This will return the list of products grouped under the given group name.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/products/under/group/group-name
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/products/under/category/category-name
This will return the list of products categorized under the given category name.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/products/under/category/category-name
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/products/under/section/section-name
This will return the list of products sectioned under the given section name.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/products/under/section/section-name
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

###/get/products/with/price/ranging?from=minimum-price&to=maximum-price
This will return the list of products based on the given price range.
>**Request Format**
> 
> 	Method: GET
> 	Host: data.grocerybox.com
> 	Port: 
> 	Protocol: HTTPS
> 	Encoding: UTF8
> 	Path: /transaction-id/get/products/with/price/ranging
> 	MIME Type: application/json
> 	Accepted Request Header Parameters
> 	- 
> 	Accepted Request Query Parameters
> 	- order-by
> 	- limit-to
> 	Accepted Request Body Parameters
> 	- geoLocation
> 	- sessionID
> 	- requestTimestamp

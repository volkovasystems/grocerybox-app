grocerybox-app
==============
**GroceryBox Application**

*Simple app for buying groceries online.*
<br/><br/>

---

We will have 4 hosts in general.

1. `grocerybox`
	- this in-charge of serving static files
2. `mobile.grocerybox`
	- this is optimize for mobile devices
3. `main.grocerybox`
	- this is the main host
4. `data.grocerybox`
	- this is for the database


The default format for every request follows:
    
	host:port/transaction-id/transaction-path...

Example:
    
	grocerybox.com/sfsifop053443ngkdf/home

By doing this we are sure that the client is partially verified because the server can track them through transaction ID.

The transaction ID will act as a gateway thus this will prevent unwanted requests.
<br/><br/><br/>


##Draft REST API Specifications

###`/get/group/all`
This will return the list of groups of products.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/group/all`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
				{
					"groupName": "price-range",
					"groupTitle": "Price Range"
				},
				{
					"groupName": "store",
					"groupTitle": "Store"
				},
				{
					"groupName": "category",
					"groupTitle": "Category"
				},
				{
					"groupName": "section",
					"groupTitle": "Section"
				}
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/category/all`
This will return the list of categories of products.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/category/all`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "categoryName": "meat",
		            "categoryTitle": "Meat"
		        },
		        {
		            "categoryName": "beverage",
		            "categoryTitle": "Beverage"
		        },
		        {
		            "categoryName": "utensil",
		            "categoryTitle": "Utensil"
		        },
		        {
		            "categoryName": "dairy",
		            "categoryTitle": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/section/all`
This will return the list of sections of products. Products grouped by sections will return products under a specific usage. Like if it used for breakfast, house cleaning, house decorations etc.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/section/all`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
				{
					"sectionName": "household-cleaning", 
					"sectionTitle": "Household Cleaning"
				},
				{
					"sectionName": "food",
					"sectionTitle": "Food"
				},
				{
					"sectionName": "breakfast",
					"sectionTitle": "Breakfast"
				},
				{
					"sectionName": "party-wines",
					"sectionTitle": "Party Wines"
				}
				...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/group/by/price-range`
This will return the list of products grouped according to the price range. Note that this requires a price range parameter.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
	- **`range`**
		- This can be an array of ranges in this format: `12.50-100.45,10.45-30.55`...
	- **`from`**
		- This is used for single price range group. Requires the minimum price range.
	- **`to`**
		- This is used for single price range group. Requires the maximum price range. 
	- **`wrap-as`**
		- This can change the format of the response depending on how you will wrap the values.
		- Possible values are:
			- product
			- category
			- section
			- store
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**
	- **`range`**
		- This is a JSON array of ranges in this format:

				[
					{
						"minimumPrice": 12.50,
						"maximumPrice": 100.45
					},
					{
						"minimumPrice": 10.45,
						"maximumPrice": 30.55
					}
					...
				]
 

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:
		
		//Wrap as product objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"priceRange": {
						"minimumPrice": 12.50,
						"maximumPrice": 100.45
					},
					"products": [
						{
							"productName": "",
				            "productTitle": "",
							"productDescription": "",
							"productThumbnailImage": "",
							"productImage": [
								"",
								...
							],
							"productCategory": [
								{
									"categoryName": "",
									"categoryTitle": ""
								},
								...
							],
							"productSection": [
								{
									"sectionName": "",
									"sectionTitle": ""
								},
								...
							],
							"productGroup": [
								{
									"groupName": "",
									"groupTitle": ""
								},
								...
							],
							"productStore": [
								{
									"storeName": "",
									"storeTitle": "",
									"storeAddress": "",
									"productIdentifier": "",
									"productPrice": 123.45,
									"productQuantity": 1234
								},
								...
							],
							"productPrice": [
								123.45,
								... 
							],
							"productPackagingInformation": {
								"packageClass": "",
								"packageType": "",
								"packageWeight": "",
								"packageItemQuantity": 1234,
								"expirationDate": 67876543213435786754,
								"manufacturingDate": 2324567434343634543
							},
							"productTotalQuantity": 123456
						}
					]
		        }
		        ...
			] | null
		}

		//Wrap as category objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"categoryName": "",
					"categoryTitle": "",
					"products": [
						{
							"priceRange": {
								"minimumPrice": 12.50,
								"maximumPrice": 100.45
							},
							"products": [
								{
									"productName": "",
						            "productTitle": "",
									"productDescription": "",
									"productThumbnailImage": "",
									"productImage": [
										"",
										...
									],
									"productCategory": [
										{
											"categoryName": "",
											"categoryTitle": ""
										},
										...
									],
									"productSection": [
										{
											"sectionName": "",
											"sectionTitle": ""
										},
										...
									],
									"productGroup": [
										{
											"groupName": "",
											"groupTitle": ""
										},
										...
									],
									"productStore": [
										{
											"storeName": "",
											"storeTitle": "",
											"storeAddress": "",
											"productIdentifier": "",
											"productPrice": 123.45,
											"productQuantity": 1234
										},
										...
									],
									"productPrice": [
										123.45,
										... 
									],
									"productPackagingInformation": {
										"packageClass": "",
										"packageType": "",
										"packageWeight": "",
										"packageItemQuantity": 1234,
										"expirationDate": 67876543213435786754,
										"manufacturingDate": 2324567434343634543
									},
									"productTotalQuantity": 123456
								},
								...
							]
				        },
				        ...
					]
				},
				...	
			] | null
		}

		//Wrap as section objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"sectionName": "",
					"sectionTitle": "",
					"products": [
						{
							"priceRange": {
								"minimumPrice": 12.50,
								"maximumPrice": 100.45
							},
							"products": [
								{
									"productName": "",
						            "productTitle": "",
									"productDescription": "",
									"productThumbnailImage": "",
									"productImage": [
										"",
										...
									],
									"productCategory": [
										{
											"categoryName": "",
											"categoryTitle": ""
										},
										...
									],
									"productSection": [
										{
											"sectionName": "",
											"sectionTitle": ""
										},
										...
									],
									"productGroup": [
										{
											"groupName": "",
											"groupTitle": ""
										},
										...
									],
									"productStore": [
										{
											"storeName": "",
											"storeTitle": "",
											"storeAddress": "",
											"productIdentifier": "",
											"productPrice": 123.45,
											"productQuantity": 1234
										},
										...
									],
									"productPrice": [
										123.45,
										... 
									],
									"productPackagingInformation": {
										"packageClass": "",
										"packageType": "",
										"packageWeight": "",
										"packageItemQuantity": 1234,
										"expirationDate": 67876543213435786754,
										"manufacturingDate": 2324567434343634543
									},
									"productTotalQuantity": 123456
								},
								...
							]
				        },
				        ...
					]
				},
				...	
			] | null
		}

		//Wrap as store objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"storeName": "", 
					"storeTitle": "",
					"storeAddress": "",
					"products": [
						{
							"priceRange": {
								"minimumPrice": 12.50,
								"maximumPrice": 100.45
							},
							"products": [
								{
									"productName": "",
						            "productTitle": "",
									"productDescription": "",
									"productThumbnailImage": "",
									"productImage": [
										"",
										...
									],
									"productCategory": [
										{
											"categoryName": "",
											"categoryTitle": ""
										},
										...
									],
									"productSection": [
										{
											"sectionName": "",
											"sectionTitle": ""
										},
										...
									],
									"productGroup": [
										{
											"groupName": "",
											"groupTitle": ""
										},
										...
									],
									"productStore": [
										{
											"storeName": "",
											"storeTitle": "",
											"storeAddress": "",
											"productIdentifier": "",
											"productPrice": 123.45,
											"productQuantity": 1234
										},
										...
									],
									"productPrice": [
										123.45,
										... 
									],
									"productPackagingInformation": {
										"packageClass": "",
										"packageType": "",
										"packageWeight": "",
										"packageItemQuantity": 1234,
										"expirationDate": 67876543213435786754,
										"manufacturingDate": 2324567434343634543
									},
									"productTotalQuantity": 123456
								},
								...
							]
				        },
				        ...
					]
				},
				...	
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/group/by/store`
This will return the list of products grouped according to the grocery store only (excluding the location of the store). Note that this requires a near-location parameter.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/group/by/category`
This will return the list of products grouped according to the category of the product based on the categorization of the grocery store. Note that this will return all categories that is limited to 30 products per category.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/group/by/section`
This will return the list of products grouped according to the section or usage of the products. Note that this will return all sections that is limited to 30 products per sections.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/products/under/group/group-name`
This will return the list of products grouped under the given group name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/products/under/category/category-name`
This will return the list of products categorized under the given category name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/products/under/section/section-name`
This will return the list of products sectioned under the given section name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/products/with/price/ranging`
This will return the list of products based on the given price range.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/categories`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		{
			"status": "success"|"failed",
			"result": [
		        {
		            "name": "meat",
		            "title": "Meat"
		        },
		        {
		            "name": "beverage",
		            "title": "Beverage"
		        },
		        {
		            "name": "utensil",
		            "title": "Utensil"
		        },
		        {
		            "name": "dairy",
		            "title": "Dairy"
		        }
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>
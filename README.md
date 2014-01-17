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
The REST API follows a transactional based command endpoints. The endpoints are designed like a functional call with the request parameters acting like function parameters. This pattern ensures that the endpoints follows separation of concern and modularity principles.

> **Note about reading the specification.**
> 
> - By practice we will be using lowercase for query parameters and camelcase for request body parameters.
> - All request body parameters should be in JSON format.
> - A response code of <strong>`404`</strong> means the server encounters an error but does not crash. A response code of <strong>`500`</strong> means the server encounters an error and crashes.
> - Response format will always follow strict structure and should only contain two properties, <strong>`status`</strong> and <strong>`results`</strong>. <strong>`status`</strong> should only have two values, <strong>`"success"`</strong> or <strong>`"failed"`</strong>

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
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
		- The default is by **`groupUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`N`</strong> where <strong>`N`</strong> is the maximum group items in the database.
- Accepted Request Body Parameters:
	- **`geoLocation`**
		- This is needed for fast update of the user location. Every request, the client will append this information. This is treated optional but when the server identified that this is present in the request, the user location will be updated immediately.
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
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
		- The default is by **`categoryUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
	- **`go-to-page`**
		- Combined together with **`limitTo`**.
		- Sets the current page of the results.
		- Page will start at <strong>`1`</strong> and end at <strong>`Math.floor(1/N)`</strong> where <strong>`N`</strong> is the maximum number of category in the database.
- Accepted Request Body Parameters:
	- **`geoLocation`**
		- This is needed for fast update of the user location. Every request, the client will append this information. This is treated optional but when the server identified that this is present in the request, the user location will be updated immediately.
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
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
		- The default is by **`sectionUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
- Accepted Request Body Parameters:
	- **`geoLocation`**
		- This is needed for fast update of the user location. Every request, the client will append this information. This is treated optional but when the server identified that this is present in the request, the user location will be updated immediately.
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
- Path: **`/transaction-id/get/group/by/price-range`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`minimum-price`**
			- **`maximum-price`** 
		- The default is by **`minimumPrice`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
	- **`range`**
		- This can be an array of ranges in this format: `12.50-100.45,10.45-30.55`...
	- **`from`**
		- This is used for single price range group. Requires the minimum price range.
	- **`to`**
		- This is used for single price range group. Requires the maximum price range. 
	- **`wrap-as`**
		- This can change the format of the response depending on how you will wrap the values.
		- Possible values are:
			- **`product`**
			- **`category`**
			- **`section`**
			- **`store`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
		- This is needed for fast update of the user location. Every request, the client will append this information. This is treated optional but when the server identified that this is present in the request, the user location will be updated immediately.
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
							"productUUID": "",
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
									"productUUID": "",
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
									"productUUID": "",
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
									"productUUID": "",
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
- Path: **`/transaction-id/get/group/by/store`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
			- **`address`**
		- The default is by **`storeUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
	- **`location`**
		- This the geo-location in the format of latitude, longitude. Example: `67.08765,56.7654`
		- Usually, we would rather use the current `geoLocation` parameter handed over so this is optional unless the user wanted a specific location.
	- **`wrap-as`**
		- This can change the format of the response depending on how you will wrap the values.
			- Possible values are:
				- category
				- section
- Accepted Request Body Parameters:
	- **`geoLocation`**
		- This is needed for fast update of the user location. Every request, the client will append this information. This is treated optional but when the server identified that this is present in the request, the user location will be updated immediately.
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

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
							"productUUID": "",
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
- Path: **`/transaction-id/get/group/by/category`**
- MIME Type: **`application/json`*
- Accepted Request Query Parameters:
	- **`order-by`**
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
		- The default is by **`categoryUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
	- **`wrap-as`**
		- This can change the format of the response depending on how you will wrap the values.
		- Possible values are:
			- **`store`**
			- **`section`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		//Wrap as category objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"categoryName": "",
					"categoryTitle": "",
					"products": [
						{
							"productUUID": "",
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
- Path: **`/transaction-id/get/group/by/section`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
		- This will arrange the results based on the given value.
		- Possible values are:
			- **`name`**
			- **`title`** 
		- The default is by **`sectionUUID`**.
	- **`limit-to`**
		- Limits the result based on the given value.
		- Minimum of <strong>`1`</strong> and maximum of <strong>`10`</strong>.
		- The default limit is **`20`**.
	- **`wrap-as`**
		- This can change the format of the response depending on how you will wrap the values.
		- Possible values are:
			- **`store`**
			- **`category`**
- Accepted Request Body Parameters:
	- **`geoLocation`**
	- **`sessionID`**
	- **`requestTimestamp`**

**Response Format**

*On normal response*:

- Response code: **`200`**
- Response body:

		//Wrap as section objects.
		{
			"status": "success"|"failed",
			"result": [
		        {
					"sectionName": "",
					"sectionTitle": "",
					"products": [
						{
							"productUUID": "",
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
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/product/all/under/group/group-name`
This will return the list of products grouped under the given group name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/all/under/group/group-name`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/product/all/under/category/category-name`
This will return the list of products categorized under the given category name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/all/under/category/category-name`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/product/all/under/section/section-name`
This will return the list of products sectioned under the given section name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/all/under/section/section-name`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/product/all/with/price/ranging`
This will return the list of products based on the given price range.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/all/with/price/ranging`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>

###`/get/product/product-uuid`
This will return the complete information about the product.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/product-uuid`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/product/product-uuid/product-data-property`
This will return the specific value of the given property in the complete product information.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/product/product-uuid/product-data-property`**
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/store/store-name`
This will return the information of all the stores with the given name. Because a specific location like a city can have one or more similar stores but in different branches.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/store/store-name`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`order-by`**
	- **`limit-to`**
	- **`location`**
		- This the geo-location in the format of latitude, longitude. Example: `67.08765,56.7654`
		- Usually, we would rather use the current `geoLocation` parameter handed over so this is optional unless the user wanted a specific location.
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/store/store-name/store-data-property`
This will return the value of the given property in the complete store information.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/store/store-name/store-data-property`**
- MIME Type: **`application/json`** 
- Accepted Request Query Parameters:
	- **`location`**
		- This the geo-location in the format of latitude, longitude. Example: `67.08765,56.7654`
		- Usually, we would rather use the current `geoLocation` parameter handed over so this is optional unless the user wanted a specific location.
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/group/group-name`
This will return the complete information of the group with the given name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/group/group-name`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/group/:group-name/:group-data-property`
This will return the value of the given property in the complete group information.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/:transaction-id/get/group/:group-name/:group-data-property`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/section/:section-name`
This will return the complete information of the section with the given name.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/:transaction-id/get/section/:section-name`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/section/:section-name/:section-data-property`
This will return the value of the given property in the complete section information.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/:transaction-id/get/section/:section-name/:section-data-property`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/user/:user-uuid`
This will return the complete information of the user with the given UUID.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/:transaction-id/get/user/:user-uuid`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


###`/get/user/:user-uuid/:user-data-property`
This will return the value of the given property in the complete user information.

**Request Format**

- Method: **`GET`**
- Host: **`data.grocerybox.com`**
- Port: 
- Protocol: **`HTTPS`**
- Encoding: **`UTF8`**
- Path: **`/transaction-id/get/user/user-uuid/user-data-property`**
- MIME Type: **`application/json`** 
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
		        
		        ...
			] | null
		}

*On server error response*:

- Response code: **`404/500`**
- Response body: *none*
<br/><br/>


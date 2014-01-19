var Product = {
	"attributes": {
		"productUUID": {
			"type": "string",
			"required": true
		},
		"productName": {
			"type": "string",
			"required": true
		},
		"productTitle": {
			"type": "string",
			"required": true
		},
		"productDescription": {
			"type": "string",
			"required": true
		},
		"productThumbnail": {
			"type": "string",
			"required": true
		},
		"productImage": {
			"type": "array",
			"required": true
		},
		"productCategory": {
			"type": "array",
			"required": true
		},
		"productSection": {
			"type": "array",
			"required": true
		},
		"productGroup": {
			"type": "array",
			"required": true
		},
		"productStore": {
			"type": "json",
			"required": true
		},
		"productPrice": {
			"type": "array",
			"required": true
		},
		"productQuantity": {
			"type": "float",
			"required": true
		},
		"packageClass": {
			"type": "string",
			"required": true
		},
		"packageType": {
			"type": "string",
			"required": true
		},
		"packageWeight": {
			"type": "string",
			"required": true
		},
		"packageItemQuantity": {
			"type": "integer",
			"required": true
		},
		"expirationDate": "date",
		"manufacturingDate": {
			"type": "date",
			"required": true
		}
	}
}

module.exports = Product;
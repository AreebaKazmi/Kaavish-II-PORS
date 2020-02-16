import jsonlines as jl
import json
from datetime import datetime as dt
import random as rnd

'''
Each get fn returns an array of dicts, each dict represents an entry in corresponding product models in the db.
The data is read from the (modified) jsonline files from the scraper.
'''

data_dir = '../raw/'
file_ext = '.jl'
scraper_collections = {
						'Export Leftovers': 'elo', 
						'Furor': 'furor',
						'J.': 'jdot', 
						'Zellbury': 'zellbury',
						'Kaavish': 'kaavish'
					  }


attr_val =  {
				"Size": ['S', 'M', 'L', 'XL'], 
				"Material": ['Cotton', 'Fabric', 'Denim'] 
			}

STORE_CURRENCY = "PKR"
DT = dt.now()

sku = 9252

# Pks for tables, so as to address them in other tables having fks
START_ATTRIBUTE = 60
START_PRODUCT = 5000
START_PRODUCTIMAGE = 15000
START_PRODUCTTYPE = 200
START_PRODUCTCAT = 400
START_COLLECTION = 2020
START_COLLPRODUCT = 10000
START_ATTRPRODUCT = 500
START_ASSIGNEDATTRPRODUCT = 50000
START_ASSIGNEDATTRVAR = 100000
START_ATTRIBVAL = 25000
START_VARIANT = 700

START_QUANTITY = 100

# Dicts for quicker fetching
dict_type = {}
dict_attrproduct = {}
dict_category = {}

def process_price(str_price):
	# Helper: Removes all commas (,) and round up prices to % mod 10 == 0
	str_price = (str_price.replace("PKR",""))
	index = str_price.find(".")
	if (index != -1):
		str_price = str_price[:index]
	str_price = float(str_price.replace(",",""))
	while str_price % 10 != 0: str_price += 1
	str_price = ('{:.2f}'.format(round(str_price, 2)))
	return (str_price)

def get_category():
	categories = []
	temp_set = []
	model = "product.category"
	for scraper in scraper_collections:
		with jl.open(data_dir+scraper_collections[scraper]+file_ext) as reader:
			for obj in reader:
				if obj["Category"] not in temp_set:
					temp_set.append(obj["Category"])

	index = START_PRODUCTCAT
	count = 0
	for category in temp_set:
		temp = {
					"model": model,
					"pk": index,
					"fields": 
					{
							  "private_meta": {},
							  "meta": {},
							  "seo_title": "",
							  "seo_description": "",
							  "name": category,
							  "slug": category.lower(),
							  "description": "",
							  "description_json": {
													"blocks": 
													[
													  {
														"key": "",
														"data": {},
														"text": "",
														"type": "unstyled",
														"depth": 0,
														"entityRanges": [],
														"inlineStyleRanges": []
													  }
													],
													"entityMap": {}
												  },
							  "parent": None,
							  "background_image": category.lower() +".jpg",
							  "background_image_alt": "",
							  "lft": 1,
							  "rght": 2,
							  "tree_id": count + 1,
							  "level": 0
					}
				}
		dict_category[category] = index
		categories.append(temp)
		index += 1
		count += 1
	return categories

def get_producttype_attrproduct():
	types = []
	attrproducts = []
	attrvar = []

	temp_set = []
	model_type = "product.producttype"
	model_attrproduct = "product.attributeproduct"
	model_attrvar = "product.attributevariant"

	for scraper in scraper_collections:
		with jl.open(data_dir+scraper_collections[scraper]+file_ext) as reader:
			for obj in reader:
				if obj["Type"] not in temp_set:
					temp_set.append(obj["Type"])
	
	index_type = START_PRODUCTTYPE
	index_attrproduct = START_ATTRPRODUCT
	for type_ in temp_set:
		# Adding to product.producttype
		temp =  {
					"model": model_type,
					"pk": index_type,
					"fields": 
					{
						"private_meta": {},
						"meta": 
						{
							"taxes": 
							{
								"vatlayer": 
								{
									"code": "standard",
									"description": ""
								}
							}
						},
						"name": type_,
						"has_variants": True,
						"is_shipping_required": False,
						"is_digital": False,
						"weight": "0.45 kg"
					}
				}
		global dict_type
		dict_type[type_] = index_type
		types.append(temp)

		# Adding attributes to all types -> Product.AttributeProduct and Product.AttributeVariant
		index_attr = START_ATTRIBUTE
		for attribute in attr_val:
			temp = 	{
						"model": model_attrproduct,
						"pk": index_attrproduct,
						"fields": 
						{
							"sort_order": None,
							"attribute": index_attr,
							"product_type": index_type
						}
					}
			attrproducts.append(temp)
			temp = 	{
						"model": model_attrvar,
						"pk": index_attrproduct,
						"fields": 
						{
							"sort_order": None,
							"attribute": index_attr,
							"product_type": index_type
						}
					}
			attrvar.append(temp)
			# Populating global dict for quicker fetching later on.
			global dict_attrproduct
			dict_attrproduct[(index_type, index_attr)] = index_attrproduct
			
			index_attr += 1
			index_attrproduct += 1
		index_type += 1
	agg = types
	agg.extend(attrproducts)
	agg.extend(attrvar)
	return agg


def get_collection():
	'''
	Returns an array of dicts, each dict represents an entry in a corresponding model in the db.
	'''
	collections = []
	index = START_COLLECTION
	model = "product.collection"
	for name, slug in scraper_collections.items():
		temp  = {
					"model": model,
					"pk": index,
					"fields": {
					  "publication_date": None,
					  "is_published": True,
					  "private_meta": {},
					  "meta": {},
					  "seo_title": None,
					  "seo_description": None,
					  "name": name,
					  "slug": slug,
					  "background_image": slug + ".jpg",
					  "background_image_alt": "",
					  "description": "Taken from our partner store: " + name,
					  "description_json": {
						"blocks": [
						  {
							"key": "",
							"data": {},
							"text": "Taken from our partner store: " + name,
							"type": "unstyled",
							"depth": 0,
							"entityRanges": [],
							"inlineStyleRanges": []
						  }
						],
						"entityMap": {}
					  }
					}
				}
		collections.append(temp)
		index += 1
	return collections

def get_attribute():
	'''
	Since the scraped data does not contain direct attribute info, we populate it on our own.
	'''

	attributes = []
	model = "product.attribute"
	index = START_ATTRIBUTE
	for attribute in attr_val:
		temp = 	{
					"model": model,
					"pk": index,
					"fields": 
					{
						"private_meta": {},
						"meta": {},
						"slug": attribute.lower(),
						"name": attribute,
						"input_type": "dropdown",
						"value_required": False,
						"is_variant_only": False,
						"visible_in_storefront": True,
						"filterable_in_storefront": True,
						"filterable_in_dashboard": True,
						"storefront_search_position": 0,
						"available_in_grid": True
					}
				}
		attributes.append(temp)
		index += 1
	return attributes

def get_attributevalue():
	model = "product.attributevalue"
	attributevals = []
	index = START_ATTRIBVAL
	index_attr = START_ATTRIBUTE
	for _, val in attr_val.items():
		order = 0
		for value in val:
			temp = {
						"model": model,
						"pk": index,
						"fields": 
						{
							"sort_order": order,
							"name": value,
							"value": "",
							"slug": value.lower(),
							"attribute": index_attr
						}
					}
			index += 1
			order += 1
			attributevals.append(temp)
		index_attr += 1
	return attributevals


def get_product_details():
	if (not dict_category):
		raise Exception('Fetch dicts have not been filled. Call get_category() first!')

	model_product = "product.product"
	model_image = "product.productimage"
	model_collproduct = "product.collectionproduct"

	products = []
	images = []
	collproducts = []
	variants = []

	index_product = START_PRODUCT
	index_type = START_PRODUCTTYPE
	index_category = START_PRODUCTCAT
	index_collection = START_COLLECTION
	index_variant = START_VARIANT
	index_collproduct = START_COLLPRODUCT
	index_image = START_PRODUCTIMAGE

	for scraper in scraper_collections:
		count = 0
		with jl.open(data_dir+scraper_collections[scraper]+file_ext) as reader:
			print("Processing", scraper)
			for obj in reader:
				count += 1
				# Adding to product.product
				price = process_price(obj["Unit Price"])
				temp = {
							"model": model_product,
							"pk": index_product,
							"fields": 
							{
								"publication_date": None,
								"is_published": True,
								"private_meta": {},
								"meta": 
								{
									"taxes": 
									{
										"vatlayer": 
										{
											"code": "standard",
											"description": ""
										}
									}
								},
								"seo_title": "",
								"seo_description": "Taken from our partner store: "+obj["Collection"],
								"product_type": dict_type[obj["Type"]],
								"name": obj["Name"],
								"description": obj["Description"],
								"description_json": 
								{
									"blocks": 
									[{
										"key": "",
										"data": {},
										"text": obj["Description"],
										"type": "unstyled",
										"depth": 0,
										"entityRanges": [],
										"inlineStyleRanges": []
									}],
									"entityMap": {}
								},
								"category": dict_category[obj["Category"]],
								"currency": STORE_CURRENCY,
								"price_amount": price,
								"minimal_variant_price_amount": price,
								"url": obj["URL"],
								"updated_at": str(DT),
								"charge_taxes": True,
								"weight": "0.0 kg"
							}
						}
				products.append(temp)
				global sku
				# Adding to product.variant
				temp =  {
							"model": "product.productvariant",
							"pk": index_variant,
							"fields": 
							{
								"private_meta": {},
								"meta": {},
								"sku": str(sku),
								"name": "M",
								"currency": STORE_CURRENCY,
								"price_override_amount": price,
								"product": index_product,
								"track_inventory": True,
								"quantity": START_QUANTITY,
								"quantity_allocated": 0,
								"cost_price_amount": price,
								"weight": "1.0 kg"
							}
						}

				sku += 1
				variants.append(temp)

				# Adding to product.productimage
				for img in obj["images"]:
					temp = {
								"model": model_image,
								"pk": index_image,
								"fields": 
								{
									"sort_order": 0,
									"product": index_product,
									"image": img["path"],
									"ppoi": "0.5x0.5",
									"alt": ""
								}
							}
					images.append(temp)
					index_image += 1

				# Adding to product.collectionproduct
				temp =  {
							"model": model_collproduct,
							"pk": index_collproduct,
							"fields": 
							{
								"sort_order": None,
								"collection": index_collection,
								"product": index_product
							}
						}
				collproducts.append(temp)

				index_variant += 1
				index_collproduct += 1
				index_product += 1
				index_type += 1
		index_collection += 1

	agg = products
	agg.extend(variants)
	agg.extend(images)
	agg.extend(collproducts)
	return agg

def get_assignedattrproduct():
	assignedattrprod = []
	assignedattrvar = []

	model_assignedattrproduct = "product.assignedproductattribute"
	model_assignedattrvar = "product.assignedvariantattribute"

	index_product = START_PRODUCT
	index_assignedattrproduct = START_ASSIGNEDATTRPRODUCT

	index_variant = START_VARIANT
	index_assignedattrvar = START_ASSIGNEDATTRVAR

	if (not dict_type or not dict_attrproduct):
		raise Exception('Fetch dicts have not been filled. Call get_producttype_attrproduct() first!')

	for scraper in scraper_collections:
		with jl.open(data_dir+scraper_collections[scraper]+file_ext) as reader:
			for obj in reader:
				MIN = START_ATTRIBVAL
				index_attr = START_ATTRIBUTE
				for _, val in attr_val.items():
					# For each product and variant, assign values to its attributes (size, material)
					MAX = MIN + len(val)
					temp =  {
								"model": model_assignedattrproduct,
								"pk": index_assignedattrproduct,
								"fields": 
								{
									"product": index_product,
									"assignment": dict_attrproduct[(dict_type[obj["Type"]], index_attr)], # Here, Product.AttributeProduct pk needs to be fetched
																			 # on this products and its attributes!
									"values": [rnd.randrange(MIN, MAX)] # Here, we assign a random AttributeValue to the product
								}
							}

					temp2 = {
								"model": model_assignedattrvar,
								"pk": index_assignedattrvar,
								"fields": 
								{
									"variant": index_variant,
									"assignment": dict_attrproduct[(dict_type[obj["Type"]], index_attr)],
									"values": temp["fields"]["values"]
								}
							}

					MIN = MAX
					assignedattrprod.append(temp)
					assignedattrvar.append(temp2)
					index_attr += 1
					index_assignedattrproduct += 1
					index_assignedattrvar += 1
				index_product += 1
				index_variant += 1
	final = assignedattrprod
	final.extend(assignedattrvar)
	return final


def dump_json():
	# get_category() and get_producttype_attrproduct() fill up the pre-fetch dicts.
	# Make sure that they are called before the other getters.
	lst = get_category()
	lst.extend(get_producttype_attrproduct())
	lst.extend(get_collection())
	lst.extend(get_attribute())
	lst.extend(get_attributevalue())
	lst.extend(get_product_details())
	lst.extend(get_assignedattrproduct())
	with open('clean_data.json', 'w') as fout:
		json.dump(lst , fout)

# Comment this out once clean_data.json has been generated

#dump_json()
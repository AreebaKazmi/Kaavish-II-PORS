import scrapy

class ZellburySpider(scrapy.Spider):
	name = "zellbury"
	def start_requests(self):
		urls = [
			'https://www.zellbury.com/men/ethnic-wear/shalwar-kameez.html',
			'https://www.zellbury.com/men/ethnic-wear/kurta.html',
			'https://www.zellbury.com/men/shirts/essential.html',
			'https://www.zellbury.com/men/shirts/casual.html',
			'https://www.zellbury.com/men/polo-t-shirts/essential-polo.html',
			'https://www.zellbury.com/men/polo-t-shirts/graphic-tees.html',
			'https://www.zellbury.com/men/pants/chinos.html',
			'https://www.zellbury.com/men/pants/denim.html',
			'https://www.zellbury.com/men/outer-wear/sweaters.html',
			'https://www.zellbury.com/men/outer-wear/sweat-shirts.html'
		]
		for url in urls:
			yield scrapy.Request(url=url, callback=self.parse)

	def parse(self, response):
		for product in response.css('.product-item'):
			yield {
				'Name': product.css('.product-item-name ::text').getall()[0],
				'URL': product.css('.product-item-name ::attr(href)').getall()[0],
				'Category': response.css('ul.items ::text').getall()[14],
				'Description': "Zellbury Special " + str(response.css('ul.items ::text').getall()[14]),
				'Unit Price': product.css('.price ::text').getall()[0].strip('PKR '),
				'image_urls': product.css('.product-image-photo ::attr(data-src)').getall()
			}
		next_page = response.css('.next ::attr(href)').get()
		if next_page is not None:
			yield response.follow(next_page, self.parse)
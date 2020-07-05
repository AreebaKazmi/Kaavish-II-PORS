import scrapy

class JDotSpider(scrapy.Spider):
	name = "jdot"
	def start_requests(self):
		urls = [
			'https://www.junaidjamshed.com/mens/kameez-shalwar.html',
			'https://www.junaidjamshed.com/mens/kurta.html',
			'https://www.junaidjamshed.com/mens/waist-coat.html',
			'https://www.junaidjamshed.com/mens/bottom.html'
		]
		for url in urls:
			yield scrapy.Request(url=url, callback=self.parse)

	def parse(self, response):
		for product in response.css('.product-item'):
			name = product.css('.product-item-name ::text').getall()[1].strip('\n ')
			if (name == ""): continue
			yield {
				'Name': name,
				'URL': product.css('a::attr(href)').getall()[0],
				'Category': response.css('.page-title ::text').getall()[1],
				'Description': 'J. Special ' + str(response.css('.page-title ::text').getall()[1]),
				'Unit Price': product.css('.price ::text').getall()[-1],
				'image_urls': product.css('.product-image-photo ::attr(src)').getall()
			}
		next_page = response.css('.next ::attr(href)').get()
		if next_page is not None:
			yield response.follow(next_page, self.parse)
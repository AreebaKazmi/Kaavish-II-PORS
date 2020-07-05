import scrapy

class EloSpider(scrapy.Spider):
	name = "elo"
	def start_requests(self):
		urls = [
			'https://www.exportleftovers.com/collections/mens-tee',
			'https://www.exportleftovers.com/collections/mens-polos',
			'https://www.exportleftovers.com/collections/mens-sweat-shirts-jackets-coats',
			'https://www.exportleftovers.com/collections/mens-casual-shirts',
			'https://www.exportleftovers.com/collections/mens-ethnic-wear'
		]
		for url in urls:
			yield scrapy.Request(url=url, callback=self.parse)

	def parse(self, response):
		base_url = "https://www.exportleftovers.com"
		for product in response.css('.product-wrap'):
			details = product.css('.product-details')
			yield {
				'Name': details.css('.title ::text').getall()[0],
				'URL': base_url+str(product.css('a::attr(href)').getall()[0]),
				'Category': response.css('h1 ::text').getall()[0],
				'Description': 'ELO Collection '+response.css('h1 ::text').getall()[0],
				'Unit Price': details.css('.current_price ::text').getall()[-1].strip('Rs '),
				'image_urls': ['https:'+url for url in product.css('.image__container ::attr(src)').getall()]
			}
		next_page = response.css('.next a::attr(href)').get()
		if next_page is not None:
			yield response.follow(next_page, self.parse)
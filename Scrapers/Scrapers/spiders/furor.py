import scrapy

class FurorSpider(scrapy.Spider):
	name = "furor"
	def start_requests(self):
		urls = [
			'https://furorjeans.com/product-category/top/',
			'https://furorjeans.com/product-category/bottom/',
			'https://furorjeans.com/product-category/outer-wear/'
		]
		for url in urls:
			yield scrapy.Request(url=url, callback=self.parse)

	def parse(self, response):
		for product in response.css('.qv-hover'):
			details = product.css('.product-details')
			yield {
				'Name': details.css('h3 ::text').getall()[0],
				'URL': details.css('h3 a::attr(href)').getall()[0],
				'Category': details.css('.posted_in ::text').getall()[0],
				'Description': details.css('.product-desc ::text').getall()[0],
				'Unit Price': details.css('.price ::text').getall()[1].strip(),
				'image_urls': product.css('.img-wrap ::attr(src)').getall()
			}
		next_page = response.css('.next ::attr(href)').get()
		if next_page is not None:
			yield response.follow(next_page, self.parse)
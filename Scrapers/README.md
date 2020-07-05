# Scrapers for crawling datasets from local fashion stores

Built on top of scrapy. Make sure all dependencies in `..\requirements.txt` are satisfied.

### Crawlers

- FUROR
- ELO
- J.
- Zellbury

### Example 1: Crawl FUROR

Run the scraper by executing the following through the terminal:
```  
scraper crawl furor 
```

For exporting a json file, use the following:
```  
scraper crawl furor -o furor.json
```

### Example 2: Crawl ELO

Run the scraper by executing the following through the terminal:
```  
scraper crawl elo 
```

Similarly, for exporting a json file, use the following:
```  
scraper crawl elo -o elo.json
```

> Individual spiders can be found in `Scrapers\spiders\` directory.
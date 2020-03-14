# ncsr-scraper
Python scraper for extracting holdings data from corporate bond fund NCSR forms

## Goals

1. Scraper should detect tables that have holding data and only display the following columns: 

| Name                                                   | Principal (000) | Value (000) |
|--------------------------------------------------------|-----------------|-------------|
| Berkshire Hathaway Finance Corp. 4.20%–4.25% 2048–2049 | 1,850           | 2,187       |

2. Ideally, should be able to crawl the SEC EDGAR site looking for most recent bond fund NCSR's and pull them

## Sample NCSRs:

1. https://www.sec.gov/Archives/edgar/data/1553195/000092595020000006/cbf_ncsrs.htm
2. https://www.sec.gov/Archives/edgar/data/842790/000119312519287084/d800570dncsrs.htm

## Sample link for browsing for corporate bond NCSRs

1. https://www.sec.gov/cgi-bin/series?sc=companyseries&type=N-PX&company=corporate+bond
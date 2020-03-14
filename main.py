import csv
import requests
from bs4 import BeautifulSoup
import re
import io 

def scrapeData(url):
    numeric_const_pattern = '[-+]? (?: (?: \d* \. \d+ ) | (?: \d+ \.? ) )(?: [Ee] [+-]? \d+ ) ?'
    rx = re.compile(numeric_const_pattern, re.VERBOSE)
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.content, 'html.parser')
    soup.prettify('latin-1')
    tables = soup.find_all('table')

    with io.open('output.csv', 'w', encoding='utf-8') as csvFile:
        writer = csv.writer(csvFile)
        for table in tables: 
            if not table.find('tr > td', text=re.compile('Principle')):
                print('test')
            rows = table.select('tr')
            # print(rows)
            for row in rows:
                cells = row.select('td')
                nonEmptyCells = [c for c in cells if c]
                data = map(lambda c: c.string, nonEmptyCells)
                writer.writerow(data)


if __name__=="__main__":
    url = "https://www.sec.gov/Archives/edgar/data/1553195/000092595020000006/cbf_ncsrs.htm"
    scrapeData(url)

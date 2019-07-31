from bs4 import BeautifulSoup
import requests

f = open("레시피링크.txt", 'r', encoding='UTF8')
lines = f.readlines()
f.close()

ff = open("recipeData.txt", 'w')

for i in range(len(lines)):
    html = requests.get(lines[i]).text
    soup = BeautifulSoup(html, 'html.parser')

    title = soup.select('#content > div.section_wrap > div.headword_title > h2')[0].text
    content = soup.select('#size_ct')

    content = str(content[0]).split('id="TABLE_OF_CONTENT1"')
    content = content[0][-20:] + content[1]
    content = BeautifulSoup(content, 'html.parser').text

    ff.write(title)
    ff.write(content)
    ff.write("유혁짱\n")

ff.close()




    
from bs4 import BeautifulSoup

f = open("recipeSite.html", 'r', encoding='UTF8')
html = f.read()
f.close()

ff = open("레시피링크.txt", 'w')

soup = BeautifulSoup(html, 'html.parser')

links = soup.select('#content > div.contents_list_wrap.sub > ul > li.contents_sub')

not_sub_links = links[5]
del links[5]

for link in links:
    recipes = link.select('ul > li')
    for recipe in recipes:
        recipe_links = recipe.select('ul > li > a')
        del recipe_links[0]
        for recipe_link in recipe_links:
            ff.write(str(recipe_link['href']) + '\n')

recipe_links = not_sub_links.select('ul > li > a')
for recipe_link in recipe_links:
    ff.write(str(recipe_link['href']) + '\n')

ff.close()
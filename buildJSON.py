import markdown
import json
import os
import codecs

#empty json object
outJSON = []

#find all .md files in folder x
files = os.listdir(os.getcwd()+"/story")

#for each .md file
for md in files :
#    f = open(os.getcwd()+"/story/" +md, 'r')
    if ".DS_Store" not in md:
        input_file = codecs.open(os.getcwd()+"/story/" +md, mode="r", encoding="utf-8")
        text = input_file.read()

        #pull date and rest of html
        outputHTML = markdown.markdown(text)
        outputHTML = outputHTML.replace("<h1>", "")
        outputHTML = outputHTML.split("</h1>")

        tmp = {}
        tmp["date"] = outputHTML[0]
        tmp["entry"] = outputHTML[1].replace("\n", "")

        #append to json
        outJSON.append(tmp)

outString = 'var entries = ' + json.dumps(outJSON)
with open('assets/entries.js', 'w') as outfile:
    outfile.write(outString)
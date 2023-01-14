import os
import random
from flask import Flask, request, Response

app = Flask(__name__)

@app.route('/process', methods = ['POST'])
def process_image():
    f = request.files['image']
    f.save(os.path.join('./images/', f.filename))
    return "OK", 200
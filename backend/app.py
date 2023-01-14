import os
import random
from flask import Flask, request, Response
import matlab.engine


app = Flask(__name__)
eng = matlab.engine.start_matlab()

@app.route('/process', methods = ['POST'])
def process_image():
    f = request.files['image']
    f.save(os.path.join('./images/', f.filename))
    res = eng.detectVehicles(f"./images/{f.filename}")

    return {"number": int(res)}, 200
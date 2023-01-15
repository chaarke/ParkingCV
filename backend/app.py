import os
import random
from flask import Flask, request, Response
import matlab.engine
from flask import jsonify

class Lot:
    def __init__(self, name, type):
        self.name = name
        self.type = type
        self.spots = 0

    def s(self):
        return ({
            "name": self.name,
            "type": self.type,
            "spaces": self.spots
        })

def make_lots():
    return [
        Lot("Hackfield", ["Visitor", "Commuter", "Employee"]).s(),
        Lot("Higgens House", ["Visitor", "Commuter", "Employee"]).s(),
        Lot("Library", ["Visitor", "Commuter"]).s(),
        Lot("Park Ave", ["Visitor", "Employee", "Commuter"]).s(),
        Lot("West Street", ["Visitor", "Employee", "Commuter"]).s(),
        Lot("Boynton Street", ["Employee"]).s(),
        Lot("Dean Street", ["Employee", "Residental"]).s(),
        Lot("Lee Street", ["Employee"]).s(),
        Lot("22 Dean Street", ["Residental"]).s(),
        Lot("Einhorn", ["Residental"]).s(),
        Lot("Faraday", ["Residental"]).s(),
        Lot("Institute", ["Residental"]).s(),
        Lot("Schussler", ["Residental"]).s(),
        Lot("William", ["Residental"]).s(),
        Lot("Gateway", ["Residental"]).s()
    ]

lots = make_lots()

app = Flask(__name__)
eng = matlab.engine.start_matlab()

@app.route('/process', methods = ['POST'])
def process_image():
    f = request.files['image']
    f.save(os.path.join('./images/', f.filename))
    res = eng.detectVehicles(f"./images/{f.filename}")
    
    return {"number": int(res)}, 200

@app.route('/lots', methods=['GET'])
def get_lots():
    return jsonify(lots)
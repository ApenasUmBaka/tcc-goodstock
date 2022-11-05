# Libs
from flask import Flask

from router.route import Router

# Data
app = Flask(__name__)
PORT = 80

# Routes
app.add_url_rule(
    '/graph/summary', 'graph_summary', Router.graph_summary, methods=['POST'])

# Code
if (__name__ == "__main__"):
    app.run('0.0.0.0', PORT)

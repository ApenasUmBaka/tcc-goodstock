# Libs
from flask import Flask

from controllers.auth_controller import AuthController
from controllers.graph_controller import GraphController

# Data
app = Flask(__name__)
PORT = 3000

# Routes
app.wsgi_app = AuthController(app.wsgi_app)
app.add_url_rule('/graph/summary', 'graph_summary', GraphController.getSummary)

# Code
if (__name__ == "__main__"):
    app.run(port=PORT)

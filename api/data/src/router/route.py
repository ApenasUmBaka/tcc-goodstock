# Libs
from controllers.graph_controller import GraphController


# Class
class Router:
    @staticmethod
    def graph_summary():
        graph_controller = GraphController()
        return graph_controller.getSummary()

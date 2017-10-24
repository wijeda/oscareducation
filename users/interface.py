class Status:
    def __init__(self, name, icon):
        self.name = name
        self.icon = icon

    def deserved_status(self):
        pass


class Top_contributor(Status):
    def __init__(self, top_prof):
        self.top_prof = top_prof

    def change_prof(self, prof):
        self.top_prof = prof

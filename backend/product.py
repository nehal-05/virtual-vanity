class Product:
    def __init__(self, name, category, expiry, drawer):
        self.name = name
        self.category = category
        self.expiry = expiry
        self.drawer = drawer

    def to_dict(self):
        return {
            "name": self.name,
            "category": self.category,
            "expiry": self.expiry,
            "drawer": self.drawer
        }

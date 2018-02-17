require("font-awesome-webpack")

// Configure storage adapter

const { LocalStorageAdapter } = require("./lib/storages")
const { Storage } = require("./lib/storage")

const storage = Storage.getInstance()

storage.adapter = new LocalStorageAdapter()

// Initialize all components

require("./components")

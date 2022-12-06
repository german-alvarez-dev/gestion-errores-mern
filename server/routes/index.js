module.exports = app => {
    const coastersRoutes = require("./coasters.routes");
    app.use("/api/coasters", coastersRoutes)

    const authRoutes = require("./auth.routes");
    app.use("/api/auth", authRoutes)

    const uploadRoutes = require("./upload.routes");
    app.use("/api/upload", uploadRoutes)
}
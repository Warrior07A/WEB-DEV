import express, {} from "express";
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    res.json({
        msg: "hi there"
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map
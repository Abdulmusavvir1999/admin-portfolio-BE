module.exports = {


    // StoreImage: async function (req, res) {
    //     // console.log(req.file);

    //     let query = "INSERT INTO image SET ?";
    //     let details = {
    //         image_url: req.file.filename,

    //     };
    //     // console.log(details);

    //     try {
    //         // if (!skillname) {
    //         //     return { status: "failed", message: "Fill the All Fields" }
    //         // }
    //         // let rows = await dbcon.query(query, [path])
    //         // res.send({ "imageId": rows.insertId })

    //         let rows = await db.query(query, details)
    //         // console.log(rows);
    //         return res.status(200).json({ status: "success", "image_id": rows.insertId })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },


    storeImage: async (req, res) => {
        try {
            if (req.file === undefined) {
                return res.status(600).json({ status: "failed" })
            }
            const image = `/img/${req.file.filename}`
            return res.status(200).json({ status: "success", "image": image })
        } catch (error) {
            console.log(error);
        }
    },
}


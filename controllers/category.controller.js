const renderCategory = (req, res) => {
    let username = `${req.user.firstname} ${req.user.lastname}`;
    return res.render("pages/categories", {title: "Categorias", username});
}

module.exports = {
    renderCategory
}
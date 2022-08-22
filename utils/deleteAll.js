module.exports = async function (CollectionName) {
    // Deleting all data
    CollectionName.deleteMany({})
        .then(() => {
            console.log("Data deleted"); // Success
        })
        .catch(function (error) {
            console.log(error); // Failure
        });
}
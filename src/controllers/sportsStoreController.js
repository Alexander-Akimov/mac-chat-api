import testData from '../testdata.js'

export default function SportsStoreController(router) {
    this.router = router;

    this.getAll = function (req, res) {
        //this.testData.bind(this);
        res.status(200).json(testData().products);
    };

    this.addProduct = function(req, res)
    {

    };

    this.addOrder = function (req, res) {

    };

    this.getAllOrders = function(req, res)
    {

    };
    
    this.addCategory = function (req, res) {

    };

    this.getAllCategories = function(req, res)
    {

    };

   

    // router.get('/products', this.getAll.bind(this));
}
const BasicController = require("../controllers/basic.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const UserController = require("../controllers/userController.js");
const BlockchainController = require("../controllers/blockchainContoller.js");

module.exports = (app) => {
  app
    .route("/buyerList")
    .get(authMiddleware.getRequest, BasicController.getLotteryBuyer);

  app.route("/purchase").post(authMiddleware.getUser, BasicController.purchase);
  app.route("/purchase/:address").get(BasicController.GetMyPurchase);

  app
    .route("/createLottery")
    .post(authMiddleware.getUser, BasicController.createLottery);

  app
    .route("/add-premiums")
    .post(authMiddleware.getUser, BasicController.addPremiums);

  app
    .route("/get-Lotteries")
    .get(authMiddleware.getRequest, BasicController.getOngoingLottery);

  app
    .route("/leaderBuyer")
    .get(authMiddleware.getRequest, BasicController.getLeaderBuyer);

  app
    .route("/lotteryBuyer")
    .get(authMiddleware.getRequest, BasicController.getLotteryBuyer);

  app
    .route("/get-premiums")
    .get(authMiddleware.getRequest, BasicController.getPremiums);

  app
    .route("/update-lottery")
    .post(authMiddleware.getAuthor, BasicController.updateLottery);
  app
    .route("/get-draw-lottery")
    .get( BasicController.getLotteryDrawFromDB);

  app
    .route("/get-lottery-board")
    .get( BasicController.getDrawLotteryForDashboard);

  
  // [

  // id: ticekt
  // owner: account.addresss
  // prize,



  // ]



  // user apis
  app
    .route("/user")
    .post(UserController.createUser)
    .get(authMiddleware.getRequest, UserController.getAllUsers);


  app
    .route("/user/:address")
    .get(authMiddleware.getRequest, UserController.getUserByAddress);

  app
    .route("/user/:id")
    .put(authMiddleware.getRequest, UserController.updateUser);

  app
    .route("/user/:id/referred")
    .get(authMiddleware.getRequest, UserController.getReferredUsers);

  app
    .route("/user/:id/earnings")
    .get(authMiddleware.getRequest, UserController.getUserEarnings);

  app
    .route("/user/:id/last-seen")
    .patch(authMiddleware.getRequest, UserController.updateLastSeen);

  app
    .route("/user/active")
    .get(authMiddleware.getRequest, UserController.getActiveUsers);

  // app.route('/referral/:address')
  //     .get(authMiddleware.getRequest, UserController.getUserByReferralId);

  app
    .route("/user/:id/referral-stats")
    .get(authMiddleware.getRequest, UserController.getReferralStats);

  app
    .route("/user/:id/earnings")
    .patch(authMiddleware.getRequest, UserController.updateEarnings);

  app
    .route("/user/:id/earnings")
    .get(authMiddleware.getRequest, UserController.getUsersByType);





// Blockcahin Area 
 


    app.route("/getLottery").get(BlockchainController.getLottery);








};

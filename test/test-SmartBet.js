const { assert } = require("chai")
const BN = web3.utils.BN;

//const expect = chai.expect

const SmartBet = artifacts.require("SmartBet")

const enumBetStates = SmartBet.enums.BetStates
const enumBetOptions = SmartBet.enums.BetOptions
const enumBetResults = SmartBet.enums.BetResults



contract("SmartBet", (accounts) => {    
   
    let bet
    const [contractOwner,sponsor1Addr,sponsor2Addr, gambler1Addr, gambler2Addr, gambler3Addr, gambler4Addr  ] = accounts;  
    let [sponsorAmount1,sponsorAmount2] = [5000000000000000,7000000000000000] //wei    
    let [betAmount1,betAmount2,betAmount3,betAmount4] = [4000000000000000,5000000000000000,6000000000000000,7000000000000000]
    let [local, visitor] = ["River", "Boca"]

    beforeEach(async () => {
        bet = await SmartBet.new()
    })

    it("Full Cycle - One Bet", async () =>{
        
        let betId = 0
        /*
        console.log("Smart Contract Balance",bet.address,await web3.eth.getBalance(bet.address))
        console.log("Smart contractOwner",await web3.eth.getBalance(contractOwner))
        console.log("Smart sponsor1Addr",await web3.eth.getBalance(sponsor1Addr))
        console.log("Smart sponsor2Addr",await web3.eth.getBalance(sponsor2Addr))
        console.log("Smart gambler1Addr",await web3.eth.getBalance(gambler1Addr))
        console.log("Smart gambler2Addr",await web3.eth.getBalance(gambler2Addr))
        console.log("Smart gambler3Addr",await web3.eth.getBalance(gambler3Addr))
        console.log("Smart gambler4Addr",await web3.eth.getBalance(gambler4Addr))*/

        const res = await bet.createBet(local,visitor,{from:contractOwner})
    ///  Sponsors    

        await bet.addBetSponsor(betId, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId, { from: sponsor2Addr, value: sponsorAmount2})

    /// Gamblers
        
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})

    /// Closing bet
        await bet.closeBet(betId)


    /// Define Bet Result
        await bet.defineResult(betId,1)        
        
        totalBet = betAmount1 + betAmount2+betAmount3+betAmount4
        totalFee = totalBet * (0.05  * 2)
        totalPrize = totalBet + sponsorAmount1 + sponsorAmount2 - totalFee
        
        LocalDenominator = betAmount1+betAmount2
        VisitorDenominator = betAmount3
        DrawnDenominator = betAmount4
        
        let gambler1Reward = (totalPrize*betAmount1)/LocalDenominator
        let gambler2Reward = (totalPrize*betAmount2)/LocalDenominator        

        
        let g = await bet.getGamblers(betId)
        expect((g[0].betRewardPayment)*1).to.be.closeTo(gambler1Reward,5,"Reward for Gambler 1 is incorrect")
        expect((g[1].betRewardPayment)*1).to.be.closeTo(gambler2Reward,5,"Reward for Gambler 2 is incorrect")
        expect((g[2].betRewardPayment)*1).to.be.closeTo(0,0,"Reward for Gambler 3 is incorrect")
        expect((g[3].betRewardPayment)*1).to.be.closeTo(0,0,"Reward for Gambler 4 is incorrect")
        
        
    /// Release Bet Payment
        await bet.releasePayments(betId)
        /*
        console.log("Smart Contract Balance",await web3.eth.getBalance(bet.address))
        console.log("Smart contractOwner",await web3.eth.getBalance(contractOwner))
        console.log("Smart sponsor1Addr",await web3.eth.getBalance(sponsor1Addr))
        console.log("Smart sponsor2Addr",await web3.eth.getBalance(sponsor2Addr))
        console.log("Smart gambler1Addr",await web3.eth.getBalance(gambler1Addr))
        console.log("Smart gambler2Addr",await web3.eth.getBalance(gambler2Addr))
        console.log("Smart gambler3Addr",await web3.eth.getBalance(gambler3Addr))
        console.log("Smart gambler4Addr",await web3.eth.getBalance(gambler4Addr))*/

        //const { logs } = res
        //console.log(res)
    })

    it("Full Cycle - Multiple Bets", async () =>{
        
        const [betId1,betId2,betId3] = [0,1,2]
       
        await bet.createBet(local,visitor,{from:contractOwner})
        await bet.createBet("Liverpool","Arsenal",{from:contractOwner})
        await bet.createBet("Manchester City","Chelsea",{from:contractOwner})
     ///  Sponsors    
        // BetId: 1
        await bet.addBetSponsor(betId1, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId1, { from: sponsor2Addr, value: sponsorAmount2})
        // BetId: 2
        await bet.addBetSponsor(betId2, { from: sponsor1Addr, value: sponsorAmount1*1.1})
        await bet.addBetSponsor(betId2, { from: sponsor2Addr, value: sponsorAmount2*1.1})
        // BetId: 3
        await bet.addBetSponsor(betId3, { from: sponsor1Addr, value: sponsorAmount1*1.2})
        await bet.addBetSponsor(betId3, { from: sponsor2Addr, value: sponsorAmount2*1.2})

     /// Gamblers   
        // BetId: 1   
        await bet.addGamblerBet(betId1,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId1,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId1,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId1,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})       
        // BetId: 2   
        await bet.addGamblerBet(betId2,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId2,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId2,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId2,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})
        // BetId: 3   
        await bet.addGamblerBet(betId3,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId3,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId3,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId3,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})

    /// Closing bet
        await bet.closeBet(betId1)
        await bet.closeBet(betId2)
        await bet.closeBet(betId3)

    /// Define Bet Result
        await bet.defineResult(betId1,1)        
        await bet.defineResult(betId2,2)
        await bet.defineResult(betId3,3)
        
        
        totalBet = betAmount1 + betAmount2+betAmount3+betAmount4
        totalFee = totalBet * (0.05  * 2)
        totalPrize = totalBet + sponsorAmount1 + sponsorAmount2 - totalFee
        
        LocalDenominator = betAmount1+betAmount2
        VisitorDenominator = betAmount3
        DrawnDenominator = betAmount4
        
        let gambler1Reward = (totalPrize*betAmount1)/LocalDenominator
        let gambler2Reward = (totalPrize*betAmount2)/LocalDenominator        

        
        let g = await bet.getGamblers(betId1)
        expect((g[0].betRewardPayment)*1).to.be.closeTo(gambler1Reward,5,"Reward for Gambler 1 is incorrect")
        expect((g[1].betRewardPayment)*1).to.be.closeTo(gambler2Reward,5,"Reward for Gambler 2 is incorrect")
        expect((g[2].betRewardPayment)*1).to.be.closeTo(0,0,"Reward for Gambler 3 is incorrect")
        expect((g[3].betRewardPayment)*1).to.be.closeTo(0,0,"Reward for Gambler 4 is incorrect")
        
    /// Release Bet Payment
        await bet.releasePayments(betId1)
        await bet.releasePayments(betId2)
        await bet.releasePayments(betId3)
 
    })

     it("Only the Contract's Owner can create a Bet", async () =>{
    try {
        const res = await bet.createBet(local,visitor,{from:sponsor1Addr})
        assert.fail("Must fail");
      }
      catch (error) {
        validateError(error.data, 'revert', 'Ownable: caller is not the owner');
      }
  
    })

    it("Only the Contract's Owner can close a Bet", async () =>{
        const res = await bet.createBet(local,visitor,{from:contractOwner})
        let betId=0
    /// Sponsors
        await bet.addBetSponsor(betId, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId, { from: sponsor2Addr, value: sponsorAmount2})

    try {
        const res = await bet.closeBet(betId,{from:sponsor1Addr})
        assert.fail("Must fail");
      }
      catch (error) {
        validateError(error.data, 'revert', 'Ownable: caller is not the owner');
      }  
    })

    
    it("Only the Contract's Owner can define the Bet's result", async () =>{
        const res = await bet.createBet(local,visitor,{from:contractOwner})
        let betId=0        
    ///  Sponsors    
        await bet.addBetSponsor(betId, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId, { from: sponsor2Addr, value: sponsorAmount2})

    /// Gamblers
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})
        
    /// Closing bet
        await bet.closeBet(betId)

    try {
        const res = await bet.defineResult(betId,1,{from:sponsor1Addr})  
        assert.fail("Must fail");
      }
      catch (error) {
        validateError(error.data, 'revert', 'Ownable: caller is not the owner');
      }  
    })

    it("Only the Contract's Owner can release Payments", async () =>{
        const res = await bet.createBet(local,visitor,{from:contractOwner})
        let betId=0        
    ///  Sponsors    
        await bet.addBetSponsor(betId, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId, { from: sponsor2Addr, value: sponsorAmount2})

    /// Gamblers
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler1Addr, value: betAmount1})
        await bet.addGamblerBet(betId,enumBetOptions.LocalWin, { from: gambler2Addr, value: betAmount2 })
        await bet.addGamblerBet(betId,enumBetOptions.VistorWin,{ from: gambler3Addr, value: betAmount3 })
        await bet.addGamblerBet(betId,enumBetOptions.Drawn,    { from: gambler4Addr, value: betAmount4})
        
    /// Closing bet
        await bet.closeBet(betId)
        await bet.defineResult(betId,1)   

    try {
        const res = await bet.releasePayments(betId,1,{from:sponsor1Addr})          
        assert.fail("Must fail");
      }
      catch (error) {
        validateError(error.data, 'revert', 'Ownable: caller is not the owner');
      }  
    })

    it("Only the Contract's Owner cannot close Bet which does not exists", async () =>{
        const res = await bet.createBet(local,visitor,{from:contractOwner})
        let betId=0
    /// Sponsors
        await bet.addBetSponsor(betId, { from: sponsor1Addr, value: sponsorAmount1})
        await bet.addBetSponsor(betId, { from: sponsor2Addr, value: sponsorAmount2})
        const betWhichDoesNotExist = 5

    try {
        const res = await bet.closeBet(betWhichDoesNotExist,{from:contractOwner})
        assert.fail("Must fail");
      }
      catch (error) {
        validateError(error.data, 'revert', 'bet does not exist');
      }  
    })

})


// Function used to validate errors
function validateError(data, error, reason) {
  for (var n in data) {
    if (n.startsWith('0x')) {
      var errorInfo = data[n];
      assert.equal(error, errorInfo.error);
      assert.equal(reason, errorInfo.reason);
      return;
    }
  }
}
module.exports = {
    getReturnAmt: function(amt,ratio){
        return amt*ratio
    },
    
    totalAmtPaid: function(){
        return null
    },
    
    randomNumber: function(min,max){
        return Math.floor(Math.random() * max) + min;
    },
}
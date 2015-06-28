var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;

// dataset.bankBalances.forEach(function(account){
//   var moneez = Number(account.amount);
//   console.log(moneez);
//   if (moneez > 100000){
//     console.log("yes!");
//   }
//   console.log('no');
// });

hundredThousandairs = dataset.bankBalances.filter(function(bank){
  return parseInt(bank.amount) > 100000;
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map(function(account){
  // account.rounded = Math.round(Number(account.amount));
  // return account;
  return {
    "amount": account.amount,
    "state": account.state,
    "rounded": Math.round(Number(account.amount))
  };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map(function(account){
  // account.amount = Math.max(Math.round(account.amount *10)/10, 5);
  // console.log(account);
  return {
    "amount": Math.max(Math.round(account.amount *10)/10, 5),
    "state": account.state
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances.reduce(function(prev, account){
  // console.log(prev + Number(account.amount));
  return prev + Number(account.amount);
}, 0);

sumOfBankBalances = Number(Number(sumOfBankBalances).toFixed(2));

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.bankBalances.filter(function(account){
  var states = ["WI", "IL", "WY", "OH", "GA", "DE"];
  if(states.indexOf(account.state)>-1){
    return true;
  }
});

sumOfInterests = sumOfInterests.reduce(function(prev, account){
  // console.log(account.amount);
  return prev + Number(account.amount)*0.189;
},0);

sumOfInterests = Number(Number(sumOfInterests).toFixed(2));



/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = dataset.bankBalances.filter(function(account){
  var states = ["WI", "IL", "WY", "OH", "GA", "DE"];
  if(states.indexOf(account.state) < 0 && Number(account.amount) > 50000){
    return true;
  }
});

sumOfHighInterests = sumOfHighInterests.reduce(function(prev, account){
  return prev + Number(account.amount)*0.189;
}, 0);

sumOfHighInterests = Number(Number(sumOfHighInterests).toFixed(2));

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances.reduce(function (prev, curr){
  if(!prev[curr.state]){
    prev[curr.state] = 0;
  }

  prev[curr.state] += Number(Number(curr.amount).toFixed(2));
  prev[curr.state] = Number(prev[curr.state].toFixed(2));
  // console.log(curr);
  console.log(prev);
  return prev;
}, {});


/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};